// routes/company.routes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// 🔐 Solo usuarios autenticados pueden crear, editar o eliminar
router.post('/', authMiddleware(), companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById); 
router.put('/:id', authMiddleware(), companyController.updateCompany);
router.delete('/:id', authMiddleware(), companyController.deleteCompany);

module.exports = router;
