const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FamiliaOlfativa = sequelize.define('FamiliaOlfativa', {
  id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  slug:   { type: DataTypes.STRING(100), allowNull: false, unique: true },
}, { tableName: 'familias_olfativas' });

module.exports = FamiliaOlfativa;
