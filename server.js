require('dotenv').config();
const app = require('./app');
const { conectarDB, sequelize } = require('./src/config/database');

// Importar modelos para que Sequelize los registre
require('./src/models/index');

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarDB();
 
  // Crea las tablas si no existen (nunca borra datos)
  await sequelize.sync();
  console.log('✅ Tablas sincronizadas correctamente');

  app.listen(PORT, () => {
    console.log(`🚀 KatharPerfums corriendo en http://localhost:${PORT}`);
  });
};

iniciar();