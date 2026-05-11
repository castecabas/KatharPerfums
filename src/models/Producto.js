const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('Producto', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:      { type: DataTypes.STRING(150), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    precio:      { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    stock:       { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    imagen:      { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'default.jpg' },
    slug:        { type: DataTypes.STRING(150), allowNull: false, unique: true },
    destacado:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  
  // FK → marcas
    marcaId: {
      type:       DataTypes.INTEGER,
      allowNull:  true,
      references: { model: 'marcas', key: 'id' },
    },
  
    // FK → categorias
    categoriaId: {
      type:       DataTypes.INTEGER,
      allowNull:  true,
      references: { model: 'categorias', key: 'id' },
    },
  
    // FK → familias_olfativas
    familiaOlfativaId: {
      type:       DataTypes.INTEGER,
      allowNull:  true,
      references: { model: 'familias_olfativas', key: 'id' },
    },
}, {
  tableName: 'productos',
});

module.exports = Producto;