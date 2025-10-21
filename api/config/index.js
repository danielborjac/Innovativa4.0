require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST || 'root',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_NAME: process.env.DB_NAME || 'innovativa40',
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS || 'root',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: Number(process.env.SMTP_PORT || 587),
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS
  },
  RATE_LIMIT: {
    WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
    MAX: Number(process.env.RATE_LIMIT_MAX || 10)
  }
};
