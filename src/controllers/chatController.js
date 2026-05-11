const { preguntarOllama } = require('../services/chatService');

const chat = async (req, res) => {
  try {
    const { mensaje } = req.body;

    // Validación básica
    if (!mensaje || typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({
        ok:    false,
        error: 'El mensaje no puede estar vacío.',
      });
    }

    if (mensaje.trim().length > 500) {
      return res.status(400).json({
        ok:    false,
        error: 'El mensaje es demasiado largo.',
      });
    }

    const respuesta = await preguntarOllama(mensaje.trim());

    return res.json({ ok: true, respuesta });

  } catch (error) {
    console.error('❌ Error en chatController:', error.message);

    // Error específico de conexión con Ollama
    if (error.message.includes('fetch') || error.message.includes('ECONNREFUSED')) {
      return res.status(503).json({
        ok:    false,
        error: 'El asistente no está disponible en este momento. Contáctanos por WhatsApp.',
      });
    }

    return res.status(500).json({
      ok:    false,
      error: 'Ocurrió un error inesperado. Intenta de nuevo.',
    });
  }
};

module.exports = { chat };
