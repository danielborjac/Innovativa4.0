const Bull = require('bull');
const config = require('../config');

const useRedis = process.env.USE_REDIS === 'true';

let emailQueue = null;

if (useRedis) {
  const redisOpts = { redis: { url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' } };
  emailQueue = new Bull('email-queue', redisOpts);

  emailQueue.on('failed', (job, err) => {
    console.error('Email job failed', job.id, err);
  });
  emailQueue.on('completed', job => {
    console.log('Email job completed', job.id);
  });

  console.log('✅ Redis Queue initialized (Bull active)');
} else {
  console.log('⚙️ Redis disabled — emails will be sent directly without queue');
}

module.exports = emailQueue;
