const express        = require('express');
const router         = express.Router();
const catalogoRoutes = require('./catalogo.routes');
const adminRoutes    = require('./admin.routes');
const chatRoutes     = require('./chat.routes');

// Rutas públicas
router.use('/', catalogoRoutes);

// Rutas del panel admin
router.use('/admin', adminRoutes);

// Rutas del chatbot
router.use('/api/chat',chatRoutes);

module.exports = router;