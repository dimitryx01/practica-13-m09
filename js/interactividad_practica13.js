/**
 * Práctica 13: Integración de contenidos interactivos (Chart.js, Anime.js, Canvas)
 * JS encapsulado estricto.
 */

// ==========================================
// 1. ANIMACIÓN DE ALTO RENDIMIENTO (Canvas)
// ==========================================
const initCanvasLogic = () => {
    const canvas = document.getElementById('interactive-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null, radius: 100 };

    const resize = () => {
        // Obtenemos dimensiones del padre (.hero-pedido-bootstrap)
        const parent = canvas.parentElement;
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Eventos del ratón para interacción
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Clase de Partículas
    class Particle {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = radius;
            this.color = color;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Repulsión basada en mouse pos
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
        }
    }

    const initParticles = () => {
        particles = [];
        let numParticles = (width * height) / 9000;
        // Paleta en armonía con style.css (naranjas y amarillos cálidos)
        const colors = ['rgba(255, 149, 5, 0.4)', 'rgba(255, 182, 39, 0.4)', 'rgba(255, 201, 113, 0.5)'];

        for (let i = 0; i < numParticles; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            let size = Math.random() * 3 + 1;
            let color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, size, color));
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, width, height);
        // Trazado de conexiones (Constelación)
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 149, 5, ${1 - distance/50})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        // requestAnimationFrame per requirements
        requestAnimationFrame(animateParticles); 
    };

    initParticles();
    animateParticles();
};


// ==========================================
// 2. VISUALIZACIÓN DINÁMICA (Chart.js)
// ==========================================
const initChartLogic = () => {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Theming coherente con style.css
    const primaryColor = '#ff9505'; // --color-principal
    const secondaryColor = '#ffb627'; // --color-secundario
    const bgColor = 'rgba(255, 149, 5, 0.2)'; 
    const bgColor2 = 'rgba(255, 182, 39, 0.4)';

    const dataSet1 = [120, 190, 300, 250, 220, 310];
    const dataSet2 = [220, 150, 180, 200, 320, 290];
    let isData1 = true;

    let chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
                label: 'Volumen de Arepas Servidas',
                data: dataSet1,
                backgroundColor: [bgColor, bgColor2, bgColor, bgColor2, bgColor, bgColor2],
                borderColor: [primaryColor, secondaryColor, primaryColor, secondaryColor, primaryColor, secondaryColor],
                borderWidth: 2,
                borderRadius: 4,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Responsivo dentro del contendor contenedor
            plugins: {
                legend: { position: 'top' },
                tooltip: { backgroundColor: 'rgba(51, 51, 51, 0.9)' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Interactividad exterior -> Cambiar DataSet
    document.getElementById('btn-update-data').addEventListener('click', () => {
        isData1 = !isData1;
        chartInstance.data.datasets[0].data = isData1 ? dataSet1 : dataSet2;
        chartInstance.update();
    });

    // Interactividad exterior -> Toggling Type
    document.getElementById('btn-toggle-type').addEventListener('click', (e) => {
        const currentType = chartInstance.config.type;
        const newType = currentType === 'bar' ? 'line' : 'bar';
        
        // Destruimos la instancia para evitar glitches al cambiar tipología de ejes
        chartInstance.destroy();
        chartInstance = new Chart(ctx, {
            type: newType,
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [{
                    label: 'Volumen de Arepas Servidas',
                    data: isData1 ? dataSet1 : dataSet2,
                    backgroundColor: newType === 'line' ? bgColor : [
                        bgColor, bgColor2, bgColor, bgColor2, bgColor, bgColor2
                    ],
                    borderColor: primaryColor,
                    borderWidth: 2,
                    borderRadius: 4,
                    tension: 0.4,
                    fill: newType === 'line'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
            }
        });
        
        e.target.textContent = newType === 'bar' ? 'Cambiar a Líneas' : 'Cambiar a Barras';
    });
};


// ==========================================
// 3. ANIMACIÓN DE INTERFAZ (Anime.js)
// ==========================================
const initAnimeLogic = () => {
    // 3.1. Staggering Effect en Tarjetas al arrancar
    anime({
        targets: '.tarjetas-pedido-bootstrap .tarjeta-pedido-bootstrap',
        translateY: [50, 0],   // Sliding Up
        opacity: [0, 1],       // Fade In
        easing: 'easeOutExpo',
        duration: 800,
        // Escalonado progresivo de 150ms al cargar
        delay: anime.stagger(150, {start: 300}) 
    });

    // 3.2. Micro-interacciones de feedback: CTA y Tarjetas
    const ctaButton = document.querySelector('.hero-pedido-bootstrap .btn-cta');
    if (ctaButton) {
        // En hover
        ctaButton.addEventListener('mouseenter', () => {
            anime({ targets: ctaButton, scale: 1.05, duration: 300, easing: 'easeOutQuad' });
        });
        ctaButton.addEventListener('mouseleave', () => {
            anime({ targets: ctaButton, scale: 1, duration: 300, easing: 'easeOutQuad' });
        });
        // Click interactivo (mousedown/mouseup)
        ctaButton.addEventListener('mousedown', () => {
            anime({ targets: ctaButton, scale: 0.95, duration: 100, easing: 'easeInOutQuad' });
        });
        ctaButton.addEventListener('mouseup', () => {
            anime({ targets: ctaButton, scale: 1.05, duration: 100, easing: 'easeInOutQuad' });
        });
    }

    // Efectos avanzados de hover en tarjetas
    const stepCards = document.querySelectorAll('#pedido .tarjeta-pedido-bootstrap');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -8, 
                // Añade resplandor dinámico sin pisar la clase base
                boxShadow: '0 10px 20px rgba(255, 149, 5, 0.25)', 
                duration: 400,
                easing: 'easeOutElastic(1, .8)'
            });
        });
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0, 
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Sombra default
                duration: 400,
                easing: 'easeOutExpo'
            });
        });
    });
};

// ==========================================
// ARRANQUE ENCAPSULADO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Aisla el scope de ejecución
    (() => {
        try {
            initCanvasLogic();
            initChartLogic();
            initAnimeLogic();
            console.log("Módulo de interactividad (Práctica 13) despachado correctamente.");
        } catch(err) {
            console.error("Error al arrancar la interactividad:", err);
        }
    })();
});
