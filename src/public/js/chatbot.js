/* =====================================================
   KATHARBOT — Lógica del Widget
   ===================================================== */

const KB = {
  abierto:   false,
  cargando:  false,

  // ─── Elementos del DOM ──────────────────────────
  el: {
    trigger:     () => document.getElementById('kb-trigger'),
    triggerIcon: () => document.getElementById('kb-trigger-icon'),
    triggerDot:  () => document.getElementById('kb-trigger-dot'),
    window:      () => document.getElementById('kb-window'),
    messages:    () => document.getElementById('kb-messages'),
    input:       () => document.getElementById('kb-input'),
    send:        () => document.getElementById('kb-send'),
    typing:      () => document.getElementById('kb-typing'),
    suggestions: () => document.getElementById('kb-suggestions'),
  },
};

// ─── Abrir / cerrar widget ───────────────────────
function kbToggle() {
  KB.abierto = !KB.abierto;
  const win     = KB.el.window();
  const trigger = KB.el.trigger();
  const dot     = KB.el.triggerDot();

  if (KB.abierto) {
    win.classList.add('open');
    win.setAttribute('aria-hidden', 'false');
    trigger.classList.add('open');
    dot.style.display = 'none';
    setTimeout(() => KB.el.input()?.focus(), 320);
  } else {
    win.classList.remove('open');
    win.setAttribute('aria-hidden', 'true');
    trigger.classList.remove('open');
    dot.style.display = '';
  }
}

// ─── Sugerencias rápidas ─────────────────────────
function kbSuggestion(btn) {
  const texto = btn.textContent.trim();

  // Ocultar sugerencias tras usarlas
  const sug = KB.el.suggestions();
  if (sug) {
    sug.style.opacity = '0';
    setTimeout(() => sug.remove(), 300);
  }

  // Poner el texto en el input y enviar
  const input = KB.el.input();
  if (input) input.value = texto;
  kbSend();
}

// ─── Enter para enviar (Shift+Enter = nueva línea) 
function kbKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    kbSend();
  }
}

// ─── Auto resize del textarea ────────────────────
function kbAutoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

// ─── Agregar mensaje al DOM ──────────────────────
function kbAgregarMensaje(texto, esUsuario = false) {
  const messages = KB.el.messages();
  const div      = document.createElement('div');
  div.className  = `kb-msg ${esUsuario ? 'kb-msg-user' : 'kb-msg-bot'}`;

  // Convertir links en <a> y saltos de línea en <br>
  const textoFormateado = kbFormatear(texto);

  div.innerHTML = esUsuario
    ? `<div class="kb-msg-bubble">${textoFormateado}</div>`
    : `<div class="kb-msg-avatar">✦</div>
       <div class="kb-msg-bubble">${textoFormateado}</div>`;

  messages.appendChild(div);
  kbScrollBottom();
  return div;
}

// ─── Formatear texto del bot ─────────────────────
function kbFormatear(texto) {
  return texto
    // Links → <a>
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
    // **negrita**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Saltos de línea
    .replace(/\n/g, '<br>');
}

// ─── Mostrar / ocultar typing indicator ─────────
function kbTyping(mostrar) {
  const el = KB.el.typing();
  if (!el) return;
  el.style.display = mostrar ? 'flex' : 'none';
  if (mostrar) kbScrollBottom();
}

// ─── Scroll al fondo ─────────────────────────────
function kbScrollBottom() {
  const messages = KB.el.messages();
  if (messages) {
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 50);
  }
}

// ─── Enviar mensaje ──────────────────────────────
async function kbSend() {
  if (KB.cargando) return;

  const input   = KB.el.input();
  const sendBtn = KB.el.send();
  const mensaje = input?.value?.trim();

  if (!mensaje) return;

  // Limpiar input
  input.value      = '';
  input.style.height = 'auto';

  // Mostrar mensaje del usuario
  kbAgregarMensaje(mensaje, true);

  // Estado cargando
  KB.cargando = true;
  sendBtn.disabled = true;
  kbTyping(true);

  try {
    const response = await fetch('/api/chat', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ mensaje }),
    });

    const data = await response.json();

    kbTyping(false);

    if (data.ok) {
      kbAgregarMensaje(data.respuesta, false);
    } else {
      kbAgregarMensaje(
        data.error || 'Ocurrió un error. Por favor intenta de nuevo.',
        false
      );
    }

  } catch (err) {
    kbTyping(false);
    kbAgregarMensaje(
      'No pude conectarme con el asistente en este momento. ' +
      'Puedes contactarnos por <a href="https://wa.me/573054291055" target="_blank">WhatsApp ✦</a>',
      false
    );
  } finally {
    KB.cargando      = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

// ─── Cerrar al presionar Escape ──────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && KB.abierto) kbToggle();
});

// ─── Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar dot de notificación después de 3s si el chat no fue abierto
  setTimeout(() => {
    if (!KB.abierto) {
      const dot = KB.el.triggerDot();
      if (dot) dot.style.display = '';
    }
  }, 3000);
});
