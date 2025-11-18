// Aguardar o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  // ===== MENU MOBILE TOGGLE =====
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  console.log("Toggle:", toggle); // Debug
  console.log("Navbar:", navbar); // Debug

  if (toggle && navbar) {
    // REMOVER TODOS OS EVENT LISTENERS ANTERIORES
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    const toggleBtn = document.getElementById("menu-toggle");

    // Adicionar evento de clique no botão toggle
    toggleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Menu toggle clicado!"); // Debug
      console.log("Classes antes:", navbar.className); // Debug

      // Forçar toggle mesmo que a classe não exista
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        console.log("Removendo active");
      } else {
        navbar.classList.add("active");
        console.log("Adicionando active");
      }

      console.log("Classes depois:", navbar.className); // Debug
      console.log("Menu ativo:", navbar.classList.contains("active")); // Debug

      // Atualizar aria-expanded
      const expanded = navbar.classList.contains("active");
      this.setAttribute("aria-expanded", String(expanded));
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener("click", function (e) {
      if (navbar.classList.contains("active")) {
        // Se o clique não foi no menu nem no toggle
        if (!navbar.contains(e.target) && !toggleBtn.contains(e.target)) {
          navbar.classList.remove("active");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Fechar menu ao clicar em um link
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navbar.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  } else {
    console.error("Elementos do menu não encontrados!");
    console.error("toggle:", toggle);
    console.error("navbar:", navbar);
  }

  // ===== FECHAR MENU NO RESIZE PARA DESKTOP =====
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (navbar) {
        navbar.classList.remove("active");
      }
      const toggleBtn = document.getElementById("menu-toggle");
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // Fechar menu mobile após clicar
      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
      const toggleBtn = document.getElementById("menu-toggle");
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // ===== HERO PARALLAX EFFECT (apenas desktop) =====
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");

  if (hero && heroBg && window.innerWidth > 768) {
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const moveX = (xPercent - 0.5) * 20;
      const moveY = (yPercent - 0.5) * 20;

      heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });

    hero.addEventListener("mouseleave", function () {
      heroBg.style.transform = "translate(0px, 0px) scale(1)";
    });
  }

  console.log("Site.js carregado com sucesso!");
});
