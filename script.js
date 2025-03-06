document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carrossel
    const carousel = {
        currentSlide: 0,
        container: document.querySelector('.carousel-container'),
        items: document.querySelectorAll('.carousel-item'),
        initialize: function() {
            const indicators = document.querySelector('.carousel-indicators');
            this.items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('indicator');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                indicators.appendChild(dot);
            });

            this.updateTransform();
            document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
            document.querySelector('.next').addEventListener('click', () => this.nextSlide());

            setInterval(() => this.nextSlide(), 5000); // Auto-advance every 5 seconds
        },
        updateTransform: function() {
            const offset = -this.currentSlide * 100;
            this.container.style.transform = `translateX(${offset}%)`;
        },
        goToSlide: function(n) {
            const indicators = document.querySelectorAll('.indicator');
            indicators[this.currentSlide].classList.remove('active');
            
            this.currentSlide = (n + this.items.length) % this.items.length;
            
            indicators[this.currentSlide].classList.add('active');
            this.updateTransform();
        },
        nextSlide: function() {
            this.goToSlide(this.currentSlide + 1);
        },
        prevSlide: function() {
            this.goToSlide(this.currentSlide - 1);
        }
    };

    carousel.initialize();
});
