document.addEventListener('DOMContentLoaded', () => {

    /* ============================================== */
    /* 1. Menú responsive (hamburguesa) */
    /* ============================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-list a');

    menuToggle.addEventListener('click', () => {
        const open = navbar.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar el menú al hacer clic en un enlace (solo en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });


    /* ============================================== */
    /* 2. Animación de entrada al hacer scroll */
    /* ============================================== */
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach((el) => observer.observe(el));
    } else {
        elementsToAnimate.forEach((el) => el.classList.add('is-visible'));
    }


    /* ============================================== */
    /* 3. Año automático en el pie de página */
    /* ============================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


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
