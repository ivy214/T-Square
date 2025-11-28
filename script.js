// EmailJS 초기화
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // 여기에 EmailJS Public Key를 입력하세요
})();

document.addEventListener('DOMContentLoaded', () => {
    // Contact Form 처리
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 버튼 비활성화
            const submitBtn = contactForm.querySelector('.btn-terminal');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '[ SENDING... ]';
            submitBtn.disabled = true;

            // EmailJS로 이메일 전송
            emailjs.sendForm(
                'YOUR_SERVICE_ID',  // 여기에 EmailJS Service ID를 입력하세요
                'YOUR_TEMPLATE_ID', // 여기에 EmailJS Template ID를 입력하세요
                this
            ).then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    responseMessage.innerHTML = '<span class="success">$ Message sent successfully! ✓</span>';
                    responseMessage.style.color = 'var(--primary)';
                    contactForm.reset();

                    // 3초 후 메시지 제거
                    setTimeout(() => {
                        responseMessage.innerHTML = '';
                    }, 3000);
                },
                function (error) {
                    console.log('FAILED...', error);
                    responseMessage.innerHTML = '<span class="error">$ Error: Failed to send message ✗</span>';
                    responseMessage.style.color = '#ff5f56';
                }
            ).finally(() => {
                // 버튼 다시 활성화
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tech-card, .process-node, .metric-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .response-message {
            margin-top: 1rem;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            min-height: 20px;
        }
    `;
    document.head.appendChild(style);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Terminal Typing Effect
    const inputs = document.querySelectorAll('.terminal-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--primary)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = 'var(--text-muted)';
        });
    });
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
});
