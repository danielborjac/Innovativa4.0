// controllers/company.controller.js
const companyService = require('../services/company.service');

async function createCompany(req, res, next) {
  try {
    const { name, logo } = req.body;
    if (!name || !logo) {
      return res.status(400).json({ ok: false, message: 'Faltan campos requeridos (name, logo)' });
    }

    const newCompany = await companyService.createCompany({ name, logo });
    return res.status(201).json({ ok: true, data: newCompany });
  } catch (err) {
    next(err);
  }
}

async function getAllCompanies(req, res, next) {
  try {
    const companies = await companyService.getAllCompanies();
    return res.status(200).json({ ok: true, data: companies });
  } catch (err) {
    next(err);
  }
}

async function getCompanyById(req, res, next) {
  try {
    const { id } = req.params;
    const company = await companyService.getCompanyById(id);
    return res.status(200).json({ ok: true, data: company });
  } catch (err) {
    next(err);
  }
}


async function updateCompany(req, res, next) {
  try {
    const { id } = req.params;
    const { name, logo } = req.body;

    const updated = await companyService.updateCompany(id, { name, logo });
    return res.status(200).json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteCompany(req, res, next) {
  try {
    const { id } = req.params;
    const result = await companyService.deleteCompany(id);
    return res.status(200).json({ ok: true, message: result.message });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
