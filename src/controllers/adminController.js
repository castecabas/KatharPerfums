const productoService       = require('../services/productoService');
const categoriaService      = require('../services/categoriaService');
const marcaService          = require('../services/marcaService');
const familiaOlfativaService = require('../services/familiaOlfativaService');
const slugify               = require('../utils/slugify');

// ════════════════════════════════════════
// LOGIN
// ════════════════════════════════════════
const loginPage = (req, res) =>
  res.render('pages/admin/login', { titulo: 'Acceso — KatharPerfums', layout: false });

// ════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════
const dashboard = async (req, res, next) => {
  try {
    const [productos, categorias, marcas, familias] = await Promise.all([
      productoService.obtenerTodos(),
      categoriaService.obtenerTodas(),
      marcaService.obtenerTodas(),
      familiaOlfativaService.obtenerTodas(),
    ]);
    res.render('pages/admin/dashboard', {
      titulo:          'Dashboard — Admin',
      totalProductos:  productos.length,
      totalCategorias: categorias.length,
      totalMarcas:     marcas.length,
      totalFamilias:   familias.length,
      seccionAdmin:    'dashboard',
    });
  } catch (error) { next(error); }
};

// ════════════════════════════════════════
// PRODUCTOS
// ════════════════════════════════════════
const listarProductos = async (req, res, next) => {
  try {
    const [productos, categorias, marcas, familias] = await Promise.all([
      productoService.obtenerTodos(),
      categoriaService.obtenerTodas(),
      marcaService.obtenerTodas(),
      familiaOlfativaService.obtenerTodas(),
    ]);
    res.render('pages/admin/productos', {
      titulo: 'Productos — Admin',
      productos,
      categorias,
      marcas,
      familias,
      seccionAdmin: 'productos',
    });
  } catch (error) { next(error); }
};

const crearProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoriaId, marcaId, familiaOlfativaId, destacado } = req.body;
    const imagen = req.file ? req.file.filename : 'default.jpg';
    await productoService.crearProducto({
      nombre,
      descripcion,
      precio,
      stock,
      categoriaId:       categoriaId       || null,
      marcaId:           marcaId           || null,
      familiaOlfativaId: familiaOlfativaId || null,
      destacado:         destacado === 'on',
      imagen,
      slug: slugify(nombre),
    });
    res.redirect('/admin/productos');
  } catch (error) { next(error); }
};

const editarProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoriaId, marcaId, familiaOlfativaId, destacado } = req.body;
    const datos = {
      nombre,
      descripcion,
      precio,
      stock,
      categoriaId:       categoriaId       || null,
      marcaId:           marcaId           || null,
      familiaOlfativaId: familiaOlfativaId || null,
      destacado:         destacado === 'on',
      slug: slugify(nombre),
    };
    if (req.file) datos.imagen = req.file.filename;
    await productoService.actualizarProducto(req.params.id, datos);
    res.redirect('/admin/productos');
  } catch (error) { next(error); }
};

const eliminarProducto = async (req, res, next) => {
  try {
    await productoService.eliminarProducto(req.params.id);
    res.redirect('/admin/productos');
  } catch (error) { next(error); }
};

// ════════════════════════════════════════
// CATEGORÍAS
// ════════════════════════════════════════
const listarCategorias = async (req, res, next) => {
  try {
    const categorias = await categoriaService.obtenerTodas();
    res.render('pages/admin/categorias', { titulo: 'Categorías — Admin', categorias, seccionAdmin: 'categorias' });
  } catch (error) { next(error); }
};

const crearCategoria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    await categoriaService.crearCategoria({ nombre, descripcion, slug: slugify(nombre) });
    res.redirect('/admin/categorias');
  } catch (error) { next(error); }
};

const eliminarCategoria = async (req, res, next) => {
  try {
    await categoriaService.eliminarCategoria(req.params.id);
    res.redirect('/admin/categorias');
  } catch (error) { next(error); }
};

// ════════════════════════════════════════
// MARCAS
// ════════════════════════════════════════
const listarMarcas = async (req, res, next) => {
  try {
    const marcas = await marcaService.obtenerTodas();
    res.render('pages/admin/marcas', { titulo: 'Marcas — Admin', marcas, seccionAdmin: 'marcas' });
  } catch (error) { next(error); }
};

const crearMarca = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    await marcaService.crearMarca({ nombre, slug: slugify(nombre) });
    res.redirect('/admin/marcas');
  } catch (error) { next(error); }
};

const editarMarca = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    await marcaService.actualizarMarca(req.params.id, { nombre, slug: slugify(nombre) });
    res.redirect('/admin/marcas');
  } catch (error) { next(error); }
};

const eliminarMarca = async (req, res, next) => {
  try {
    await marcaService.eliminarMarca(req.params.id);
    res.redirect('/admin/marcas');
  } catch (error) { next(error); }
};

// ════════════════════════════════════════
// FAMILIAS OLFATIVAS
// ════════════════════════════════════════
const listarFamilias = async (req, res, next) => {
  try {
    const familias = await familiaOlfativaService.obtenerTodas();
    res.render('pages/admin/familias', { titulo: 'Familias Olfativas — Admin', familias, seccionAdmin: 'familias' });
  } catch (error) { next(error); }
};

const crearFamilia = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    await familiaOlfativaService.crearFamilia({ nombre, slug: slugify(nombre) });
    res.redirect('/admin/familias');
  } catch (error) { next(error); }
};

const editarFamilia = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    await familiaOlfativaService.actualizarFamilia(req.params.id, { nombre, slug: slugify(nombre) });
    res.redirect('/admin/familias');
  } catch (error) { next(error); }
};

const eliminarFamilia = async (req, res, next) => {
  try {
    await familiaOlfativaService.eliminarFamilia(req.params.id);
    res.redirect('/admin/familias');
  } catch (error) { next(error); }
};

module.exports = {
  loginPage,
  dashboard,
  listarProductos, crearProducto, editarProducto, eliminarProducto,
  listarCategorias, crearCategoria, eliminarCategoria,
  listarMarcas, crearMarca, editarMarca, eliminarMarca,
  listarFamilias, crearFamilia, editarFamilia, eliminarFamilia,
};