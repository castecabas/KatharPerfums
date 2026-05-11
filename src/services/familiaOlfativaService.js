const { FamiliaOlfativa } = require('../models/index');

const obtenerTodas = async () =>
  FamiliaOlfativa.findAll({ order: [['nombre', 'ASC']] });

const obtenerPorId = async (id) =>
  FamiliaOlfativa.findByPk(id);

const crearFamilia = async (datos) =>
  FamiliaOlfativa.create(datos);

const actualizarFamilia = async (id, datos) =>
  FamiliaOlfativa.update(datos, { where: { id } });

const eliminarFamilia = async (id) =>
  FamiliaOlfativa.destroy({ where: { id } });

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crearFamilia,
  actualizarFamilia,
  eliminarFamilia,
};
