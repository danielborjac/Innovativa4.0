const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./db');
const config = require('./config');
const contactRoutes = require('./routes/contact.routes');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:5173'] })); // especifica el front

// routes
app.use('/api/contact', contactRoutes);

// error handler
app.use(require('./middlewares/errorHandler'));

// init DB and start
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // en producción usar migraciones
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    logger.error('DB connection error', err);
    process.exit(1);
  }
})();
