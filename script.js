document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(accItem => accItem.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
        });
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        setTimeout(() => slides[index].style.opacity = 1, 20);
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

    let slideInterval = setInterval(nextSlide, 7000);
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 7000));

    // Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const body = document.body;

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
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Login Popup
    const loginButtons = document.querySelectorAll('.login-btn');
    const loginPopup = document.querySelector('#loginPopup');
    const popupClose = document.querySelector('.popup-close');
    const forgotPassword = document.querySelector('.forgot-password');
    const loginForm = document.querySelector('.login-form');
    const recoverForm = document.querySelector('.recover-form');

    loginButtons.forEach(button => {
        // Проверяем, есть ли у кнопки атрибут href и если он равен "register.html", не перехватываем клик
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

    forgotPassword.addEventListener('click', () => {
        loginForm.classList.remove('active');
        recoverForm.classList.add('active');
    });

    // Handle form submission (basic example for password recovery)
    const recoverFormSubmit = recoverForm.querySelector('form');
    recoverFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMessage = recoverForm.querySelector('.success-message');
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
            recoverForm.classList.remove('active');
            loginForm.classList.add('active');
        }, 2000);
    });

    document.addEventListener('click', (e) => {
        if (loginPopup.classList.contains('active') && !loginPopup.contains(e.target) && !e.target.classList.contains('login-btn')) {
            loginPopup.classList.remove('active');
            body.style.overflow = '';
            loginForm.classList.add('active');
            recoverForm.classList.remove('active');
        }
    });
});