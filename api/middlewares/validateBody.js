// api/middlewares/validateBody.js
const sanitizeHtml = require('sanitize-html');

module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ ok: false, errors: error.details.map(d => d.message) });
  }

  // Sanitizar campos string comunes
  const sanitized = {};
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === 'string') {
      // Permitimos texto plano: sin tags HTML
      sanitized[key] = sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} }).trim();
    } else {
      sanitized[key] = val;
    }
  }

  req.validatedBody = sanitized;
  next();
};