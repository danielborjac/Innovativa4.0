const contactService = require('../services/contact.service');

async function submitContact(req, res, next) {
  try {
    const body = req.validatedBody; // proveniente de validateBody middleware
    // añadir meta
    const meta = {
      ...body,
      ip_address: req.ip || req.headers['x-forwarded-for'] || null,
      user_agent: req.get('User-Agent') || null
    };
    const created = await contactService.createContact(meta);
    return res.status(201).json({ ok: true, data: { id: created.id, message: 'Contacto recibido' }});
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await contactService.getAllContacts({
      page: Number(page),
      limit: Number(limit)
    });
    return res.json({ ok: true, data });
  } catch (err) {
    next(err);
  }
}

async function getContactsByDateRange(req, res, next) {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        ok: false,
        message: 'Debe proporcionar startDate y endDate en formato YYYY-MM-DD',
      });
    }

    const { contacts, total } = await contactService.getContactsByDateRange(
      startDate,
      endDate,
      parseInt(page),
      parseInt(limit)
    );

    return res.status(200).json({
      ok: true,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitContact, getAll, getContactsByDateRange };
