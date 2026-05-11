const fs      = require('fs');
const path    = require('path');
const { Producto, Categoria } = require('../models/index');

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODELO     = 'llama3.1:8b';

// ─── Cargar contexto de la tienda ────────────────
const cargarContextoTienda = () => {
  const rutaArchivo = path.join(__dirname, '../data/tienda-contexto.txt');
  return fs.readFileSync(rutaArchivo, 'utf-8');
};

// ─── Cargar contexto de la tienda ────────────────
const cargarDescuentosTienda = () => {
  const rutaArchivo = path.join(__dirname, '../data/descuentos.txt');
  return fs.readFileSync(rutaArchivo, 'utf-8');
};

// ─── Obtener catálogo desde MySQL ─────────────────
const obtenerCatalogo = async () => {
  const productos = await Producto.findAll({
    include: [{ model: Categoria, as: 'categoria' }],
    order: [['nombre', 'ASC']],
  });

  if (!productos.length) return 'El catálogo está vacío por el momento.';

  return productos.map(p => {
    const cat    = p.categoria ? p.categoria.nombre : 'Sin categoría';
    const estado = p.stock > 0 ? 'Disponible' : 'Agotado';
    const url    = `http://localhost:${process.env.PORT || 3000}/catalogo/${p.slug}`;
    return `- ${p.nombre} | Marca: ${p.marcaId} | Categoría: ${cat} | Precio: $${parseFloat(p.precio).toLocaleString('es-CO')} COP | ${estado} | Ver: ${url} | Familia Olfativa Principal: ${p.familiaOlfativa?.nombre || 'N/A'}`;
  }).join('\n');
};

// ─── Construir system prompt ──────────────────────
const construirSystemPrompt = async () => {
  const contextoTienda  = cargarContextoTienda();
  const catalogoActual  = await obtenerCatalogo();
  const descuentosTienda = cargarDescuentosTienda();

  return `Eres KatharBot, el asistente virtual elegante y sofisticado de KatharPerfums.

Tu personalidad es cálida, refinada y servicial. Hablas como un experto en fragancias.

${contextoTienda}

## CATÁLOGO ACTUAL DE PRODUCTOS
${catalogoActual}

## DESCUENTOS
${descuentosTienda}

## REGLAS IMPORTANTES
- Responde SIEMPRE en español.
- Sé conciso y elegante. Máximo 3 párrafos por respuesta.
- Si el cliente quiere comprar o consultar precio, proporciona el link de WhatsApp: https://wa.me/573054291055
- Si el cliente pregunta por un producto específico del catálogo, incluye su link directo.
- Si no tienes información sobre algo, dilo con elegancia y sugiere contactar por WhatsApp.
- No inventes productos que no estén en el catálogo.
- Usa emojis con moderación (máximo 2 por mensaje).
- Revisa si la url del producto esta correcta por el slug y que no tenga espacios o caracteres especiales. Si el producto no tiene slug, no incluyas el link.
- Colocar urls o enlaces solamente 1 vez por respuesta. No deben existir url duplicadas o repetidas en la misma respuesta.
- Si el cliente pregunta por elementos que constan con el tema financiero o Administrativo, como numero de ventas, ingresos, costos, etc. no respondas y sugiere contactar por WhatsApp.
- No responder ante preguntas que estén relacionadas con la Tienda KatharPerfums.`;

};

// ─── Llamar a Ollama ──────────────────────────────
const preguntarOllama = async (mensajeUsuario) => {
  const systemPrompt = await construirSystemPrompt();

  const body = {
    model:    MODELO,
    stream:   false,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: mensajeUsuario },
    ],
  };

  const response = await fetch(OLLAMA_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Ollama respondió con status ${response.status}`);
  }

  const data = await response.json();
  return data.message?.content || 'No pude generar una respuesta.';
};

module.exports = { preguntarOllama };
