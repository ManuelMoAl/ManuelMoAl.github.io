// Perfil y enlaces de contacto. Los campos vacíos no generan enlaces.
const profile = {
  name: '',
  email: '',
  github: 'https://github.com/ManuelMoAl',
  linkedin: ''
};

const projects = {
  territorio: {
    title: 'La ciudad en perspectiva',
    summary: 'Ejemplo de un estudio de accesibilidad y distribución de servicios urbanos.',
    question: '¿Qué zonas tienen menor acceso a servicios y cómo cambia el panorama al considerar la distribución de la población?',
    method: 'Integrar fuentes geográficas abiertas, revisar su calidad, calcular indicadores de proximidad y construir mapas comparables. Documentar la escala, las limitaciones y las decisiones del análisis.'
  },
  patrones: {
    title: 'El lenguaje de los patrones',
    summary: 'Ejemplo de un flujo de análisis exploratorio y modelado estadístico.',
    question: '¿Qué variables ayudan a explicar el fenómeno observado y con qué grado de incertidumbre?',
    method: 'Limpiar los datos, explorar distribuciones y relaciones, establecer un modelo de referencia y evaluar su desempeño con validación apropiada. Comunicar supuestos y evitar interpretar asociación como causalidad.'
  },
  atlas: {
    title: 'Un atlas para explorar',
    summary: 'Ejemplo de una aplicación de cartografía web con capas temáticas.',
    question: '¿Cómo facilitar la exploración de información geográfica a personas sin experiencia en herramientas SIG?',
    method: 'Preparar capas GeoJSON, diseñar leyendas legibles e implementar un visor con Leaflet. Incorporar metadatos, atribución de fuentes y alternativas de consulta accesibles.'
  },
  tiempo: {
    title: 'Señales a través del tiempo',
    summary: 'Ejemplo de una exploración de series temporales y comunicación de incertidumbre.',
    question: '¿Qué parte del cambio observado corresponde a tendencia, estacionalidad o variación aleatoria?',
    method: 'Revisar la periodicidad y los valores faltantes, explorar componentes temporales y contrastar modelos de referencia. Si se realizan pronósticos, evaluar con particiones temporales y presentar intervalos de incertidumbre.'
  }
};

// Ilustraciones vectoriales originales. Sus datos son sintéticos y decorativos.
const svgNS = 'http://www.w3.org/2000/svg';
function svgElement(tag, attributes) {
  const element = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}
const city = document.querySelector('#city-blocks');
const colors = ['#d2d2d2', '#b8b8b8', '#c5c5c5', '#dbdbdb', '#9f9f9f'];
for (let row = 0; row < 7; row++) {
  for (let col = 0; col < 12; col++) {
    const x = col * 57 - 35 + (row % 2) * 15;
    const y = row * 45 - 15;
    city.append(svgElement('path', {d: `M${x} ${y}l49 -9 9 36 -49 9Z`, fill: colors[(row * 3 + col * 7) % colors.length]}));
  }
}
const scatter = document.querySelector('#scatter-points');
for (let i = 0; i < 75; i++) {
  const x = 80 + (i * 137 % 450);
  const y = 233 - (x - 65) * .37 + Math.sin(i * 8.7) * 42;
  scatter.append(svgElement('circle', {cx: x, cy: y.toFixed(2), r: 2.4 + i % 3, fill: i % 4 ? '#929292' : '#6f6f6f', opacity: .35 + (i % 4) * .13}));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-categories]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = filter !== 'todos' && !card.dataset.categories.split(' ').includes(filter);
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'proyecto de ejemplo' : 'proyectos de ejemplo'}.`;
}));

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  ['title', 'summary', 'question', 'method'].forEach(key => {
    document.querySelector(`#dialog-${key}`).textContent = project[key];
  });
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
}});
document.querySelector('#year').textContent = new Date().getFullYear();
if (profile.name.trim()) document.title = `${profile.name} — Datos & territorio`;
const contactLinks = [];
if (profile.email.trim()) contactLinks.push({label: profile.email, url: `mailto:${profile.email}`});
for (const key of ['github', 'linkedin']) {
  if (!profile[key]) continue;
  try {
    const url = new URL(profile[key]);
    if (url.protocol === 'https:') contactLinks.push({label: key === 'github' ? 'GitHub ↗' : 'LinkedIn ↗', url: url.href});
  } catch { /* Un enlace sin configurar no se publica. */ }
}
if (contactLinks.length) {
  const container = document.querySelector('#contact-links');
  container.replaceChildren();
  contactLinks.forEach(({label, url}) => {
    const anchor = document.createElement('a');
    anchor.textContent = label;
    anchor.href = url;
    container.append(anchor);
  });
}
