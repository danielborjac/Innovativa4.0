// api/utils/mailer.js
const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('./logger');

let transporter;

// Si estás en modo desarrollo y quieres usar Ethereal, puedes crear cuenta test automáticamente.
// Pero en general usamos las credenciales de config.SMTP.
async function createTransporter() {
  if (process.env.NODE_ENV === 'development' && process.env.MAILER_USE_ETHEREAL === 'true') {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    logger.info('Using Ethereal test account for emails.');
    transporter.__isEthereal = true;
    transporter.__testAccount = testAccount;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: config.SMTP.HOST,
    port: config.SMTP.PORT,
    secure: config.SMTP.PORT === 465,
    auth: {
      user: config.SMTP.USER,
      pass: config.SMTP.PASS
    }
  });

  return transporter;
}

// sendMailNow: envía inmediatamente (usado por el worker)
async function sendMailNow(mailOptions) {
  if (!transporter) await createTransporter();
  const info = await transporter.sendMail(mailOptions);
  logger.info('Email sent', { messageId: info.messageId, to: mailOptions.to });
  // Si es Ethereal devolvemos la URL para visualizar en dev
  if (transporter.__isEthereal) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    logger.info('Preview URL: ' + previewUrl);
    return { info, previewUrl };
  }
  return { info };
}

// enqueue wrapper (opcional): añade a la cola — pero la cola ya debe existir/ser importada donde se use.
// Lo dejamos disponible por si en algún servicio prefieres encolar desde aquí.
function enqueueMail(emailQueue, mailOptions, queueOpts = {}) {
  logger.info('Enqueueing email', { to: mailOptions.to, subject: mailOptions.subject });
  return emailQueue.add({ mailOptions }, queueOpts);
}

module.exports = { createTransporter, sendMailNow, enqueueMail };
