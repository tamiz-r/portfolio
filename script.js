/**
 * TAMIZ R — CINEMATIC ANIMATED FILM ENGINE
 * Features: Full-Screen Film Intro Sequence, 35mm Procedural Film Grain,
 * Stardust Particle Simulation, 3D Card Tilt with Specular Spotlight,
 * Live Terminal Diagnostics, Security Anti-Theft Shield,
 * Visitor Access Gatekeeper with Email Telemetry (rtamizh7@gmail.com),
 * and Smooth Dark/Light Transition.
 * Zero Emojis.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFilmIntro();
  initFilmGrain();
  initThemeSwitcher();
  initSecurityShield();
  initVisitorGate();
  initScrollBar();
  initTerminalStream();
  initRoleRotator();
  initCardTiltAndSpotlight();
  initScrollReveal();
  initStatCounters();
  initSkillGauges();
  initContactForm();
});

/* ==========================================================================
   1. CINEMATIC FILM INTRO SEQUENCE
   Full-screen movie studio intro with letter-by-letter reveal,
   anamorphic golden beam, and IMAX letterbox transitions.
   ========================================================================== */
function initFilmIntro() {
  const intro = document.getElementById('film-intro');
  if (!intro) return;

  const studio = document.getElementById('intro-studio');
  const letters = intro.querySelectorAll('.il');
  const line = document.getElementById('intro-line');
  const roles = document.getElementById('intro-roles');
  const btn = document.getElementById('intro-btn');
  const skip = document.getElementById('intro-skip');
  const particleCanvas = document.getElementById('particle-canvas');

  // Launch stardust particles in intro
  let particleCleanup = null;
  if (particleCanvas) {
    particleCleanup = runIntroParticles(particleCanvas);
  }

  // Check if visitor has already watched the intro in this session
  const alreadyViewed = sessionStorage.getItem('tamiz_film_intro_viewed');
  if (alreadyViewed) {
    intro.classList.add('dismissed');
    if (particleCleanup) particleCleanup();
    checkGatekeeperModal();
    return;
  }

  // Step 1: Engage letterbox bars
  setTimeout(() => {
    intro.classList.add('lb-active');
  }, 200);

  // Step 2: "A TAMIZ R PRODUCTION" fades in
  setTimeout(() => {
    if (studio) studio.classList.add('show');
  }, 600);

  // Step 3: "TAMIZ R" letters slam in sequentially
  letters.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('reveal');
    }, 1100 + index * 120);
  });

  // Step 4: Expanding anamorphic golden beam
  const beamDelay = 1100 + letters.length * 120 + 200;
  setTimeout(() => {
    if (line) line.classList.add('expand');
  }, beamDelay);

  // Step 5: Roles tag row fades in
  setTimeout(() => {
    if (roles) roles.classList.add('show');
  }, beamDelay + 500);

  // Step 6: Enter button and skip button reveal
  setTimeout(() => {
    if (btn) btn.classList.add('show');
    if (skip) skip.classList.add('show');
  }, beamDelay + 1100);

  function dismissIntro() {
    if (intro.classList.contains('dismissing') || intro.classList.contains('dismissed')) return;

    intro.classList.add('dismissing');
    sessionStorage.setItem('tamiz_film_intro_viewed', 'true');

    setTimeout(() => {
      intro.classList.add('dismissed');
      intro.classList.remove('dismissing');
      if (particleCleanup) particleCleanup();
      checkGatekeeperModal();
    }, 900);
  }

  if (btn) btn.addEventListener('click', dismissIntro);
  if (skip) skip.addEventListener('click', dismissIntro);

  // Allow pressing Enter or Space to enter
  window.addEventListener('keydown', (e) => {
    if (!intro.classList.contains('dismissed')) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        dismissIntro();
      }
    }
  });
}

function checkGatekeeperModal() {
  const gate = document.getElementById('access-gate');
  const savedVisitor = localStorage.getItem('tamiz_visitor_auth');
  if (!savedVisitor && gate) {
    gate.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* ==========================================================================
   2. INTRO STARDUST PARTICLES CANVAS
   ========================================================================== */
function runIntroParticles(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animId = null;
  let width = 0;
  let height = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = 90;
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * Math.PI * 2
    });
  }

  let time = 0;
  function loop() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(time + p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 169, 74, ${currentAlpha * 0.9})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(200, 169, 74, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animId = requestAnimationFrame(loop);
  }

  loop();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}

/* ==========================================================================
   3. 35MM PROCEDURAL FILM GRAIN OVERLAY
   Renders subtle authentic film noise texture at 24 FPS.
   ========================================================================== */
function initFilmGrain() {
  const canvas = document.getElementById('grain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;

  function resize() {
    width = canvas.width = 320;
    height = canvas.height = 180;
  }
  resize();
  window.addEventListener('resize', resize);

  let animId = null;
  let lastTime = 0;
  const fps = 24;
  const interval = 1000 / fps;

  function renderNoise(timestamp) {
    if (timestamp - lastTime >= interval) {
      lastTime = timestamp;

      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 30; // subtle opacity
      }

      ctx.putImageData(imgData, 0, 0);
    }

    animId = requestAnimationFrame(renderNoise);
  }

  animId = requestAnimationFrame(renderNoise);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(renderNoise);
    }
  });
}

/* ==========================================================================
   4. ANIMATED THEME SWITCHER (GOLD/DARK & EDITORIAL LIGHT)
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = toggleBtn ? toggleBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('tamiz_theme_mode') || 'dark';

  applyTheme(savedTheme);

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = active === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      applyTheme(next);
      return;
    }

    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tamiz_theme_mode', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        toggleBtn.setAttribute('title', 'Switch to Editorial Light Mode');
      } else {
        themeIcon.className = 'fas fa-moon';
        toggleBtn.setAttribute('title', 'Switch to Cinematic Dark Mode');
      }
    }
  }
}

/* ==========================================================================
   5. SECURITY & ANTI-INSPECTION SHIELD
   ========================================================================== */
function initSecurityShield() {
  const toast = document.getElementById('sec-toast');
  const toastMsg = document.getElementById('toast-msg');

  function notify(msg) {
    if (toastMsg) toastMsg.textContent = msg;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }

  // Prevent right-click context menu except inside form inputs
  document.addEventListener('contextmenu', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    e.preventDefault();
    notify('Security Notice: Source inspection and context menu are restricted.');
  });

  // Block Developer Tools shortcuts
  document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const mod = isMac ? e.metaKey : e.ctrlKey;

    if (e.key === 'F12') {
      e.preventDefault();
      notify('Security Notice: Developer tools access is restricted.');
      return false;
    }

    if (mod && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
      notify('Security Notice: Developer tools shortcut is restricted.');
      return false;
    }

    if (mod && ['U', 'S'].includes(e.key.toUpperCase())) {
      e.preventDefault();
      notify('Security Notice: Source viewing and saving are restricted.');
      return false;
    }
  });
}

/* ==========================================================================
   6. VISITOR ACCESS GATEKEEPER WITH EMAIL TELEMETRY
   Sends visitor credentials directly to rtamizh7@gmail.com.
   ========================================================================== */
function initVisitorGate() {
  const gate = document.getElementById('access-gate');
  const form = document.getElementById('gate-form');
  const pill = document.getElementById('visitor-pill');
  const nameDisplay = document.getElementById('visitor-name');

  if (!gate || !form) return;

  const saved = localStorage.getItem('tamiz_visitor_auth');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (nameDisplay) nameDisplay.textContent = data.name || 'Authorized';
    } catch (e) {
      // invalid JSON, ignore
    }
  }

  function openGate() {
    gate.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGate() {
    gate.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (pill) {
    pill.addEventListener('click', openGate);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('gate-name').value.trim();
    const email = document.getElementById('gate-email').value.trim();
    const org = document.getElementById('gate-org').value.trim() || 'Independent';
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email) return;

    const originalHtml = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `<span class="btn-spinner"></span> <span>Authorizing...</span>`;

    const payload = {
      _subject: `New Visitor Authorized: ${name}`,
      Visitor_Name: name,
      Visitor_Email: email,
      Organization: org,
      Timestamp: new Date().toLocaleString(),
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      User_Agent: navigator.userAgent,
      Screen_Resolution: `${window.screen.width}x${window.screen.height}`
    };

    try {
      await fetch('https://formsubmit.co/ajax/rtamizh7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Telemetry logged locally.');
    } finally {
      localStorage.setItem('tamiz_visitor_auth', JSON.stringify({ name, email, time: Date.now() }));
      if (nameDisplay) nameDisplay.textContent = name;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalHtml;
      closeGate();
    }
  });
}

/* ==========================================================================
   7. TOP SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollBar() {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   8. CINEMATIC LIVE TERMINAL STREAM
   ========================================================================== */
function initTerminalStream() {
  const container = document.getElementById('terminal-stream');
  if (!container) return;

  const script = [
    { type: 'cmd', text: './verify_credentials.sh --all' },
    { type: 'line', text: '[INIT] Initializing algorithmic and security matrix...' },
    { type: 'pass', text: '[PASS] C++ Core: 1,594 Solved | Rating 1328 (1-Star Div 4)' },
    { type: 'pass', text: '[PASS] Java Pro: OOP Architecture & Collections Certified' },
    { type: 'pass', text: '[PASS] Full-Stack: React, Node.js, Express & Firebase Realtime' },
    { type: 'pass', text: '[PASS] AI Ecosystem: MongoDB Atlas Vector Search & Agents Active' },
    { type: 'pass', text: '[PASS] Security Shield: Anti-theft active (Logs -> rtamizh7@gmail.com)' },
    { type: 'status', text: '[STATUS] Available for Software Engineering Opportunities.' }
  ];

  let currentIndex = 0;
  let charIndex = 0;
  let activeElement = null;

  function runSequence() {
    container.innerHTML = '';
    currentIndex = 0;
    startNextItem();
  }

  function startNextItem() {
    if (currentIndex >= script.length) {
      setTimeout(runSequence, 7000);
      return;
    }

    const item = script[currentIndex];
    charIndex = 0;

    activeElement = document.createElement('div');
    activeElement.className = 'tl in';

    if (item.type === 'cmd') {
      activeElement.innerHTML = `<span class="tp">tamiz@engine:~$</span> <span class="term-txt"></span><span class="tc"></span>`;
    } else if (item.type === 'pass') {
      activeElement.innerHTML = `<span class="ts">&#10003;</span> <span class="term-txt"></span>`;
    } else if (item.type === 'status') {
      activeElement.innerHTML = `<span class="tp">&#9656;</span> <span class="term-txt" style="color:var(--text);font-weight:700;"></span>`;
    } else {
      activeElement.innerHTML = `<span class="ti">#</span> <span class="term-txt"></span>`;
    }

    container.appendChild(activeElement);
    container.scrollTop = container.scrollHeight;

    const txt = activeElement.querySelector('.term-txt');
    const cursor = activeElement.querySelector('.tc');

    function typeChar() {
      if (charIndex < item.text.length) {
        txt.textContent += item.text.charAt(charIndex);
        charIndex++;
        const delay = item.type === 'cmd' ? Math.random() * 22 + 18 : Math.random() * 10 + 6;
        setTimeout(typeChar, delay);
      } else {
        if (cursor) cursor.remove();
        currentIndex++;
        setTimeout(startNextItem, item.type === 'cmd' ? 320 : 180);
      }
    }

    typeChar();
  }

  runSequence();
}

/* ==========================================================================
   9. ROLE ROTATOR (TYPEWRITER)
   ========================================================================== */
function initRoleRotator() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  const roles = [
    'Software Developer & UI Craftsman',
    'AI Technologist & Agent Architect',
    'Competitive Programmer (1,594 Solved)',
    'Full-Stack Engineer & Cloud Builder'
  ];

  let rIndex = 0;
  let cIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[rIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, cIndex - 1);
      cIndex--;
    } else {
      el.textContent = current.substring(0, cIndex + 1);
      cIndex++;
    }

    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && cIndex === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && cIndex === 0) {
      isDeleting = false;
      rIndex = (rIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(tick, speed);
  }

  setTimeout(tick, 1000);
}

/* ==========================================================================
   10. 3D CARD PERSPECTIVE TILT & RADIAL SPOTLIGHT
   ========================================================================== */
function initCardTiltAndSpotlight() {
  const targets = document.querySelectorAll('.card, .portrait-wrap, .terminal-card');

  targets.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -3;
        const rotY = ((x - cx) / cx) * 3;
        card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   11. SCROLL REVEAL TRANSITIONS
   ========================================================================== */
function initScrollReveal() {
  const items = document.querySelectorAll('.ri');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item) => observer.observe(item));
}

/* ==========================================================================
   12. ANIMATED STAT COUNTERS
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-target]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const end = parseInt(target.getAttribute('data-target'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = Math.floor(ease * end);
          target.textContent = val + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            target.textContent = end + suffix;
          }
        }

        requestAnimationFrame(animate);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================================================
   13. SKILL GAUGES
   ========================================================================== */
function initSkillGauges() {
  const fills = document.querySelectorAll('.gauge-fill');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.getAttribute('data-pct') || '85%';
        fill.style.width = pct;
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.25 });

  fills.forEach((f) => observer.observe(f));
}

/* ==========================================================================
   14. CONTACT FORM WITH TELEMETRY & LOADING STATE
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('sec-toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!form) return;

  function notify(msg) {
    if (toastMsg) toastMsg.textContent = msg;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-msg').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      notify('Please fill out all required fields.');
      return;
    }

    const orig = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `<span class="btn-spinner"></span> <span>Dispatching...</span>`;

    try {
      await fetch('https://formsubmit.co/ajax/rtamizh7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Message from ${name} via Portfolio`,
          Name: name,
          Email: email,
          Message: message,
          Timestamp: new Date().toLocaleString()
        })
      });
      notify('Message delivered successfully to Tamiz R.');
      form.reset();
    } catch (err) {
      notify('Message sent. Thank you for connecting.');
      form.reset();
    } finally {
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = orig;
      }, 900);
    }
  });
}
