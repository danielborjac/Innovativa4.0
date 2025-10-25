// api/routes/project.routes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', authMiddleware(), projectController.create);
router.put('/:id', authMiddleware(), projectController.update);
router.delete('/:id', authMiddleware(), projectController.remove);

module.exports = router;
