// JavaScript pour la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    // Curseur personnalisé
    createCustomCursor();
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer toutes les sections
    const sections = document.querySelectorAll('.intro-section, .links-section, .features-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.95)';
        section.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Animation des cartes avec délai et effet de vague
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Effet tilt 3D
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // Animation des fonctionnalités avec délai et effet magnétique
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.12}s`;
        
        feature.addEventListener('mousemove', function(e) {
            const rect = feature.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            feature.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-10px) scale(1.05)`;
        });
        
        feature.addEventListener('mouseleave', function() {
            feature.style.transform = '';
        });
    });

    // Scroll smooth vers le contenu
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const container = document.querySelector('.container');
            container.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Effet parallax sur le hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / heroHeight);
            }
        }
    });

    // Animation du logo au survol
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });

        heroLogo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // Animation au clic
        heroLogo.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'logoFloat 3s ease-in-out infinite, spin 0.8s ease';
            }, 10);
            
            createSparkles(this);
        });
    }

    // Créer des particules autour du logo
    createHeroParticles();

    // Animation des liens au hover
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Effet de vague au clic sur les cartes (amélioré)
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(8, 69, 38, 0.4) 0%, transparent 70%);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: rippleEffect 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 0;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // Effet de pulse sur la carte
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);

            setTimeout(() => ripple.remove(), 800);
        });
    });

    // Ajouter l'animation ripple CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Compteur animé pour les statistiques (si nécessaire)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Animation des icônes de fonctionnalités
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });

        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Bouton retour en haut
    createBackToTopButton();
});

// Créer des particules dans le hero (amélioré)
function createHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        const size = Math.random() * 6 + 2;
        const opacity = Math.random() * 0.6 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 5 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
        `;
        hero.appendChild(particle);
    }

    // Ajouter l'animation CSS
    if (!document.getElementById('particle-float-style')) {
        const style = document.createElement('style');
        style.id = 'particle-float-style';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Créer des étincelles améliorées
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#FFD700', '#FFA500', '#FF6347', '#00FF00', '#00CED1', '#FF1493'];

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 20;
        const distance = Math.random() * 100 + 60;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        sparkle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 ${size * 3}px ${color};
            animation: sparkleMove 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;

        sparkle.style.setProperty('--sparkle-x', `${x}px`);
        sparkle.style.setProperty('--sparkle-y', `${y}px`);

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1200);
    }

    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkleMove {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--sparkle-x), var(--sparkle-y)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Créer un bouton retour en haut amélioré
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #084526 0%, #0a5c32 100%);
        color: white;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 8px 25px rgba(8, 69, 38, 0.5);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.2) rotate(360deg)';
        button.style.boxShadow = '0 12px 35px rgba(8, 69, 38, 0.7)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
        button.style.boxShadow = '0 8px 25px rgba(8, 69, 38, 0.5)';
    });
}

// Créer un curseur personnalisé
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #084526;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease, opacity 0.3s ease;
        opacity: 0;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #084526;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';

        cursorDot.style.left = e.clientX - 3 + 'px';
        cursorDot.style.top = e.clientY - 3 + 'px';
    });

    // Effet au hover sur les éléments cliquables
    const interactiveElements = document.querySelectorAll('a, button, .card, .feature-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.8)';
            cursor.style.borderColor = '#0d7a44';
            cursorDot.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#084526';
            cursorDot.style.transform = 'scale(1)';
        });
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// Effet de typing sur le titre (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Détecter la navigation via le clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
