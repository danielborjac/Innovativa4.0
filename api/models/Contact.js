const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Contact = sequelize.define('Contact', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: { type: Sequelize.DataTypes.STRING(100), allowNull: false },
  last_name: { type: Sequelize.DataTypes.STRING(100), allowNull: false },
  company: { type: Sequelize.DataTypes.STRING(150), allowNull: true },
  phone: { type: Sequelize.DataTypes.STRING(30), allowNull: true },
  email: { type: Sequelize.DataTypes.STRING(200), allowNull: false },
  message: { type: Sequelize.DataTypes.TEXT, allowNull: false },
  consent_personal_data: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  ip_address: { type: Sequelize.DataTypes.STRING(45), allowNull: true },
  user_agent: { type: Sequelize.DataTypes.STRING(512), allowNull: true },
  status: { type: Sequelize.DataTypes.ENUM('new','reviewed','archived'), defaultValue: 'new' }
}, {
  tableName: 'contacts'
});

module.exports = Contact;