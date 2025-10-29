// api/workers/email.worker.js
const logger = require('../utils/logger');

if (process.env.USE_WORKER === 'true') {
  const emailQueue = require('../queues/email.queue');
  const { sendMailNow } = require('../utils/mailer');

  emailQueue.process(5, async (job) => {
    const { mailOptions } = job.data;
    try {
      const res = await sendMailNow(mailOptions);
      logger.info('Worker: email processed', { jobId: job.id });
      return res;
    } catch (err) {
      logger.error('Worker: error sending email', { jobId: job.id, err: err.message || err });
      throw err;
    }
  });

  emailQueue.on('failed', (job, err) => {
    logger.error('Email job failed', { jobId: job.id, attempts: job.attemptsMade, err: err.message || err });
  });

  emailQueue.on('completed', job => {
    logger.info('Email job completed', { jobId: job.id });
  });

  logger.info('✅ Worker started and processing email queue');
} else {
  logger.info('⚙️ Worker disabled — no background processing active');
}