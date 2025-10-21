// api/services/contact.service.js
const Contact = require('../models/Contact');
const emailQueue = require('../queues/email.queue');
const { enqueueMail, sendMailNow } = require('../utils/mailer');
const config = require('../config');
const logger = require('../utils/logger');

async function createContact(data) {
  const contact = await Contact.create(data);

  const mailOptions = {
    from: config.FROM_EMAIL || config.SMTP.USER,
    to: config.ADMIN_EMAIL,
    subject: `[Contacto] ${contact.first_name} ${contact.last_name}`,
    html: `<p><b>Nombre:</b> ${contact.first_name} ${contact.last_name}</p>
           <p><b>Empresa:</b> ${contact.company || '-'}</p>
           <p><b>Email:</b> ${contact.email}</p>
           <p><b>Teléfono:</b> ${contact.phone || '-'}</p>
           <p><b>Mensaje:</b><br/>${contact.message.replace(/\n/g,'<br/>')}</p>`
  };

  // Encolar (recomendado)
  try {
    await enqueueMail(emailQueue, mailOptions, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 5 * 1000 },
      removeOnComplete: true,
      removeOnFail: false
    });
    logger.info('Contact email enqueued');
  } catch (err) {
    logger.error('Error enqueuing contact email', err);
    // Fallback: intentar enviar inmediatamente (mejor que nada)
    try {
      await sendMailNow(mailOptions);
      logger.info('Fallback: email enviado inmediatamente');
    } catch (err2) {
      logger.error('Fallback failed: no se pudo enviar email', err2);
    }
  }

  return contact;
}

module.exports = { createContact };
