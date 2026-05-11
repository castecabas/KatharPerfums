# 🧴 KatharPerfums

Tienda de perfumes desarrollada con Node.js, Express, MySQL y EJS. Incluye catálogo público, detalle de producto, panel de administración y asistente virtual con inteligencia artificial local mediante Ollama.

---

## 📋 Tabla de Contenidos

- [Requerimientos](#requerimientos)
- [Programas y Herramientas](#programas-y-herramientas)
- [Dependencias](#dependencias)
- [Variables de Entorno](#variables-de-entorno)
- [Instalación Paso a Paso](#instalación-paso-a-paso)
- [Base de Datos](#base-de-datos)
- [Configurar Ollama](#configurar-ollama)
- [Arrancar el Proyecto](#arrancar-el-proyecto)
- [Rutas del Proyecto](#rutas-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## Requerimientos

Antes de instalar el proyecto asegúrate de tener lo siguiente en tu equipo Windows:

| Herramienta | Versión mínima | Obligatorio |
|---|---|---|
| Node.js | v18 o superior | ✅ Sí |
| npm | v9 (viene con Node.js) | ✅ Sí |
| MySQL | v8.0 | ✅ Sí |
| Ollama | Última versión disponible | ✅ Sí |
| Git | Cualquier versión | Opcional |

---

## Programas y Herramientas

### Editor de Código
Se recomienda **Visual Studio Code**, aunque puedes usar el editor de tu preferencia.
- Descarga: https://code.visualstudio.com

### Node.js
Motor de ejecución de JavaScript necesario para correr el servidor Express.
- Descarga: https://nodejs.org
- Verificar instalación:
  ```cmd
  node -v
  npm -v
  ```

### MySQL — Gestor de Base de Datos
El proyecto utiliza MySQL como motor de base de datos. Se recomienda **Laragon** como entorno de desarrollo ya que incluye MySQL integrado, permite levantar el servidor fácilmente y trae un gestor de base de datos incorporado. Como alternativa puedes usar **XAMPP**.

- Laragon (recomendado): https://laragon.org/download
- XAMPP (alternativa): https://www.apachefriends.org

> Con Laragon basta con hacer clic en **Start All** para levantar MySQL en el puerto 3306.

### Gestor Visual de Base de Datos
Para administrar la base de datos visualmente puedes usar cualquiera de estos:

- **MySQL Workbench**: https://dev.mysql.com/downloads/workbench
- **HeidiSQL** (incluido en Laragon): https://www.heidisql.com
- **TablePlus**: https://tableplus.com

### Ollama — IA Local
Ollama permite correr modelos de lenguaje de forma local. El proyecto usa el modelo `llama3.2:3b` para el chatbot KatharBot.
- Descarga: https://ollama.com/download

---

## Dependencias

El proyecto utiliza las siguientes dependencias de Node.js:

```json
"dependencies": {
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "ejs": "^5.0.2",
  "express": "^5.2.1",
  "express-ejs-layouts": "^2.5.1",
  "express-validator": "^7.3.2",
  "morgan": "^1.10.1",
  "multer": "^2.1.1",
  "mysql2": "^3.22.3",
  "sequelize": "^6.37.8"
},
"devDependencies": {
  "nodemon": "^3.1.14"
}
```

| Paquete | Uso |
|---|---|
| express | Servidor web y manejo de rutas |
| ejs | Motor de plantillas HTML dinámicas |
| express-ejs-layouts | Sistema de layout y componentes EJS |
| sequelize | ORM para comunicación con MySQL |
| mysql2 | Driver de conexión a MySQL |
| dotenv | Carga de variables de entorno |
| multer | Subida de imágenes de productos |
| cors | Manejo de peticiones entre dominios |
| morgan | Logger de peticiones HTTP |
| express-validator | Validación de formularios |
| nodemon | Reinicio automático en desarrollo |

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Las variables que debes configurar son:

```env
NODE_ENV=development

# Chatbot — modelo de Ollama a utilizar
MODEL_CHAT='llama3.2:3b'

# Base de datos MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=katharperfums
DB_USER=
DB_PASSWORD=

# Subida de imágenes
UPLOAD_PATH=src/public/uploads
MAX_FILE_SIZE=5242880
```

> ⚠️ Nunca subas el archivo `.env` a repositorios públicos. Está incluido en `.gitignore`.

---

## Instalación Paso a Paso

### 1. Clonar o copiar el proyecto

Si tienes Git instalado:
```cmd
git clone <url-del-repositorio>
cd katharperfums
```

O simplemente descarga en .ZIP de la carpeta `katharperfums` en tu equipo en el boton `<> code` que tiene la pagina de github y ábrela con tu editor.

### 2. Instalar dependencias

Abre una terminal dentro de la carpeta del proyecto y ejecuta:
```cmd
npm install
```

### 3. Configurar las variables de entorno

Crea el archivo `.env` (con las variables de entorno mencionadas) en la raíz del proyecto 

Luego ábrelo y completa tus credenciales de MySQL:
```env
DB_USER=root
DB_PASSWORD=tu_password
```

> Si usas Laragon con la configuración por defecto, el usuario es `root` y la contraseña está vacía.

---

## Base de Datos

### 1. Crear la base de datos

Abre tu gestor de base de datos (HeidiSQL, MySQL Workbench, etc.) y ejecuta:
```sql
CREATE DATABASE IF NOT EXISTS katharperfums
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 2. Crear las tablas

Las tablas se crean automáticamente al arrancar el servidor por primera vez gracias a `sequelize.sync()`. No es necesario ejecutar ningún script SQL adicional.

### 3. Cargar datos de prueba (opcional)

Si deseas poblar la base de datos con productos, marcas, categorías y familias olfativas de ejemplo, ejecuta el script incluido:

>DEBES ABRIR EL CMD en Administrador y dirigirte a la carpeta donde está el archivo `katharperfums_10_05_2026`
```cmd
cd <coloca la ruta donde esté el archivo>
```
>y luego ejecuta lo siguiente
```cmd
mysql -u root -p katharperfums < katharperfums_10_05_2026.sql
```
(opcional) En caso , si la base de datos NO esté creada recientemente
> Para limpiar todos los datos y volver a cargarlos:
> ```sql
> SET FOREIGN_KEY_CHECKS = 0;
> TRUNCATE TABLE productos;
> TRUNCATE TABLE categorias;
> TRUNCATE TABLE marcas;
> TRUNCATE TABLE familias_olfativas;
> SET FOREIGN_KEY_CHECKS = 1;
> ```

---

## Configurar Ollama

El chatbot KatharBot requiere que Ollama esté instalado y corriendo con el modelo `llama3.2:3b`.

>Tambien puedes ver otros modelos en https://www.canirun.ai/?use=chat ,verificar si tiene para instalar por ollama.

### 1. Instalar Ollama

Descarga e instala Ollama desde: https://ollama.com/download

### 2. Descargar el modelo

Abre el **CMD** o **PowerShell** y ejecuta:
```cmd
ollama pull llama3.2:3b
```

> La descarga puede tardar varios minutos dependiendo de tu conexión. El modelo ocupa aproximadamente 2GB.

### 3. Inicializar el servidor de Ollama

Cada vez que vayas a usar el chatbot debes tener Ollama corriendo. Ejecuta en CMD:
```cmd
ollama serve
```

Verifica que esté activo abriendo en el navegador:
```
http://localhost:11434
```

Deberías ver el mensaje: `Ollama is running`

### 4. Verificar el modelo disponible

```cmd
ollama list
```
Deberías ver `llama3.2:3b` en la lista.

### OPCIONAL
En caso de querer cambiar o cargar otro,inicia ollama y escribe lo siguiente
```cmd
ollama help
```
Si te dá mas opciones,ejecuta cada linea siguiente:
```cmd
ollama
```
te pedira varias opciones, y seleccionas `Chat with a model`
```cmd
ollama load <modelo>
```
regresas con un 
```cmd
/bye
```
y luego ESC, vuelve a cargar el servidor
```cmd
ollama serve
```

> ⚠️ Ollama debe estar corriendo **antes** de arrancar el servidor para que el chatbot funcione correctamente.

---

## Arrancar el Proyecto

### Modo desarrollo (recomendado)

```cmd
npm run dev
```

Nodemon reiniciará el servidor automáticamente cada vez que modifiques un archivo.

### Modo producción

```cmd
npm start
```

### Verificar que todo funciona

Una vez arrancado deberías ver en la consola:

```
✅ Conexión a MySQL establecida correctamente
✅ Tablas sincronizadas correctamente
🚀 KatharPerfums corriendo en http://localhost:3000
```

Abre el navegador en: **http://localhost:3000**

---

## Rutas del Proyecto

### Tienda Pública

| Ruta | Descripción |
|---|---|
| `GET /` | Página de inicio con hero y categorías |
| `GET /catalogo` | Catálogo completo de productos |
| `GET /catalogo?categoria=slug` | Filtrar por categoría |
| `GET /catalogo/:slug` | Detalle de un producto |
| `POST /api/chat` | API del chatbot KatharBot |

### Panel Administrativo

| Ruta | Descripción |
|---|---|
| `GET /admin/login` | Acceso al panel |
| `GET /admin` | Dashboard con estadísticas |
| `GET /admin/productos` | Gestión de productos |
| `GET /admin/categorias` | Gestión de categorías |
| `GET /admin/marcas` | Gestión de marcas |
| `GET /admin/familias` | Gestión de familias olfativas |

---

## Estructura del Proyecto

```
katharperfums/
│
├── src/
│   ├── config/
│   │   ├── database.js          → Conexión Sequelize + MySQL
│   │   └── multer.js            → Configuración subida de imágenes
│   │
│   ├── controllers/
│   │   ├── adminController.js   → Lógica del panel admin
│   │   ├── catalogoController.js→ Lógica páginas públicas
│   │   └── chatController.js    → Lógica del chatbot
│   │
│   ├── data/
│   │   └── tienda-contexto.txt  → Contexto estático del chatbot
│   │
│   ├── middlewares/
│   │   └── errorHandler.js      → Manejo centralizado de errores
│   │
│   ├── models/
│   │   ├── index.js             → Asociaciones entre modelos
│   │   ├── Categoria.js
│   │   ├── FamiliaOlfativa.js
│   │   ├── Marca.js
│   │   └── Producto.js
│   │
│   ├── routes/
│   │   ├── index.js             → Enrutador raíz
│   │   ├── admin.routes.js      → Rutas del panel admin
│   │   ├── catalogo.routes.js   → Rutas públicas
│   │   └── chat.routes.js       → Ruta del chatbot
│   │
│   ├── services/
│   │   ├── categoriaService.js
│   │   ├── chatService.js       → Integración con Ollama
│   │   ├── familiaOlfativaService.js
│   │   ├── marcaService.js
│   │   └── productoService.js
│   │
│   ├── utils/
│   │   └── slugify.js           → Generador de slugs
│   │
│   ├── views/
│   │   ├── components/
│   │   │   ├── admin-sidebar.ejs
│   │   │   ├── chatbot.ejs
│   │   │   ├── footer.ejs
│   │   │   ├── navbar.ejs
│   │   │   └── product-card.ejs
│   │   │
│   │   ├── layouts/
│   │   │   └── main.ejs         → Layout base
│   │   │
│   │   └── pages/
│   │       ├── catalogo.ejs
│   │       ├── detalle.ejs
│   │       ├── inicio.ejs
│   │       └── admin/
│   │           ├── categorias.ejs
│   │           ├── dashboard.ejs
│   │           ├── familias.ejs
│   │           ├── login.ejs
│   │           ├── marcas.ejs
│   │           └── productos.ejs
│   │
│   └── public/
│       ├── css/
│       │   ├── chatbot.css
│       │   └── style.css
│       ├── js/
│       │   ├── chatbot.js
│       │   └── main.js
│       └── uploads/             → Imágenes subidas de productos
│
├── app.js                       → Configuración Express
├── server.js                    → Arranque del servidor
├── katharperfums_seed_v2.sql    → Datos de prueba
├── .env                         → Variables de entorno (no subir)
├── .env.example                 → Plantilla de variables
├── .gitignore
└── package.json
```

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Servidor | Node.js + Express |
| Base de datos | MySQL + Sequelize ORM |
| Vistas | EJS + express-ejs-layouts |
| Estilos | CSS personalizado |
| Tipografía | Cinzel + Cormorant Garamond + Montserrat |
| IA / Chatbot | Ollama + llama3.2:3b |
| Entorno local | Laragon o XAMPP |

---

> Desarrollado con ✦ para KatharPerfums — Colombia
