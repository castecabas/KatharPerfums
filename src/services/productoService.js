const { Op }      = require('sequelize');
const { sequelize } = require('../config/database');
const { Producto, Categoria , Marca , FamiliaOlfativa} = require('../models/index');

// ─── Includes completos reutilizables ─────────────
const includesCompletos = [
  { model: Categoria,       as: 'categoria'       },
  { model: Marca,           as: 'marca'           },
  { model: FamiliaOlfativa, as: 'familiaOlfativa' },
];

const obtenerTodos = async (filtros = {}) => {
  const where = {};

  if (filtros.categoriaId) where.categoriaId = filtros.categoriaId;
  if (filtros.marcaId)     where.marcaId = filtros.marcaId;
  if (filtros.busqueda) {
    where.nombre = { [Op.like]: `%${filtros.busqueda}%` };
  }
  if (filtros.precioMin) {
    where.precio = { ...where.precio, [Op.gte]: parseFloat(filtros.precioMin) };
  }
  if (filtros.precioMax) {
    where.precio = { ...where.precio, [Op.lte]: parseFloat(filtros.precioMax) };
  }

  return Producto.findAll({
      where,
      include: includesCompletos,
      order:   [['nombre', 'ASC']],
    });
};

const obtenerRangoPrecios = async () => {
  const resultado = await Producto.findAll({
    attributes: [
      [sequelize.fn('MIN', sequelize.col('precio')), 'minPrecio'],
      [sequelize.fn('MAX', sequelize.col('precio')), 'maxPrecio'],
    ],
    raw: true,
  });
  return {
    minPrecio: parseFloat(resultado[0]?.minPrecio || 0),
    maxPrecio: parseFloat(resultado[0]?.maxPrecio || 0),
  };
};

const obtenerMarcas = async () =>
  Marca.findAll({
    attributes: ['id', 'nombre', 'slug'],
    order:      [['nombre', 'ASC']],
    raw:        true,
  });

const obtenerDestacados = async () =>
  Producto.findAll({
    where:   { destacado: true },
    include: includesCompletos,
    limit:   8,
  });

const obtenerPorSlug = async (slug) =>
  Producto.findOne({
    where:   { slug },
    include: includesCompletos,
  });

const obtenerPorId = async (id) =>
  Producto.findByPk(id, { include: includesCompletos });

const crearProducto = async (datos) =>
  Producto.create(datos);

const actualizarProducto = async (id, datos) =>
  Producto.update(datos, { where: { id } });

const eliminarProducto = async (id) =>
  Producto.destroy({ where: { id } });

const obtenerMarcaPorSlug = async (slug) =>
  Marca.findOne({ where: { slug } });

module.exports = {
  obtenerTodos,
  obtenerDestacados,
  obtenerPorSlug,
  obtenerPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerRangoPrecios,
  obtenerMarcas,
  obtenerMarcaPorSlug,
};