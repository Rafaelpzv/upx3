
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  if(toggle && navbar){
    toggle.addEventListener('click', function(){
      navbar.classList.toggle('active');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  }
  // close menu on resize to desktop
  window.addEventListener('resize', function(){
    if(window.innerWidth > 768){
      navbar.classList.remove('active');
      if(toggle) toggle.setAttribute('aria-expanded','false');
    }
  });

  // Add smooth scroll for in-page anchors (if any)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
      // collapse mobile nav after clicking a link
      if(navbar.classList.contains('active')) navbar.classList.remove('active');
      if(toggle) toggle.setAttribute('aria-expanded','false');
    });
  });
});
