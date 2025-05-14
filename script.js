document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Скрываем все элементы, кроме первого
        if (item !== accordionItems[0]) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
        
        header.addEventListener('click', () => {
            // Проверяем, активен ли текущий элемент
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Если элемент не был активен, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Обновленная функциональность слайдера отзывов
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Функция для показа определенного слайда на десктопе
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
        });
        
        // Деактивируем все точки
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем нужный слайд
        slides[index].classList.add('active');
        
        // Плавно показываем слайд
        setTimeout(() => {
            slides[index].style.opacity = 1;
        }, 20);
        
        // Активируем соответствующую точку
        dots[index].classList.add('active');
        
        // Обновляем текущий индекс
        currentSlide = index;
    }
    
    // Показ следующего слайда
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // Показ предыдущего слайда
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автоматическое переключение слайдов каждые 7 секунд
    let slideInterval = setInterval(() => {
        nextSlide();
    }, 7000);
    
    // Останавливаем автоматическое переключение при наведении на слайдер
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 7000);
        });
    }
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
  });