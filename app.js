/* ============================================================
   BIBLIOTECA DE FÁBULAS — app.js
   Lee data/catalogo.json, construye las tarjetas y gestiona
   la lectura de cada fábula en un modal.
   ============================================================ */

// ===== REFERENCIAS AL DOM =====
const grid            = document.getElementById('fabulas-grid');
const buscador        = document.getElementById('buscador');
const emptyState      = document.getElementById('empty-state');
const loadingState    = document.getElementById('loading-state');
const modalOverlay    = document.getElementById('modal-overlay');
const modalContenido  = document.getElementById('modal-contenido');
const modalAutor      = document.getElementById('modal-autor');
const modalClose      = document.getElementById('modal-close');
const modalCloseBtn   = document.getElementById('modal-close-bottom');
const statFabulas     = document.getElementById('total-fabulas');
const statAutores     = document.getElementById('total-autores');

// ===== ESTADO =====
let todasLasFabulas = [];  // Copia completa del catálogo para poder filtrar

// Emojis que se asignan cíclicamente a cada tarjeta
const EMOJIS_FABULAS = ['🦁', '🐢', '🦊', '🐘', '🦅', '🐬', '🌿', '🦋', '🐝', '🌺'];

// ===== PUNTO DE ENTRADA =====
document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const res = await fetch('data/catalogo.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    todasLasFabulas = await res.json();

    actualizarEstadisticas(todasLasFabulas);
    renderizarTarjetas(todasLasFabulas);
    loadingState.classList.add('hidden');
  } catch (err) {
    console.error('Error al cargar el catálogo:', err);
    loadingState.innerHTML = `
      <p style="color:#c00;font-size:1rem;">
        ⚠️ No se pudo cargar la biblioteca.<br>
        Asegúrate de correr el proyecto desde un servidor local:<br>
        <code>python -m http.server 8000</code>
      </p>`;
  }
}

// ===== ESTADÍSTICAS =====
function actualizarEstadisticas(fabulas) {
  statFabulas.textContent = fabulas.length;
  const autoresUnicos = new Set(fabulas.map(f => f.autor)).size;
  statAutores.textContent = autoresUnicos;
}

// ===== TARJETAS =====
function renderizarTarjetas(fabulas) {
  grid.innerHTML = '';

  if (fabulas.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  fabulas.forEach((fabula, i) => {
    const emoji = EMOJIS_FABULAS[i % EMOJIS_FABULAS.length];
    const card = document.createElement('article');
    card.className = 'fabula-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Fábula: ${fabula.titulo}, por ${fabula.autor}`);

    // Retraso escalonado para la animación de entrada
    card.style.animationDelay = `${i * 0.07}s`;

    card.innerHTML = `
      <div class="card-emoji" aria-hidden="true">${emoji}</div>
      <h2 class="card-title">${escaparHTML(fabula.titulo)}</h2>
      <div class="card-autor">
        <span aria-hidden="true">✍️</span>
        <span>${escaparHTML(fabula.autor)}</span>
      </div>
      <p class="card-descripcion">${escaparHTML(fabula.descripcion)}</p>
      <button class="card-btn">📖 Leer fábula</button>
    `;

    // El botón y la tarjeta completa abren el modal
    card.querySelector('.card-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      abrirFabula(fabula);
    });
    card.addEventListener('click', () => abrirFabula(fabula));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirFabula(fabula);
      }
    });

    grid.appendChild(card);
  });
}

// ===== BUSCADOR =====
buscador.addEventListener('input', () => {
  const q = buscador.value.toLowerCase().trim();
  const filtradas = todasLasFabulas.filter(f =>
    f.titulo.toLowerCase().includes(q) ||
    f.autor.toLowerCase().includes(q)
  );
  renderizarTarjetas(filtradas);
});

// ===== MODAL: ABRIR =====
async function abrirFabula(fabula) {
  modalAutor.textContent = `✍️ ${fabula.autor}`;
  modalContenido.innerHTML = '<p style="text-align:center;padding:48px;color:#aab;">Cargando...</p>';
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // evita scroll de fondo

  try {
    const res = await fetch(fabula.archivo);
    if (!res.ok) throw new Error('Archivo no encontrado');
    const texto = await res.text();
    modalContenido.innerHTML = renderizarMarkdown(texto);
  } catch {
    modalContenido.innerHTML = '<p style="color:#c00;">⚠️ No se pudo cargar la fábula.</p>';
  }

  // Enfocar el modal para accesibilidad
  modalClose.focus();
}

// ===== MODAL: CERRAR =====
function cerrarModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', cerrarModal);
modalCloseBtn.addEventListener('click', cerrarModal);

// Cerrar al hacer clic fuera del modal
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) cerrarModal();
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) cerrarModal();
});

// ===== RENDER DE MARKDOWN =====
// Soporta: # h1  ## h2  ### h3  - listas  --- separador  **negrita**  *cursiva*  párrafos
function renderizarMarkdown(texto) {
  const lineas = texto.split('\n');
  let html = '';
  let enLista = false;

  for (const linea of lineas) {
    const l = linea.trimEnd();

    if (l.startsWith('### ')) {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += `<h3>${inline(l.slice(4))}</h3>`;
    } else if (l.startsWith('## ')) {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += `<h2>${inline(l.slice(3))}</h2>`;
    } else if (l.startsWith('# ')) {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += `<h1>${inline(l.slice(2))}</h1>`;
    } else if (l.startsWith('- ')) {
      if (!enLista) { html += '<ul>'; enLista = true; }
      html += `<li>${inline(l.slice(2))}</li>`;
    } else if (l === '---' || l === '***') {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += '<hr>';
    } else if (l.trim() === '') {
      if (enLista) { html += '</ul>'; enLista = false; }
      // Línea vacía no produce HTML; separa párrafos naturalmente
    } else {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += `<p>${inline(l)}</p>`;
    }
  }

  if (enLista) html += '</ul>';
  return html;
}

// Procesa negrita y cursiva dentro de una línea, escapando HTML primero
function inline(texto) {
  return escaparHTML(texto)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,   '<em>$1</em>');
}

// Escapa caracteres HTML para evitar inyección
function escaparHTML(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}
