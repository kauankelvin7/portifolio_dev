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
    
    // --- LÓGICA DE CLASSE ATIVA PARA NAVEGAÇÃO
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- ANIMAÇÃO DE FADE-IN NOS ELEMENTOS
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

    // --- EFEITO DE DIGITAÇÃO
    const typedElement = document.getElementById('typed-output');
    if (typedElement) {
        var typed = new Typed('#typed-output', {
            strings: ['Desenvolvedor FullStack.', 'Criador de Interfaces.', 'Entusiasta de UI/UX.'],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true
        });
    }

    // --- LÓGICA ATUALIZADA DO FORMULÁRIO DE CONTATO
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Função para mostrar mensagens de erro
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.add('invalid');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        // Função para limpar erros
        function clearError(input) {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.remove('invalid');
            errorDiv.style.display = 'none';
        }

        // Função para validar email
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        // Adiciona um evento de escuta para o envio do formulário
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Limpa erros anteriores
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('invalid');
            });
            
            let isValid = true;

            // Realiza validação
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

            // Se o formulário não for válido, para a execução
            if (!isValid) {
                return;
            }

            // Desabilita o botão para evitar envios duplicados
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Exibe a mensagem de sucesso
                    document.getElementById('form-success').style.display = 'block';
                    contactForm.reset();

                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 5000);
                } else {
                    alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
            }
        });
    }

});

// --- MODAL DE PROJETOS
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
