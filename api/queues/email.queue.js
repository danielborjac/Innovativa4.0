const Bull = require('bull');
const config = require('../config');

const redisOpts = { redis: { url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' } };

const emailQueue = new Bull('email-queue', redisOpts);

// Opcional: eventos de logging
emailQueue.on('failed', (job, err) => {
  console.error('Email job failed', job.id, err);
});
emailQueue.on('completed', job => {
  console.log('Email job completed', job.id);
});

module.exports = emailQueue;
