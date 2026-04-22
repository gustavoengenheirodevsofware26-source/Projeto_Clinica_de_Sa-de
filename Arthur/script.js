// Funcionalidade do formulário de agendamento
document.getElementById('formAgendamento').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtém os valores do formulário
    const inputs = this.querySelectorAll('input, select, textarea');
    let formData = {};
    
    inputs.forEach(input => {
        if (input.value) {
            formData[input.placeholder || input.name] = input.value;
        }
    });
    
    // Simula envio do formulário
    const btn = this.querySelector('button[type="submit"]');
    const btnText = btn.textContent;
    
    btn.textContent = '✓ Enviado com sucesso!';
    btn.style.backgroundColor = '#28a745';
    
    // Limpa o formulário
    this.reset();
    
    // Restaura o botão após 3 segundos
    setTimeout(() => {
        btn.textContent = btnText;
        btn.style.backgroundColor = '';
    }, 3000);
    
    console.log('Agendamento realizado:', formData);
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Ativa animação ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica observador aos cards
document.querySelectorAll('.servico-card, .medico-card, .info-bloco').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Menu mobile responsivo
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

console.log('Website da Clínica Saúde Plus carregado com sucesso!');
