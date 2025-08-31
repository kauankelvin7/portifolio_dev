document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU HAMBURGER
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));
    
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ANIMAÇÃO DE FADE-IN NOS ELEMENTOS
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });

    // EFEITO DE DIGITAÇÃO
    const typedElement = document.getElementById('typed-output');
    if (typedElement) {
        var typed = new Typed('#typed-output', {
            strings: ['Desenvolvedor FullStack.', 'Criador de Interfaces.', 'Entusiasta de UI/UX.'],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true
        });
    }

    // --- VALIDAÇÃO DO FORMULÁRIO COM POPUP DE ENVIO DE MENSAGEM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        contactForm.addEventListener('submit', function(event) {
            // Remove erros anteriores
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('invalid');
            });
            
            let isValid = true;

            // Validações
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor, insira seu nome.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, insira um email válido.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor, escreva sua mensagem.');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            // Se inválido, impede o envio
            if (!isValid) {
                event.preventDefault();
                return false;
            }

            showSuccessPopup();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }
        });

        // FUNÇÃO PARA MOSTRAR POPUP DE ENVIO DE MENSAGEM
        function showSuccessPopup() {
            // Cria o popup
            const popup = document.createElement('div');
            popup.id = 'success-popup';
            popup.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                ">
                    <div style="
                        background: #fff;
                        padding: 40px 30px;
                        border-radius: 20px;
                        text-align: center;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        max-width: 420px;
                        width: 90%;
                        animation: popIn 0.4s ease;
                    ">
                        <div style="
                            width: 80px;
                            height: 80px;
                            background: linear-gradient(135deg, #4CAF50, #45a049);
                            border-radius: 50%;
                            margin: 0 auto 25px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 40px;
                            color: white;
                            animation: bounce 0.6s ease;
                        ">✓</div>
                        <h3 style="
                            color: #333;
                            margin-bottom: 15px;
                            font-size: 28px;
                            font-weight: 600;
                        ">Mensagem Enviada! 🎉</h3>
                        <p style="
                            color: #666;
                            margin-bottom: 25px;
                            line-height: 1.6;
                            font-size: 16px;
                        ">Obrigado pelo contato! Receberei sua mensagem e responderei o mais breve possível.</p>
                        <button onclick="document.getElementById('success-popup').remove()" style="
                            background: linear-gradient(135deg, #4CAF50, #45a049);
                            color: white;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        " 
                        onmouseover="this.style.transform='scale(1.05)'" 
                        onmouseout="this.style.transform='scale(1)'">Perfeito!</button>
                    </div>
                </div>
            `;

            // Adiciona estilos de animação
            if (!document.getElementById('popup-styles')) {
                const style = document.createElement('style');
                style.id = 'popup-styles';
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes popIn {
                        from { 
                            transform: scale(0.7) translateY(-50px); 
                            opacity: 0; 
                        }
                        to { 
                            transform: scale(1) translateY(0); 
                            opacity: 1; 
                        }
                    }
                    @keyframes bounce {
                        0%, 20%, 53%, 80%, 100% {
                            transform: translate3d(0,0,0);
                        }
                        40%, 43% {
                            transform: translate3d(0, -10px, 0);
                        }
                        70% {
                            transform: translate3d(0, -5px, 0);
                        }
                        90% {
                            transform: translate3d(0, -2px, 0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(popup);

            // Auto-remove após 8 segundos
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                }
            }, 8000);
        }

        // Funções auxiliares
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.add('invalid');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        function clearError(input) {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.remove('invalid');
            errorDiv.style.display = 'none';
        }

        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
});

// MODAL DE PROJETOS
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const closeModalButton = document.querySelector('.close-button');
    const demoLinks = document.querySelectorAll('.projeto-links a[target="_blank"]');

    demoLinks.forEach(link => {
        if (link.querySelector('.fa-globe')) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                const url = this.getAttribute('href');
                
                if (url && url !== "#") {
                    iframe.src = url;
                    modal.style.display = 'block';
                } else {
                    alert('Nenhuma demonstração disponível para este projeto.');
                }
            });
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        iframe.src = ''; 
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});
