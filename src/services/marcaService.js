const { Marca } = require('../models/index');

const obtenerTodas = async () =>
  Marca.findAll({ order: [['nombre', 'ASC']] });

const obtenerPorId = async (id) =>
  Marca.findByPk(id);

const crearMarca = async (datos) =>
  Marca.create(datos);

const actualizarMarca = async (id, datos) =>
  Marca.update(datos, { where: { id } });

const eliminarMarca = async (id) =>
  Marca.destroy({ where: { id } });

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
};
