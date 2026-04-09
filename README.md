# Práctica 13 - DAW M09: Integración de contenidos interactivos

Este proyecto integra tres funcionalidades avanzadas de interactividad directamente sobre la plantilla base existente de "La Arepa", cumpliendo con todos los requerimientos de la métrica de evaluación para la Práctica 13 (Charts, Anime.js y Canvas).

## 1. Selectores de Anclaje Utilizados
Se modificó e inyectó código HTML sin alterar el funcionamiento del código base. Los selectores principales de anclaje son:

- **Canvas (Bloque de Alto Rendimiento):** Se integró la etiqueta `<canvas id="interactive-canvas">` dentro del selector preexistente `.hero-pedido-bootstrap`. Para aislar estilos sin dañar la cascada original, se añadió la sub-clase `.js-interact-v1-hero` al componente padre.
- **Chart.js (Bloque de Visualización Dinámica):** Se ancló a través de un nuevo módulo `<section class="py-5 js-interact-v1-chart-section">` inyectado por encima del contenedor `#pedido`. Utiliza el selector `#salesChart` para ubicar el componente Canvas que dibuja el gráfico.
- **Anime.js (Elementos Animados y Micro-interacciones):** 
  - Se orquestó un *Staggering Effect* fijando el rango de objetivos sobre los selectores de las primeras tarjetas usando `.tarjetas-pedido-bootstrap .tarjeta-pedido-bootstrap`.
  - Micro-interacciones (feedback háptico/visual en ratón) se implementaron sobre `.hero-pedido-bootstrap .btn-cta` (Para el Hero Button) y sobre los pasos del proceso fijados mediante el selector compuesto `#pedido .tarjeta-pedido-bootstrap`.

## 2. Librerías Externas Implementadas (CDN)
Para optimizar y evitar contaminaciones en el entorno, ambas librerías fueron importadas a través de CDNs oficiales, directamente en el listado base al final del tag `body` de `index.html`:

1. **Chart.js:** Utilizada para graficar con theming dinámico los meses de rendimiento de ventas.
   - Fuente: `https://cdn.jsdelivr.net/npm/chart.js`
2. **Anime.js (v3.2.1):** Utilizada para la interpolación fluida de propiedades CSS, animaciones de entrada progresiva (staggered) y efectos bounce/elastico de hover.
   - Fuente: `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`

## 3. Arquitectura del Código
Cumpliendo con buenas prácticas (Aislamiento):
- **Aislamiento Global (JS):** Todo el entorno de simulación del contexto 2D (`requestAnimationFrame`), gestión de gráficas e instancias de Anime, corren por dentro de un IIFE (Immediately Invoked Function Expression) alojado en `js/interactividad_practica13.js`.
- **Aislamiento de Reglas (CSS):** Para mantener la indemnidad de `style.css`, un archivo `css/interactividad_practica13.css` fue dotado de reglas que inician con el prefijo neutral `.js-interact-v1`.
