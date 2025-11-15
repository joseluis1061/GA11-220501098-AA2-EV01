// ============================================
// VARIABLES GLOBALES
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// ============================================
// MENU HAMBURGUESA (MOBILE)
// ============================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Event listener para el botón hamburguesa
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// ============================================
// NAVEGACIÓN Y SCROLL SUAVE
// ============================================
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Click en enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Cerrar menú móvil al hacer click
        closeMobileMenu();
        
        // Prevenir comportamiento por defecto
        e.preventDefault();
        
        // Obtener el destino del scroll
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calcular la posición considerando la altura del navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// DESTACAR LINK ACTIVO EN NAVEGACIÓN
// ============================================
function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remover clase active de todos los links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar clase active al link correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Event listener para scroll
window.addEventListener('scroll', highlightActiveSection);

// ============================================
// NAVBAR STICKY CON SOMBRA AL SCROLL
// ============================================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// ANIMACIONES AL HACER SCROLL (FADE IN)
// ============================================
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.content-card, .practice-card, .instrument-card, .phase-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// BOTÓN SCROLL TO TOP
// ============================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    
    // Estilos del botón
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #39A900, #2d8500);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(57, 169, 0, 0.4);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(57, 169, 0, 0.6)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(57, 169, 0, 0.4)';
    });
    
    // Click para scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONTADOR ANIMADO PARA NÚMEROS
// ============================================
function animateNumbers() {
    const numberElements = document.querySelectorAll('.practice-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.textContent;
                entry.target.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    entry.target.style.transform = 'scale(1)';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    numberElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// EFECTO PARALLAX EN HERO SECTION
// ============================================
function parallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// ============================================
// TOOLTIPS PERSONALIZADOS
// ============================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #1C1C1C;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// ============================================
// MEJORAR ACCESIBILIDAD - NAVEGACIÓN POR TECLADO
// ============================================
function enhanceKeyboardNavigation() {
    // Permitir cerrar menú móvil con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Focus visible para accesibilidad
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Agregar estilos para navegación por teclado
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #39A900 !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING PARA IMÁGENES
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// COPIAR CÓDIGO AL PORTAPAPELES
// ============================================
function initCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.textContent = 'Copiar';
        button.className = 'copy-code-btn';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 6px 12px;
            background-color: #39A900;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.3s ease;
        `;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
        
        button.addEventListener('click', async () => {
            const code = block.textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = '¡Copiado!';
                button.style.backgroundColor = '#2d8500';
                setTimeout(() => {
                    button.textContent = 'Copiar';
                    button.style.backgroundColor = '#39A900';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
    });
}

// ============================================
// ESTADÍSTICAS Y CONTADORES
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// MODO OSCURO (OPCIONAL)
// ============================================
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Cambiar modo oscuro');
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1C1C1C;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
        display: none;
    `;
    
    // Descomentar la siguiente línea para habilitar el botón de modo oscuro
    // document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Guardar preferencia
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Cargar preferencia guardada
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
}

// ============================================
// PROGRESS BAR AL HACER SCROLL
// ============================================
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #39A900, #FF5800);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// BÚSQUEDA EN LA PÁGINA
// ============================================
function initSearchFunctionality() {
    // Esta función podría expandirse para agregar una barra de búsqueda
    // que permita buscar contenido en la página
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            // Aquí se podría implementar una búsqueda personalizada
            console.log('Búsqueda activada');
        }
    });
}

// ============================================
// IMPRESIÓN MEJORADA
// ============================================
function optimizePrint() {
    window.addEventListener('beforeprint', () => {
        // Expandir todas las secciones colapsables antes de imprimir
        console.log('Preparando para imprimir...');
    });
    
    window.addEventListener('afterprint', () => {
        console.log('Impresión completada');
    });
}

// ============================================
// MANEJO DE ERRORES
// ============================================
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Error detectado:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesa rechazada:', e.reason);
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Performance entry:', entry);
            }
        });
        
        // Descomentar para activar monitoreo
        // observer.observe({ entryTypes: ['navigation', 'paint'] });
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
    console.log('🚀 Inicializando aplicación SENA - Calidad de Software');
    
    // Funcionalidades principales
    highlightActiveSection();
    animateOnScroll();
    createScrollToTopButton();
    animateNumbers();
    parallaxEffect();
    createProgressBar();
    
    // Funcionalidades adicionales
    initTooltips();
    enhanceKeyboardNavigation();
    lazyLoadImages();
    initCopyCodeButtons();
    animateCounters();
    initSearchFunctionality();
    optimizePrint();
    initErrorHandling();
    
    // Opcional: descomentar para habilitar
    // initDarkMode();
    // monitorPerformance();
    
    console.log('✅ Aplicación inicializada correctamente');
}

// ============================================
// CARGAR CUANDO EL DOM ESTÉ LISTO
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// MANEJAR CAMBIOS DE TAMAÑO DE VENTANA
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar menú móvil si se cambia a desktop
        if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        console.log('Ventana redimensionada');
    }, 250);
});
