const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const validateBody = require('../middlewares/validateBody');
const { contactSchema } = require('../validators/contact.validator');
const rateLimiter = require('../middlewares/rateLimiter');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware(), contactController.getAll);
// Obtener contactos por rango de fechas
router.get('/range', authMiddleware(), contactController.getContactsByDateRange);

router.post('/', rateLimiter, validateBody(contactSchema), contactController.submitContact);

module.exports = router;
