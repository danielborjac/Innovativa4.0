const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const validateBody = require('../middlewares/validateBody');
const { contactSchema } = require('../validators/contact.validator');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/', rateLimiter, validateBody(contactSchema), contactController.submitContact);

module.exports = router;
