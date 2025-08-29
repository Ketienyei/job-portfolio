// UI utilities
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

document.addEventListener('DOMContentLoaded', () => {
  // theme
  const THEME_KEY = 'site-dark';
  const themeToggle = $('#theme-toggle');
  const saved = localStorage.getItem(THEME_KEY);
  if(saved === '1' || (saved === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.documentElement.classList.add('dark');
    if(themeToggle) themeToggle.textContent = '☀️';
  }
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, isDark ? '1' : '0');
  });

  // menu toggle
  const menuBtn = $('#menu-toggle');
  const navLinks = $('#nav-links');
  menuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
  // close mobile menu on link click
  navLinks?.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') navLinks.classList.remove('show');
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if(en.isIntersecting){ en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, {threshold:0.12});
  $$('.reveal').forEach(el => io.observe(el));

  // back to top
  const back = $('#backToTop');
  const toggleBack = () => back.style.display = window.scrollY > 600 ? 'block' : 'none';
  window.addEventListener('scroll', toggleBack);
  toggleBack();
  back?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // set year
  const y = $('#year'); if(y) y.textContent = new Date().getFullYear();

  // simple contact form (sends to mailto fallback)
  const form = $('#contact-form');
  const status = $('#status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const mail = $('#email').value.trim();
    const msg = $('#message').value.trim();
    if(!name || !mail || !msg){ status.textContent = 'Please complete all fields'; status.style.color='red'; return; }
    const subject = encodeURIComponent('Website contact from ' + name);
    const body = encodeURIComponent(msg + '\n\n' + name + ' — ' + mail);
    window.location.href = `mailto:cynthiachptoo@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email client...'; status.style.color='green';
    form.reset();
  });
});

// Smooth scroll effect for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
function revealOnScroll() {
      const reveals = document.querySelectorAll(".reveal");
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      reveals.forEach((el, index) => {
        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
          // Only trigger once
          if (!el.classList.contains("active")) {
            el.style.transitionDelay = `${index * 0.2}s`;
            el.classList.add("active");
          }
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

    

  const ctx = document.getElementById('growthChart').getContext('2d');

  // Initial chart with smooth load animation
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Users Growth",
        data: [200, 350, 500, 800, 1200, 1600],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.15)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1500, // 1.5s animation
        easing: "easeOutQuart" // smooth easing
      },
      plugins: {
        legend: { display: true, labels: { color: "#333" } }
      },
      scales: {
        x: { ticks: { color: "#333" } },
        y: { ticks: { color: "#333" } }
      }
    }
  });

  