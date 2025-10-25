const jwt = require('jsonwebtoken');
const config = require('../config');

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || config.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || config.JWT_EXPIRATION || '15m'
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || config.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || config.JWT_REFRESH_EXPIRATION || '7d'
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || config.JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || config.JWT_REFRESH_SECRET);
}

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
