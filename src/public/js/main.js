/* =====================================================
   KATHARPERFUMS — JS Global
   ===================================================== */

// ─── Toast ─────────────────────────────────────────
function showToast(msg, tipo = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast ${tipo} show`;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    t.classList.remove('show');
  }, 3200);
}

// ─── Wishlist (favoritos local) ─────────────────────
function toggleWish(btn) {
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  btn.style.color = btn.classList.contains('active')
    ? 'var(--rose)'
    : 'rgba(201,168,76,0.7)';
}

// ─── Sidebar mobile (catálogo) ──────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('show');
}

// ─── Animación de barras de intensidad ─────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.int-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = w;
    }, 300);
  });
});

// ─── Selector de tallas (detalle) ──────────────────
function selectSize(btn, precio) {
  document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.size-thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const priceEl = document.querySelector('.price-main');
  if (priceEl) priceEl.textContent = precio;
  const idx = [...document.querySelectorAll('.size-pill')].indexOf(btn);
  const thumbs = document.querySelectorAll('.size-thumb');
  if (thumbs[idx]) thumbs[idx].classList.add('active');
}

// ─── Partículas flotantes ───────────────────────────
function initParticles(containerId, count = 20) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'p-dot';
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.animationDuration = (8 + Math.random() * 12) + 's';
    dot.style.animationDelay = (-Math.random() * 20) + 's';
    dot.style.setProperty('--drift', (Math.random() - 0.5) * 80 + 'px');
    container.appendChild(dot);
  }
}

// ─── Filtros de catálogo ────────────────────────────
function filterProducts() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  const cards  = document.querySelectorAll('.product-card');
  let visible  = 0;

  cards.forEach(card => {
    const brand = (card.dataset.brand || '').toLowerCase();
    const name  = (card.dataset.name  || '').toLowerCase();
    const ok    = !search || name.includes(search) || brand.includes(search);
    card.style.display = ok ? '' : 'none';
    if (ok) visible++;
  });

  const counter = document.getElementById('results-count');
  if (counter) {
    counter.textContent = `Mostrando ${visible} fragancia${visible !== 1 ? 's' : ''}`;
  }
}

// ─── Sincronizar thumbnails de tallas ──────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.size-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.size-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const pills = document.querySelectorAll('.size-pill');
      if (pills[i]) pills[i].click();
    });
  });
});
