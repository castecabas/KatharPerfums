const { Categoria } = require('../models/index');

const obtenerTodas = async () => {
  return await Categoria.findAll({
    order: [['nombre', 'ASC']],
  });
};

const obtenerPorSlug = async (slug) => {
  return await Categoria.findOne({
    where: { slug },
  });
};

const obtenerPorId = async (id) => Categoria.findByPk(id);

const crearCategoria = async (datos) => {
  return await Categoria.create(datos);
};

const actualizarCategoria = async (id, datos) => {
  return await Categoria.update(datos, {
    where: { id },
  });
};

const eliminarCategoria = async (id) => {
  return await Categoria.destroy({
    where: { id },
  });
};

module.exports = {
  obtenerTodas,
  obtenerPorSlug,
  obtenerPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};