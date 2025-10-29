// models/company.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'companies',
  timestamps: true,
});

module.exports = Company;
