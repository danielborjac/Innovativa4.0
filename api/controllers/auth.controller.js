// api/controllers/auth.controller.js
const authService = require('../services/auth.service');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

async function register(req, res, next) {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ ok: false, errors: error.details.map(d => d.message) });
    const result = await authService.register(req.body);
    return res.status(201).json({ ok: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ ok: false, errors: error.details.map(d => d.message) });

    const { accessToken, refreshToken, user } = await authService.login(req.body);

    // set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // true in production with https
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // same as refresh ttl
    });

    return res.json({ ok: true, data: { user, accessToken } });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    // read refresh token from cookie (or body if desired)
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const { accessToken, refreshToken: newRefresh, user } = await authService.refreshTokens(refreshToken);

    // set new refresh cookie
    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ ok: true, data: { accessToken, user } });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!req.user) {
      // if no user (e.g. client logout), try to get userId from token payload if available
      if (refreshToken) {
        // attempt decode to get sub (not verify)
        try {
          const jwt = require('jsonwebtoken');
          const decoded = jwt.decode(refreshToken);
          if (decoded && decoded.sub) {
            await authService.logout(decoded.sub, refreshToken);
          }
        } catch (e) { /* ignore */ }
      }
    } else {
      await authService.logout(req.user.sub, refreshToken);
    }

    // clear cookie
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax' });
    return res.json({ ok: true, message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout };
