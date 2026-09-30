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

        /* ============================================== */
    /* 4. Envío del formulario de contacto (Web3Forms) */
    /* ============================================== */
    const WEB3FORMS_ACCESS_KEY = '32c84e9f-9a68-4ac9-8903-4465b3a12059';

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('subject', 'Nuevo mensaje desde tu portafolio');
        formData.append('from_name', 'Portafolio Web');

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        formStatus.textContent = '';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent = '✅ ¡Mensaje enviado! Te responderé pronto.';
                formStatus.style.color = '#28a745';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
            formStatus.textContent = '❌ No se pudo enviar el mensaje. Inténtalo de nuevo.';
            formStatus.style.color = '#dc3545';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});
