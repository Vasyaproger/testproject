document.addEventListener('DOMContentLoaded', function () {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(accItem => accItem.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            slide.style.opacity = 0;
            dots[i].classList.remove('active');
            dots[i].setAttribute('aria-selected', 'false');
        });
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        setTimeout(() => (slides[index].style.opacity = 1), 20);
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Инициализация слайдера только если элементы существуют
    if (slides.length > 0 && dots.length > 0) {
        showSlide(0); // Показываем первый слайд при загрузке
        slideInterval = setInterval(nextSlide, 7000);

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', () => (slideInterval = setInterval(nextSlide, 7000)));
        }
    }

    // Обработка кнопки "Читать далее" только для мобильных
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textContainer = button.parentElement;
            textContainer.classList.toggle('expanded');
            if (textContainer.classList.contains('expanded')) {
                button.textContent = 'Скрыть';
            } else {
                button.textContent = 'Читать далее';
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const body = document.body;

    if (menuToggle && mobileMenu && closeBtn) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        });

        document.addEventListener('click', (e) => {
            if (
                mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Login Popup
    const loginButtons = document.querySelectorAll('.login-btn');
    const loginPopup = document.querySelector('#loginPopup');
    const popupClose = document.querySelector('.popup-close');
    const forgotPassword = document.querySelector('.forgot-password');
    const loginForm = document.querySelector('.login-form');
    const recoverForm = document.querySelector('.recover-form');

    if (loginPopup && popupClose && loginForm && recoverForm) {
        loginButtons.forEach(button => {
            if (button.getAttribute('href') !== 'register.html') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    loginPopup.classList.add('active');
                    body.style.overflow = 'hidden';
                });
            }
        });

        popupClose.addEventListener('click', () => {
            loginPopup.classList.remove('active');
            body.style.overflow = '';
            loginForm.classList.add('active');
            recoverForm.classList.remove('active');
        });

        if (forgotPassword) {
            forgotPassword.addEventListener('click', () => {
                loginForm.classList.remove('active');
                recoverForm.classList.add('active');
            });
        }

        const recoverFormSubmit = recoverForm.querySelector('form');
        if (recoverFormSubmit) {
            recoverFormSubmit.addEventListener('submit', (e) => {
                e.preventDefault();
                const successMessage = recoverForm.querySelector('.success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        recoverForm.classList.remove('active');
                        loginForm.classList.add('active');
                    }, 2000);
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (
                loginPopup.classList.contains('active') &&
                !loginPopup.contains(e.target) &&
                !e.target.classList.contains('login-btn')
            ) {
                loginPopup.classList.remove('active');
                body.style.overflow = '';
                loginForm.classList.add('active');
                recoverForm.classList.remove('active');
            }
        });
    }
});