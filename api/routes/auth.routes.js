// api/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const rateLimit = require('express-rate-limit');
const config = require('../config');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { ok: false, message: 'Too many requests' }
});

router.post('/register', limiter, authController.register);
router.post('/login', limiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;