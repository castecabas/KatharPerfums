const express  = require('express');
const router   = express.Router();
const catalogo = require('../controllers/catalogoController');

router.get('/',               catalogo.inicio);
router.get('/catalogo',       catalogo.catalogo);
router.get('/catalogo/:slug', catalogo.detalle);

module.exports = router;