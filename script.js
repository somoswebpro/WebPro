// Navegación móvil
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en enlace (móvil)
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('mobileMenuBtn').querySelector('i').classList.remove('fa-times');
        document.getElementById('mobileMenuBtn').querySelector('i').classList.add('fa-bars');
    });
});

// Header con scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Manejo del formulario Formspree
document.querySelector('.formulario').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    const formMessage = document.getElementById('form-message');
    
    // Deshabilitar botón y mostrar carga
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formMessage.style.display = 'none';
    
    try {
        // Enviar formulario a Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Mostrar mensaje de éxito
            formMessage.textContent = '¡Mensaje enviado con éxito! Te contactaré en menos de 24 horas.';
            formMessage.className = 'form-message form-success';
            formMessage.style.display = 'block';
            
            // Limpiar formulario
            form.reset();
            
            // Desplazarse al mensaje de éxito
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Restaurar botón después de 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Error al enviar el formulario');
        }
    } catch (error) {
        // Mostrar mensaje de error
        formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp.';
        formMessage.className = 'form-message form-error';
        formMessage.style.display = 'block';
        
        // Desplazarse al mensaje de error
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Crear partículas para el fondo nebula
function createParticles() {
    const nebulaBg = document.getElementById('nebulaBackground');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('nebula-particle');
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        // Animación de parpadeo
        const duration = Math.random() * 5 + 3;
        particle.style.animation = `pulse ${duration}s infinite alternate`;
        
        // Añadir al fondo
        nebulaBg.appendChild(particle);
    }
    
    // Añadir animación de pulso
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 0.1; }
            100% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar partículas al cargar la página
window.addEventListener('load', createParticles);
