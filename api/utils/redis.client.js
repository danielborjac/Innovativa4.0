const IORedis = require('ioredis');

const useRedis = process.env.USE_REDIS === 'true';

let client;

if (useRedis) {
  client = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
  client.on('error', (err) => {
    console.error('Redis error:', err);
  });
  console.log('✅ Redis conectado correctamente');
} else {
  console.warn('⚠️ Redis desactivado por configuración (USE_REDIS=false)');
  // mock para evitar errores si redis está desactivado
  client = {
    get: async () => null,
    set: async () => null,
    del: async () => null,
    incr: async () => 1,
    expire: async () => null,
    keys: async () => [],
  };
}

module.exports = client;