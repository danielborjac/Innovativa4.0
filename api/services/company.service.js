// services/company.service.js
const Company = require('../models/company.model');

async function createCompany(data) {
  return Company.create(data);
}

async function getAllCompanies() {
  return Company.findAll({ order: [['createdAt', 'DESC']] });
}

async function getCompanyById(id) {
  const company = await Company.findByPk(id);
  if (!company) throw new Error('Empresa no encontrada');
  return company;
}

async function updateCompany(id, data) {
  const company = await Company.findByPk(id);
  if (!company) throw new Error('Empresa no encontrada');
  return company.update(data);
}

async function deleteCompany(id) {
  const company = await Company.findByPk(id);
  if (!company) throw new Error('Empresa no encontrada');
  await company.destroy();
  return { message: 'Empresa eliminada correctamente' };
}

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
