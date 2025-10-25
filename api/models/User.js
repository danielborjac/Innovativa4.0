// api/models/User.js
const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  email: { type: Sequelize.DataTypes.STRING(200), allowNull: false, unique: true },
  password: { type: Sequelize.DataTypes.STRING(200), allowNull: false },
  first_name: { type: Sequelize.DataTypes.STRING(100), allowNull: true },
  last_name: { type: Sequelize.DataTypes.STRING(100), allowNull: true },
  role: { type: Sequelize.DataTypes.ENUM('admin','editor','viewer'), defaultValue: 'viewer' },
  is_active: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: true },
  created_at: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.Sequelize.fn('NOW') },
  updated_at: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.Sequelize.fn('NOW') }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

module.exports = User;
