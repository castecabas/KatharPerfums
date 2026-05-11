const Categoria = require('./Categoria');
const Producto  = require('./Producto');
const FamiliaOlfativa = require('./FamiliaOlfativa');
const Marca           = require('./Marca');

// ─── Categoria ↔ Producto ─────────────────────────
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

// ─── Marca ↔ Producto ─────────────────────────────
Marca.hasMany(Producto, { foreignKey: 'marcaId', as: 'productos' });
Producto.belongsTo(Marca, { foreignKey: 'marcaId', as: 'marca' });

// ─── FamiliaOlfativa ↔ Producto ───────────────────
FamiliaOlfativa.hasMany(Producto, { foreignKey: 'familiaOlfativaId', as: 'productos' });
Producto.belongsTo(FamiliaOlfativa, { foreignKey: 'familiaOlfativaId', as: 'familiaOlfativa' });

module.exports = { Categoria, Producto, Marca, FamiliaOlfativa };