// api/models/Project.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Project = sequelize.define('Project', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcionCorta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING, // guardaremos solo el path
    allowNull: true
  },
  detalles: {
    type: DataTypes.JSON, // lista de strings
    allowNull: true
  },
  impacto: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Project;
