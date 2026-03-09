// frontend/src/main.js
import 'aos/dist/aos.css';
import AOS from 'aos';

// Inject HTML template
import appHtml from './app.html?raw';

document.getElementById('app').innerHTML = appHtml;

// Bootstrap and FontAwesome via CDN are in index.html
// Initialize AOS
AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });

// Particles.js via CDN
const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
particlesScript.onload = () => {
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#2ecc71', '#3498db', '#f1c40f'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#2ecc71', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }
};
document.head.appendChild(particlesScript);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.setAttribute('href', href);
}

function showModal(id) {
  const el = document.getElementById(id);
  if (!el || !window.bootstrap?.Modal) return null;
  const modal = window.bootstrap.Modal.getOrCreateInstance(el);
  modal.show();
  return modal;
}

function hideModal(id) {
  const el = document.getElementById(id);
  if (!el || !window.bootstrap?.Modal) return;
  const modal = window.bootstrap.Modal.getOrCreateInstance(el);
  modal.hide();
}

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  applyStaggerAnimations();

  // Add mouse move parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && heroContent) {
    heroSection.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const translateX = (mouseX - 0.5) * 20;
      const translateY = (mouseY - 0.5) * 20;

      heroContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  }

  // Add typing effect to dynamic text with enhanced animation
  const dynamicTextElement = document.getElementById('dynamic-text');
  if (dynamicTextElement) {
    dynamicTextElement.style.borderRight = '3px solid var(--accent-color)';
    dynamicTextElement.style.animation = 'blink-caret 1s step-end infinite';
  }

  // Add CSS for additional animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: var(--accent-color); }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }

    .glass-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .glass-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    .social-icon {
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      filter: drop-shadow(0 0 10px var(--secondary-color));
    }
  `;
  document.head.appendChild(style);
});

function applyStaggerAnimations() {
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
    badge.classList.add('fade-in-up');
  });
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in-up');
  });
}

loadPublicContent();

// Navbar scroll effect
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling and mobile navbar auto-close
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
    if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});

// Active nav item
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-hover');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Highlight skills (event delegation so it works with dynamically rendered skills)
document.addEventListener('mouseover', (e) => {
  const badge = e.target?.closest?.('.skill-badge');
  if (!badge) return;
  badge.classList.add('highlighted');
});
document.addEventListener('mouseout', (e) => {
  const badge = e.target?.closest?.('.skill-badge');
  if (!badge) return;
  badge.classList.remove('highlighted');
});

// Project Live links via env (optional)
const biteflowLive = import.meta.env.VITE_BITEFLOW_URL || '';
const shoppingLive = import.meta.env.VITE_SHOPPING_URL || '';
const biteflowDemoLink = document.getElementById('biteflow-demo-link');
const shoppingDemoLink = document.getElementById('shopping-demo-link');
if (biteflowDemoLink) {
  if (biteflowLive) biteflowDemoLink.href = biteflowLive; else biteflowDemoLink.style.display = 'none';
}
if (shoppingDemoLink) {
  if (shoppingLive) shoppingDemoLink.href = shoppingLive; else shoppingDemoLink.style.display = 'none';
}

// Contact form submission to backend
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
let API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
function apiUrl(path) {
  if (!path.startsWith('/')) return apiUrl(`/${path}`);
  return API_BASE ? `${API_BASE}${path}` : path;
}

async function fetchJson(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

const fallbackProfile = {
  name: 'Shaik Mohammed Sameer',
  headline: 'B.Tech CSE | KL University',
  about: document.getElementById('footerAbout')?.textContent || '',
  linkedin: document.getElementById('profileLinkedin')?.getAttribute('href') || '',
  github: document.getElementById('profileGithub')?.getAttribute('href') || '',
  contactEmail: document.getElementById('contactEmail')?.textContent || '',
  contactPhone: document.getElementById('contactPhone')?.textContent || '',
  contactLocation: document.getElementById('contactLocation')?.textContent || '',
};

const fallbackSkills = [
  { name: 'C', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'React.js', category: 'Web' },
  { name: 'Node.js', category: 'Web' },
  { name: 'Spring Boot', category: 'Web' },
  { name: 'HTML', category: 'Web' },
  { name: 'CSS', category: 'Web' },
  { name: 'SQL', category: 'Other' },
  { name: 'MySQL', category: 'Other' },
  { name: 'Firebase', category: 'Other' },
  { name: 'Linux', category: 'Other' },
  { name: 'Power BI', category: 'Other' },
  { name: 'LaTeX', category: 'Other' },
];

const fallbackProjects = [
  {
    title: 'ApnaRide - Ride Sharing Platform',
    description:
      'A comprehensive ride-sharing platform connecting drivers with passengers, featuring real-time tracking, fare estimation, and secure payments.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Google Maps API'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '/assets/image/placeholder.svg',
  },
  {
    title: 'Food Delivery Platform',
    description:
      'An end-to-end food delivery solution with restaurant listings, menu management, cart functionality, and order tracking.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Redux'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '/assets/image/placeholder.svg',
  },
  {
    title: 'Farmer-Friendly Platform',
    description: 'A web platform for direct agricultural sales with real-time features.',
    tech: ['React.js', 'Spring Boot', 'MySQL'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/farm-web',
    liveUrl: '',
    imageUrl: '/assets/image/farmer-platform.jpg',
  },
];

function iconForSkill(name) {
  const map = {
    C: 'fab fa-cuttlefish',
    Java: 'fab fa-java',
    'React.js': 'fab fa-react',
    'Node.js': 'fab fa-node-js',
    'Spring Boot': 'fas fa-server',
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    SQL: 'fas fa-database',
    MySQL: 'fas fa-database',
    Firebase: 'fas fa-database',
    Linux: 'fab fa-linux',
    'Power BI': 'fas fa-chart-bar',
    LaTeX: 'fas fa-file-alt',
  };
  return map[name] || 'fas fa-check';
}

function renderProfile(profile) {
  const p = profile || fallbackProfile;
  setText('profileName', p.name || fallbackProfile.name);
  setText('profileHeadline', p.headline || fallbackProfile.headline);
  setText('footerAbout', p.about || fallbackProfile.about);
  if (p.linkedin) {
    setLink('profileLinkedin', p.linkedin);
    setLink('footerLinkedin', p.linkedin);
  }
  if (p.github) {
    setLink('profileGithub', p.github);
    setLink('footerGithub', p.github);
  }
  if (p.contactEmail) {
    const emailEl = document.getElementById('contactEmail');
    if (emailEl) {
      emailEl.textContent = p.contactEmail;
      emailEl.setAttribute('href', `mailto:${p.contactEmail}`);
    }
  }
  if (p.contactPhone) {
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) {
      phoneEl.textContent = p.contactPhone;
      const tel = String(p.contactPhone).replace(/\s+/g, '');
      phoneEl.setAttribute('href', `tel:${tel}`);
    }
  }
  if (p.contactLocation) setText('contactLocation', p.contactLocation);
}

function createSkillBadge(skill) {
  const span = document.createElement('span');
  span.className = 'skill-badge';
  span.setAttribute('data-skill', skill.name);
  span.innerHTML = `<i class="${escapeHtml(iconForSkill(skill.name))}"></i> ${escapeHtml(skill.name)}`;
  return span;
}

function renderSkills(skills) {
  const list = Array.isArray(skills) && skills.length ? skills : fallbackSkills;
  const programming = document.getElementById('skillsProgramming');
  const web = document.getElementById('skillsWeb');
  const other = document.getElementById('skillsOther');
  if (programming) programming.innerHTML = '';
  if (web) web.innerHTML = '';
  if (other) other.innerHTML = '';
  for (const s of list) {
    const category = String(s.category || '').toLowerCase();
    const badge = createSkillBadge({ name: s.name, category: s.category });
    if (category === 'programming') programming?.appendChild(badge);
    else if (category === 'web') web?.appendChild(badge);
    else other?.appendChild(badge);
  }
}

function renderProjects(projects) {
  const list = Array.isArray(projects) && projects.length ? projects : fallbackProjects;
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach((p, idx) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.setAttribute('data-aos', 'zoom-in');
    if (idx) col.setAttribute('data-aos-delay', String(Math.min(idx * 100, 300)));

    const imgUrl = p.imageUrl || '/assets/image/placeholder.svg';
    const tech = Array.isArray(p.tech) ? p.tech : [];

    const githubBtn = p.githubUrl
      ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" class="view-code-btn"><i class="fab fa-github"></i> GitHub</a>`
      : '';
    const liveBtn = p.liveUrl
      ? `<a href="${escapeHtml(p.liveUrl)}" target="_blank" class="view-code-btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : '';

    col.innerHTML = `
      <div class="glass-card project-card h-100">
        <img loading="lazy" src="${escapeHtml(imgUrl)}" onerror="this.onerror=null;this.src='/assets/image/placeholder.svg';" alt="${escapeHtml(p.title || 'Project')}" class="img-fluid rounded-top mb-3">
        <h5>${escapeHtml(p.title || '')}</h5>
        <p>${escapeHtml(p.description || '')}</p>
        <p><strong>Tech:</strong></p>
        <div class="tech-container">
          ${tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
        </div>
        ${githubBtn || liveBtn ? `<div class="d-flex gap-2 mt-3">${githubBtn}${liveBtn}</div>` : ''}
      </div>
    `;
    grid.appendChild(col);
  });
}

function applyResumeLink(resume) {
  const link = document.getElementById('resumeDownloadLink');
  if (!link) return;
  const url = resume?.url || '/assets/resumea1.pdf';
  const version = resume?.version || '';
  const nextHref = version ? `${url}?v=${encodeURIComponent(version)}` : url;
  link.setAttribute('href', nextHref);
}

async function loadPublicContent() {
  try {
    const [profileRes, skillsRes, projectsRes, resumeRes] = await Promise.allSettled([
      fetchJson('/api/public/profile'),
      fetchJson('/api/public/skills'),
      fetchJson('/api/public/projects'),
      fetchJson('/api/public/resume'),
    ]);

    const profile = profileRes.status === 'fulfilled' ? profileRes.value.profile : fallbackProfile;
    const skills = skillsRes.status === 'fulfilled' ? skillsRes.value.skills : fallbackSkills;
    const projects = projectsRes.status === 'fulfilled' ? projectsRes.value.projects : fallbackProjects;
    const resume = resumeRes.status === 'fulfilled' ? resumeRes.value : { url: '/assets/resumea1.pdf', version: '' };

    renderProfile(profile);
    renderSkills(skills);
    renderProjects(projects);
    applyResumeLink(resume);

    applyStaggerAnimations();
    AOS.refresh();
  } catch (_e) {
    renderProfile(fallbackProfile);
    renderSkills(fallbackSkills);
    renderProjects(fallbackProjects);
    applyResumeLink({ url: '/assets/resumea1.pdf', version: '' });
    applyStaggerAnimations();
  }
}
if (contactForm) {
  // Contact form submits via plain HTML POST (e.g. Formspree). No JS interception.
}
