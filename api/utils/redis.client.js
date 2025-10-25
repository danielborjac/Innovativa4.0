const IORedis = require('ioredis');
const client = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

client.on('error', (err) => {
  console.error('Redis error', err);
});

module.exports = client;
