// Espera a que todo el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón de menú hamburguesa y los enlaces de navegación
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Si existe el botón hamburguesa, añade un listener para alternar clases al hacer clic
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Activa o desactiva la clase 'active' en el botón y el menú
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Selecciona todos los enlaces de navegación
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Si el menú hamburguesa está activo, lo cierra al hacer clic en un enlace
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Efecto al hacer scroll: cambiar clase de navbar y mostrar botón "scroll to top"
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        // Si se ha hecho scroll hacia abajo más de 50px, añade clase 'scrolled'
        if (window.scrollY > 15) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Muestra el botón de "scroll to top" si se baja más de 300px
        const scrollTopBtn = document.getElementById('scroll-top');
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Ejecuta animaciones al hacer scroll
        revealOnScroll();
    });
    
    // Desplazamiento suave al hacer clic en enlaces de ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Previene el salto directo
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajusta la posición para considerar la altura de la navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Desplazamiento animado hacia el objetivo
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Función para animar los contadores numéricos
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.dataset.target; // Valor final
            const count = +counter.innerText; // Valor actual
            const increment = target / 100; // Incremento gradual
            
            // Si no ha llegado al valor final, actualiza
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(), 10); // Vuelve a llamar con retardo
            } else {
                counter.innerText = target; // Fija el valor final
            }
        });
    }
    
    // Función para activar animaciones al hacer scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal-up, .reveal-stagger');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            // Si el elemento está lo suficientemente visible, añade la clase 'active'
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
                
                // Si el elemento contiene barras de progreso, las anima
                if (reveal.classList.contains('impact-icons')) {
                    document.querySelectorAll('.progress').forEach(progress => {
                        const percent = progress.dataset.percent;
                        progress.style.width = percent + '%';
                    });
                }
                
                // Si el elemento contiene contadores, los anima
                if (reveal.querySelector('.counter')) {
                    animateCounter();
                }
            }
        });
    }
    
    // Inicializa todas las barras de progreso en 0%
    document.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = '0%';
    });
    
    // Inicializa la animación de partículas si existe el contenedor
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Llamada inicial para mostrar elementos visibles al cargar
    setTimeout(() => {
        revealOnScroll();
    }, 100);
    
    // Funcionalidad del botón "scroll to top"
    document.getElementById('scroll-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Función para alternar el menú (también puede ser usada desde el HTML)
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Crea estilos dinámicos para mensajes de agradecimiento y animaciones
const style = document.createElement('style');
style.textContent = `
    .thank-you-message {
        text-align: center;
        padding: 2rem 0;
    }
    
    .check-icon {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
// Añade los estilos al head del documento
document.head.appendChild(style);
