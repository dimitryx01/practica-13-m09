// diccionario de traducciones actualizado
const translations = {
  "nav-home": { ca: "Inici", es: "Inicio", en: "Home" },
  "nav-podcast": { ca: "Podcasts", es: "Podcasts", en: "Podcasts" },
  "nav-video": { ca: "Vídeo", es: "Video", en: "Video" },
  "nav-contact": { ca: "Contacte", es: "Contacto", en: "Contact" },
  "hero-title": { 
    ca: "Fes la teva comanda ara", 
    es: "Haz tu pedido ahora", 
    en: "Order now" 
  },
  "hero-desc": { 
    ca: "Arepes acabades de fer, carn mechada i formatge fos. Entrega ràpida.", 
    es: "Arepas recién hechas, carne mechada y queso derretido. Entrega rápida.", 
    en: "Freshly made arepas, shredded beef and melted cheese. Fast delivery." 
  },
  "hero-btn": { ca: "Fer comanda", es: "Hacer pedido", en: "Place order" },
  "banner-text": {
    ca: "Més que menjar: l'arepa és tradició, energia i sabor.",
    es: "Más que comida: la arepa es tradición, energía y sabor.",
    en: "More than food: the arepa is tradition, energy and flavor."
  },
  "card1-title": { ca: "Arepa Reina Pepiada", es: "Arepa Reina Pepiada", en: "Reina Pepiada Arepa" },
  "card1-desc": { 
    ca: "Una arepa clàssica farcida d'una deliciosa barreja de pollastre, aguacat i maionesa.", 
    es: "Una arepa clásica rellena de una deliciosa mezcla de pollo desmechado, aguacate cremoso y mayonesa.", 
    en: "A classic arepa filled with a delicious mix of shredded chicken, creamy avocado and mayo." 
  },
  "why-title": { ca: "Per què demanar a La Arepa?", es: "¿Por qué pedir en La Arepa?", en: "Why order at La Arepa?" },
  "li-1": { ca: "✔ Arepes fetes al moment", es: "✔ Arepas hechas al momento", en: "✔ Made to order arepas" },
  "stat-1": { ca: "Clients satisfets cada setmana", es: "Clientes satisfechos cada semana", en: "Satisfied customers every week" },
  "process-title": { ca: "Demanar la teva arepa és molt fàcil", es: "Pedir tu arepa es muy fácil", en: "Ordering your arepa is very easy" },
  "step1-title": { ca: "1. Tria", es: "1. Elige", en: "1. Choose" },
  "process-btn": { ca: "Vull fer una comanda", es: "Quiero hacer un pedido", en: "I want to place an order" },
  "footer-text": { ca: "© 2025 · Ilerna", es: "© 2025 · Ilerna", en: "© 2025 · Ilerna" }
};



function setLanguage(lang) {
  for (const idElemento in translations) {
    const nodo = document.getElementById(idElemento);
    if (!nodo) continue;

    const textoTraducido = translations[idElemento][lang];
    if (textoTraducido) {
      nodo.innerHTML = textoTraducido;
    }
  }
}

function savePreference(lang) {
  localStorage.setItem("userLang", lang);
}

function loadPreference() {
  let idiomaPreferido = localStorage.getItem("userLang") || "es";
  setLanguage(idiomaPreferido);
}

function configurarSelectorIdiomas() {
  const contenedorSelector = document.getElementById("selector-idiomas");
  if (!contenedorSelector) return;

  contenedorSelector.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button"); 
    if (!boton || !boton.dataset.lang) return;

    const idiomaSeleccionado = boton.dataset.lang;
    setLanguage(idiomaSeleccionado);
    savePreference(idiomaSeleccionado);
  });
}

window.onload = function () {
  configurarSelectorIdiomas();
  loadPreference();
};