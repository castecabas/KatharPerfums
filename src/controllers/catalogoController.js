const productoService  = require('../services/productoService');
const categoriaService = require('../services/categoriaService');

// GET /
const inicio = async (req, res, next) => {
  try {
    const destacados  = await productoService.obtenerDestacados();
    const categorias  = await categoriaService.obtenerTodas();

    res.render('pages/inicio', {
      titulo:     'KatharPerfums',
      destacados,
      categorias,
    });
  } catch (error) {
    next(error);
  }
};

// GET /catalogo
const catalogo = async (req, res, next) => {
  try {
    const { categoria, marca, busqueda, precioMin, precioMax } = req.query;
    const categorias = await categoriaService.obtenerTodas();

    let categoriaActiva = null;
    const filtros = {};

    if (categoria) {
      categoriaActiva = await categoriaService.obtenerPorSlug(categoria);
      if (categoriaActiva) filtros.categoriaId = categoriaActiva.id;
    }
    if (marca) {
      const marcaActiva = await productoService.obtenerMarcaPorSlug(marca);
      if (marcaActiva) filtros.marcaId = marcaActiva.id;
    }
    if (busqueda)       filtros.busqueda  = busqueda;
    if (precioMin)      filtros.precioMin = precioMin;
    if (precioMax)      filtros.precioMax = precioMax;

    const [productos, rangoPrecios, marcas] = await Promise.all([
      productoService.obtenerTodos(filtros),
      productoService.obtenerRangoPrecios(),
      productoService.obtenerMarcas(),
    ]);

    res.render('pages/catalogo', {
      titulo:          'Catálogo — KatharPerfums',
      productos,
      categorias,
      categoriaActiva,
      marcas,
      rangoPrecios,
      filtros: { categoria, marca, busqueda, precioMin, precioMax },
    });
  } catch (error) {
    next(error);
  }
};

// GET /catalogo/:slug
const detalle = async (req, res, next) => {
  try {
    const producto = await productoService.obtenerPorSlug(req.params.slug);

    if (!producto) {
      const error  = new Error('Producto no encontrado');
      error.status = 404;
      return next(error);
    }

    res.render('pages/detalle', {
      titulo:   `${producto.nombre} — KatharPerfums`,
      producto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { inicio, catalogo, detalle };