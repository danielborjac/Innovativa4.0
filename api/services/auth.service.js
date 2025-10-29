const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const redis = require('../utils/redis.client');
const config = require('../config');
const logger = require('../utils/logger');

const USE_REDIS = process.env.USE_REDIS === 'true';
const SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS || config.PASSWORD_SALT_ROUNDS || 12);
const MAX_ATTEMPTS = Number(process.env.MAX_LOGIN_ATTEMPTS || config.MAX_LOGIN_ATTEMPTS || 5);
const LOCK_TIME = Number(process.env.LOCK_TIME_SECONDS || config.LOCK_TIME_SECONDS || 600);

async function register({ email, password, first_name, last_name, role = 'editor' }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });

  // Evitar que cualquiera cree un admin manualmente (solo admin puede hacerlo)
  if (role === 'admin') {
    throw Object.assign(new Error('No autorizado para crear administradores'), { status: 403 });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ email, password: hash, first_name, last_name, role });
  return { id: user.id, email: user.email, role: user.role };
}

async function isLocked(email) {
  if (!USE_REDIS) return false;
  const key = `login:lock:${email}`;
  const val = await redis.get(key);
  return val !== null;
}

async function incrementLoginAttempts(email) {
  if (!USE_REDIS) return { locked: false, attempts: 0 };

  const attemptsKey = `login:attempts:${email}`;
  const lockKey = `login:lock:${email}`;

  const attempts = await redis.incr(attemptsKey);
  if (attempts === 1) await redis.expire(attemptsKey, LOCK_TIME);

  if (attempts >= MAX_ATTEMPTS) {
    await redis.set(lockKey, '1', 'EX', LOCK_TIME);
    await redis.del(attemptsKey);
    return { locked: true, attempts };
  }
  return { locked: false, attempts };
}

async function resetLoginAttempts(email) {
  if (!USE_REDIS) return;
  await redis.del(`login:attempts:${email}`);
  await redis.del(`login:lock:${email}`);
}

async function login({ email, password }) {
  if (await isLocked(email)) {
    throw Object.assign(new Error('Account temporarily locked due to multiple failed attempts'), { status: 429 });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    await incrementLoginAttempts(email);
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const { locked } = await incrementLoginAttempts(email);
    if (locked) throw Object.assign(new Error('Account locked due to too many attempts'), { status: 429 });
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }

  // success
  await resetLoginAttempts(email);

  const payload = { sub: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ sub: user.id });

  if (USE_REDIS) {
    const refreshKey = `refresh:${user.id}:${refreshToken}`;
    const ttlSeconds = 7 * 24 * 3600;
    await redis.set(refreshKey, '1', 'EX', ttlSeconds);
  }

  return { user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken };
}

async function refreshTokens(refreshToken) {
  if (!refreshToken) throw Object.assign(new Error('No refresh token provided'), { status: 401 });

  // verify signature
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }

  const user = await User.findByPk(payload.sub);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

  // Si Redis está activo, verificamos que el refresh token no haya sido revocado
  if (USE_REDIS) {
    const refreshKey = `refresh:${payload.sub}:${refreshToken}`;
    const exists = await redis.get(refreshKey);
    if (!exists) throw Object.assign(new Error('Refresh token revoked'), { status: 401 });
    await redis.del(refreshKey);
  }

  const newAccess = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const newRefresh = signRefreshToken({ sub: user.id });

  if (USE_REDIS) {
    const ttlSeconds = 7 * 24 * 3600;
    await redis.set(`refresh:${user.id}:${newRefresh}`, '1', 'EX', ttlSeconds);
  }

  return { accessToken: newAccess, refreshToken: newRefresh, user: { id: user.id, email: user.email, role: user.role } };
}

async function logout(userId, refreshToken) {
  if (USE_REDIS) {
    if (refreshToken) {
      await redis.del(`refresh:${userId}:${refreshToken}`);
    } else {
      const keys = await redis.keys(`refresh:${userId}:*`);
      if (keys.length) await redis.del(...keys);
    }
  }
  return true;
}

module.exports = { register, login, refreshTokens, logout };
