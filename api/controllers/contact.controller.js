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

module.exports = { submitContact };
