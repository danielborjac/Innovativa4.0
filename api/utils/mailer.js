// api/utils/mailer.js
const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('./logger');

// Imports y Inicialización de Mailgun
const formData = require('form-data');
const Mailgun = require('mailgun.js');

let transporter;
let mg; // Mailgun client

// Cliente de Mailgun 
function createMailgunClient() {
    if (mg) return mg; // Cliente ya creado

    if (!config.MAILGUN_API_KEY || !config.MAILGUN_DOMAIN) {
        logger.error('Mailgun enabled but configuration is missing.');
        return null;
    }

    const mailgunClient = new Mailgun(formData);
    mg = mailgunClient.client({
        username: 'api',
        key: config.MAILGUN_API_KEY,
        url: 'https://api.mailgun.net'
    });
    return mg;
}

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

// Función de Envío con Mailgun
async function sendMailgunMail(mailOptions) {
    const mailgunClient = createMailgunClient();
    if (!mailgunClient) {
        throw new Error('Mailgun client failed to initialize.');
    }
    let recipients;
    if (Array.isArray(mailOptions.to)) {
        recipients = mailOptions.to;
    } else {
        // Separa por coma, mapea, elimina espacios en blanco y filtra si queda vacío
        recipients = mailOptions.to
                       .split(',')
                       .map(email => email.trim())
                       .filter(email => email.length > 0); 
    }
    
    // Si aún no se encuentran destinatarios válidos, lanzamos un error claro
    if (recipients.length === 0) {
        throw new Error('No valid recipients found after processing "to" field.');
    }
    const messageData = {
        from: `Innovativa 4.0 <${mailOptions.from}>`,
        to: recipients, // <--- Ahora es un array de strings [email1, email2]
        subject: mailOptions.subject,
        html: mailOptions.html,
    };
    // ... el resto del código para enviar ...
    const response = await mailgunClient.messages.create(config.MAILGUN_DOMAIN, messageData);
    // ...
}

// Función de Envío con Nodemailer (SMTP)
async function sendNodemailerMail(mailOptions) {
    if (!transporter) await createTransporter();
    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent via Nodemailer (SMTP)', { messageId: info.messageId, to: mailOptions.to });
    return { info };
}

// sendMailNow: envía inmediatamente (usado por el worker)
/*async function sendMailNow(mailOptions) {
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
}*/

async function sendMailNow(mailOptions) {
    if (config.MAILGUN_ENABLED) {
        logger.info('sendMailNow: Using Mailgun API (Fast Mode).');
        return sendMailgunMail(mailOptions);
    } else {
        logger.info('sendMailNow: Using Nodemailer (SMTP/Fallback Mode).');
        return sendNodemailerMail(mailOptions);
    }
}

// enqueue wrapper (opcional): añade a la cola — pero la cola ya debe existir/ser importada donde se use.
// Lo dejamos disponible por si en algún servicio prefieres encolar desde aquí.
function enqueueMail(emailQueue, mailOptions, queueOpts = {}) {
  const useRedis = process.env.USE_REDIS === 'true';
  if (!useRedis || !emailQueue) {
    logger.warn('Redis queue disabled — sending email directly.');
    return sendMailNow(mailOptions);
  }

  logger.info('Enqueueing email', { to: mailOptions.to, subject: mailOptions.subject });
  return emailQueue.add({ mailOptions }, queueOpts);
}

module.exports = { createTransporter, sendMailNow, enqueueMail };
