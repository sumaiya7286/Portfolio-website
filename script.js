// ----- typing effect -----
const roles = ["Frontend Developer", "React Learner", "Future MERN Developer", "Problem Solver"];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1600);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

// ----- mobile menu -----
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  })
);

// ----- navbar on scroll, back-to-top, active link -----
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 500);

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    const link = navLinks.querySelector(`a[href="#${sec.id}"]`);
    if (link && y >= top && y < top + sec.offsetHeight) {
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// ----- scroll reveal + counters -----
function runCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  let n = 0;
  const step = () => {
    n++;
    el.textContent = n + (n >= target ? suffix : "");
    if (n < target) setTimeout(step, 120);
  };
  step();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(runCounter);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ----- cursor glow (desktop) -----
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ----- contact form: opens the visitor's email app with the message filled in -----
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:sumaiyakhatoon772@gmail.com?subject=${subject}&body=${body}`;

  document.getElementById("formNote").textContent = "Opening your email app… thanks for reaching out!";
  e.target.reset();
});

// ----- footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
