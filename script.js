document.addEventListener('DOMContentLoaded', () => {

    /* ============================================== */
    /* 1. Funcionalidad del Menú Responsive (Hamburguesa) */
    /* ============================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Toggle para abrir/cerrar el menú en móviles
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace (solo en modo móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
            }
        });
    });


    /* ============================================== */
    /* 2. Animación Fade-in/Slide-in al hacer Scroll */
    /* ============================================== */
    
    // Seleccionar todos los elementos con la clase de animación
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Función para verificar si un elemento está visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.bottom >= 0 &&
            rect.right >= 0
        );
    }

    // Función principal para manejar la animación
    function checkAnimation() {
        elementsToAnimate.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('is-visible');
            }
            // Opcional: Si se quiere que se oculte al salir del viewport:
            // else {
            //     el.classList.remove('is-visible');
            // }
        });
    }

    // Ejecutar la función al cargar la página y en cada evento de scroll/resize
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('resize', checkAnimation);

    /* ============================================== */
    /* 3. Resaltar enlace de navegación activo (Opcional, avanzado) */
    /* ============================================== */
    // NOTA: Se ha omitido la lógica compleja de Intersection Observer para mantener el JS minimalista.
    // La clase 'active' para el hover ya está manejada en CSS.
});
