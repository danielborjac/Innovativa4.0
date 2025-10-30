const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');
const userController = require('../controllers/user.controller');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { ok: false, message: 'Too many requests' }
});


router.post('/register', limiter, authMiddleware(), requireRole('admin'), authController.register );
router.post('/login', limiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

router.get('/', authMiddleware(), requireRole('admin'), userController.getAllUsers);
router.get('/:id', authMiddleware(), requireRole('admin'), userController.getUserById);
router.put('/:id', authMiddleware(), requireRole('admin'), userController.updateUser);
router.delete('/:id', authMiddleware(), requireRole('admin'), userController.deleteUser);

module.exports = router;