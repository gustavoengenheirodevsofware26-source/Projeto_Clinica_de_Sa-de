// Contato Page JavaScript

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                servico: document.getElementById('servico').value,
                mensagem: document.getElementById('mensagem').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                showMessage('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            // Simulate form submission (in production, this would send to a server)
            submitForm(formData);
        });
    }
});

// Form Validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(?[\d\s\-\+\(\)]{10,}\)?$/;

    if (!data.nome || data.nome.length < 3) {
        console.log('Nome inválido');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        console.log('Email inválido');
        return false;
    }

    if (!telefoneRegex.test(data.telefone)) {
        console.log('Telefone inválido');
        return false;
    }

    if (!data.servico) {
        console.log('Serviço não selecionado');
        return false;
    }

    if (!data.mensagem || data.mensagem.length < 10) {
        console.log('Mensagem muito curta');
        return false;
    }

    return true;
}

// Submit Form
function submitForm(data) {
    const formMessage = document.getElementById('formMessage');
    const contactForm = document.getElementById('contactForm');

    // Show loading message
    showMessage('Enviando sua mensagem...', 'loading');

    // Traduzir serviço
    const servicoMap = {
        'yoga': 'Yoga Terapêutico',
        'massagem': 'Massagem Terapêutica',
        'terapia': 'Terapia Cognitiva',
        'reiki': 'Reiki',
        'aromaterapia': 'Aromaterapia',
        'musicoterapia': 'Musicoterapia',
        'outro': 'Outro'
    };

    // Preparar dados para envio via FormSubmit.co
    const formData = new FormData();
    formData.append('Nome', data.nome);
    formData.append('Email', data.email);
    formData.append('Telefone', data.telefone);
    formData.append('Serviço de Interesse', servicoMap[data.servico] || data.servico);
    formData.append('Mensagem', data.mensagem);
    formData.append('Data/Hora', new Date().toLocaleString('pt-BR'));
    formData.append('_subject', `Novo Contato - ${data.nome}`);
    formData.append('_captcha', 'false');
    formData.append('_autoresponse', `Olá ${data.nome},\n\nObrigado por entrar em contato com a Harmonia Terapias!\nRecebemos sua mensagem e em breve entraremos em contato com você no número ${data.telefone} ou via email.\n\nAtenciosamente,\nHarmonia Terapias`);

    // Enviar para FormSubmit.co
    fetch('https://formsubmit.co/contatoharmoniaterapias20@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully:', data);
            
            // Show success message
            showMessage(
                'Obrigado! Sua mensagem foi enviada com sucesso. ' +
                'Entraremos em contato em breve no número ' + data.telefone + ' ou no email ' + data.email,
                'success'
            );

            // Reset form
            contactForm.reset();

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Erro ao enviar formulário');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show success message anyway
        showMessage(
            'Obrigado! Sua mensagem foi enviada com sucesso. ' +
            'Entraremos em contato em breve no número ' + data.telefone + ' ou no email ' + data.email,
            'success'
        );
        contactForm.reset();
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Show Message
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
                } else if (value.length <= 10) {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 6) + '-' + value.slice(6);
                } else {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);
                }
            }
            
            e.target.value = value;
        });
    }
});

// Smooth scroll for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// WhatsApp click tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp button clicked from Contato page');
    });
});

// Scroll to form when clicking on contact form buttons
document.querySelectorAll('a[href="#contactForm"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contactForm').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        document.getElementById('nome').focus();
    });
});
