// api/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./db');
const config = require('./config');
const logger = require('./utils/logger');
const path = require('path');
const projectRoutes = require('./routes/project.routes');

// Routes
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 1️⃣ Seguridad básica
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// 2️⃣ CORS — ajusta el origin según tus dominios reales
app.use(cors({
  origin: ['http://localhost:5173', 'https://innovativa40.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 3️⃣ Rate limiting — evita ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.' },
});
app.use('/api/', limiter);

// 4️⃣ Rutas principales
app.use('/api/contact', contactRoutes);
app.use('/api/users', authRoutes); // login/register/etc.
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}
app.use('/api/projects', projectRoutes);

// 5️⃣ Manejador global de errores
app.use(errorHandler);

// 6️⃣ Inicialización de la base y servidor
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // usar migraciones en producción
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    logger.error('DB connection error', err);
    process.exit(1);
  }
})();

module.exports = app;

