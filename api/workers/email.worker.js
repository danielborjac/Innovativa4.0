// api/workers/email.worker.js
const emailQueue = require('../queues/email.queue');
const { sendMailNow } = require('../utils/mailer');
const logger = require('../utils/logger');

emailQueue.process(5, async (job) => {
  const { mailOptions } = job.data;
  try {
    const res = await sendMailNow(mailOptions);
    logger.info('Worker: email processed', { jobId: job.id });
    return res;
  } catch (err) {
    logger.error('Worker: error sending email', { jobId: job.id, err: err.message || err });
    throw err; // rethrow para que Bull gestione reintentos
  }
});

emailQueue.on('failed', (job, err) => {
  logger.error('Email job failed', { jobId: job.id, attempts: job.attemptsMade, err: err.message || err });
});

emailQueue.on('completed', job => {
  logger.info('Email job completed', { jobId: job.id });
});
