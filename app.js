const express = require('express');
const path    = require('path');
const morgan  = require('morgan');
const cors    = require('cors');
const ejsLayouts = require('express-ejs-layouts');

const routes  = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// ─── Motor de plantillas ───────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Después de app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.set('layout', 'layouts/main');
// ─── Middlewares globales ──────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Archivos estáticos ────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'src/public')));

// ─── Rutas ────────────────────────────────────────────────────
app.use('/', routes);

// ─── Manejo de errores ────────────────────────────────────────
app.use(errorHandler);




module.exports = app;