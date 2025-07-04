document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU HAMBURGER
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        // Apenas fecha o menu se estiver no modo mobile
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

    // ANIMAÇÃO DE FADE-IN NOS ELEMENTOS ---
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

    // --- EFEITO INTERATIVO 2: EFEITO DE DIGITAÇÃO ---
    const typedElement = document.getElementById('typed-output');
    if (typedElement) {
        var typed = new Typed('#typed-output', {
            strings: ['Desenvolvedor FullStack.', 'Criador de Interfaces.', 'Entusiasta de UI/UX.'],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true
        });
    }

    // --- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('form-success');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            formSuccess.style.display = 'none';
            let isValid = true;

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

            if (isValid) {
                console.log('Formulário válido. Enviando dados...');
                contactForm.reset();
                formSuccess.style.display = 'block';
                 setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 4000);
            }
        });

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

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const closeModalButton = document.querySelector('.close-button');
    const demoLinks = document.querySelectorAll('.projeto-links a[target="_blank"]');

    demoLinks.forEach(link => {
        if (link.querySelector('.fa-globe')) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Impede que o link abra em uma nova aba
                
                const url = this.getAttribute('href');
                
                if (url && url !== "#") { // Verifica se o link não está vazio
                    iframe.src = url; // Define o URL do projeto no iframe
                    modal.style.display = 'block'; // Mostra a modal
                } else {
                    alert('Nenhuma demonstração disponível para este projeto.');
                }
            });
        }
    });

    // Função para fechar a modal
    function closeModal() {
        modal.style.display = 'none';
        iframe.src = ''; 
    }

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});
