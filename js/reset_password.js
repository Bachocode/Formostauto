// JavaScript pour la page de réinitialisation de mot de passe
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // Effet de hover 3D sur le container
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    container.addEventListener('mouseleave', function() {
        container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Animation des inputs au focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Effet de label flottant
        const placeholder = input.getAttribute('placeholder');
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            
            // Créer un effet de ripple
            createRipple(this);
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
        });
        
        // Validation en temps réel
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#667eea';
            }
        });
    });

    // Animation du bouton
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', function(e) {
            // Créer un effet de cercle qui s'étend
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Ajouter l'animation ripple CSS
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Animation de validation du mot de passe
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (newPasswordInput && confirmPasswordInput) {
        // Indicateur de force du mot de passe
        createPasswordStrengthIndicator(newPasswordInput);
        
        // Vérification de correspondance en temps réel
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && newPasswordInput.value) {
                if (this.value === newPasswordInput.value) {
                    this.style.borderColor = '#4caf50';
                    showCheckmark(this);
                } else {
                    this.style.borderColor = '#e74c3c';
                    removeCheckmark(this);
                }
            }
        });
    }

    // Effet de particules sur succès
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (messageDiv.classList.contains('success')) {
                    createSuccessParticles();
                }
            });
        });
        
        observer.observe(messageDiv, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
});

// Créer un effet ripple
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        animation: rippleEffect 0.6s;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    if (!document.getElementById('ripple-effect-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-effect-style';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Créer un indicateur de force de mot de passe
function createPasswordStrengthIndicator(input) {
    const indicator = document.createElement('div');
    indicator.className = 'password-strength';
    indicator.style.cssText = `
        height: 4px;
        background: #ddd;
        border-radius: 2px;
        margin-top: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
    `;
    
    const bar = document.createElement('div');
    bar.className = 'strength-bar';
    bar.style.cssText = `
        height: 100%;
        width: 0%;
        transition: all 0.3s ease;
    `;
    
    indicator.appendChild(bar);
    input.parentNode.insertBefore(indicator, input.nextSibling);
    
    input.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        bar.style.width = `${strength}%`;
        
        if (strength < 33) {
            bar.style.background = '#e74c3c';
        } else if (strength < 66) {
            bar.style.background = '#f39c12';
        } else {
            bar.style.background = '#4caf50';
        }
    });
}

// Calculer la force du mot de passe
function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 20;
    
    return Math.min(strength, 100);
}

// Afficher un checkmark
function showCheckmark(input) {
    removeCheckmark(input);
    
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    checkmark.innerHTML = '✓';
    checkmark.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #4caf50;
        font-size: 20px;
        font-weight: bold;
        animation: checkmarkPop 0.3s ease;
    `;
    
    input.style.position = 'relative';
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(checkmark);
    
    if (!document.getElementById('checkmark-style')) {
        const style = document.createElement('style');
        style.id = 'checkmark-style';
        style.textContent = `
            @keyframes checkmarkPop {
                0% { transform: translateY(-50%) scale(0); }
                50% { transform: translateY(-50%) scale(1.2); }
                100% { transform: translateY(-50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Retirer le checkmark
function removeCheckmark(input) {
    const existing = input.parentNode.querySelector('.checkmark');
    if (existing) {
        existing.remove();
    }
}

// Créer des particules de succès
function createSuccessParticles() {
    const container = document.querySelector('.container');
    const colors = ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = Math.random() * 2 + 1;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${container.offsetLeft + container.offsetWidth / 2}px;
            top: ${container.offsetTop + container.offsetHeight / 2}px;
            pointer-events: none;
            z-index: 9999;
            animation: particleBurst ${duration}s ease-out forwards;
        `;
        
        particle.style.setProperty('--endX', `${endX}px`);
        particle.style.setProperty('--endY', `${Math.random() * -300 - 100}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), duration * 1000);
    }
    
    if (!document.getElementById('particle-burst-style')) {
        const style = document.createElement('style');
        style.id = 'particle-burst-style';
        style.textContent = `
            @keyframes particleBurst {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--endX), var(--endY)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animation du logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'bounceIn 1s ease-out';
        }, 10);
    });
}
