const express  = require('express');
const router   = express.Router();
const admin    = require('../controllers/adminController');
const upload   = require('../config/multer');



// Dashboard
router.get('/', admin.dashboard);

// Login
router.get('/login', admin.loginPage);
// Productos
router.get('/productos',              admin.listarProductos);
router.post('/productos/crear',       upload.single('imagen'), admin.crearProducto);
router.post('/productos/editar/:id',  upload.single('imagen'), admin.editarProducto);
router.post('/productos/eliminar/:id', admin.eliminarProducto);

// Categorías
router.get('/categorias',             admin.listarCategorias);
router.post('/categorias/crear',      admin.crearCategoria);
router.post('/categorias/eliminar/:id', admin.eliminarCategoria);

// Marcas 
router.get('/marcas',                   admin.listarMarcas);
router.post('/marcas/crear',            admin.crearMarca);
router.post('/marcas/editar/:id',       admin.editarMarca);
router.post('/marcas/eliminar/:id',     admin.eliminarMarca);

// Familias Olfativas 
router.get('/familias',                 admin.listarFamilias);
router.post('/familias/crear',          admin.crearFamilia);
router.post('/familias/editar/:id',     admin.editarFamilia);
router.post('/familias/eliminar/:id',   admin.eliminarFamilia);

module.exports = router;