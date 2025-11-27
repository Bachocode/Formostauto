// Animation pour les éléments au scroll
document.addEventListener("DOMContentLoaded", function () {
  // Animation au défilement
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observer tous les sections
  const sections = document.querySelectorAll("section, h2, ul");
  sections.forEach((section) => {
    section.classList.add("fade-in-on-scroll");
    observer.observe(section);
  });

  // Animation de particules pour le header
  createParticles();

  // Animation smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Effet de typing sur le titre principal
  const mainTitle = document.querySelector("header h1");
  if (mainTitle && mainTitle.textContent) {
    const text = mainTitle.textContent;
    mainTitle.textContent = "";
    mainTitle.style.opacity = "1";
    let i = 0;

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }

  // Animation des listes avec délai
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Effet parallax sur le header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (header) {
      const scrolled = window.pageYOffset;
      header.style.transform = `translateY(${scrolled * 0.5}px)`;
      header.style.opacity = 1 - scrolled / 500;
    }
  });

  // Bouton retour en haut
  createBackToTopButton();
});

// Créer des particules animées
function createParticles() {
  const header = document.querySelector("header");
  if (!header) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
    header.appendChild(particle);
  }

  // Ajouter l'animation CSS pour les particules
  if (!document.getElementById("particle-style")) {
    const style = document.createElement("style");
    style.id = "particle-style";
    style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-30px) translateX(5px); }
            }
        `;
    document.head.appendChild(style);
  }
}

// Créer un bouton retour en haut
function createBackToTopButton() {
  const button = document.createElement("button");
  button.innerHTML = "↑";
  button.className = "back-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #084526 0%, #0a5c32 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1) rotate(360deg)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1) rotate(0deg)";
  });
}

// Animation de compteur pour les statistiques (si nécessaire)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Effet de vague au hover sur les sections
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.addEventListener("mouseenter", function (e) {
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });
});

// Effet de surlignage progressif au scroll
function highlightOnScroll() {
  const elements = document.querySelectorAll("h2, p, li");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", highlightOnScroll);
