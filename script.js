document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');
  document.addEventListener('click', event => {
    const target = event.target.closest('a,button,[role="button"]');
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    target.classList.remove('click-feedback');
    void target.offsetWidth;
    target.classList.add('click-feedback');
    target.addEventListener('animationend', () => target.classList.remove('click-feedback'), {once:true});
  });
  const canvas = document.getElementById('game-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    const stars = Array.from({length: 95}, () => ({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.3,s:Math.random()*.0007+.0002}));
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); };
    resize(); addEventListener('resize', resize);
    const draw = () => { ctx.clearRect(0,0,innerWidth,innerHeight); for (const star of stars) { star.y += star.s * (1 + scrollY / 800); if (star.y > 1) star.y = 0; ctx.fillStyle = `rgba(0,245,160,${.2 + star.r / 2})`; ctx.beginPath(); ctx.arc(star.x * innerWidth, star.y * innerHeight, star.r, 0, Math.PI*2); ctx.fill(); } requestAnimationFrame(draw); };
    draw();
  }
  const sections = [...document.querySelectorAll('.stage-section')];
  const links = [...document.querySelectorAll('.hud-stage-nav a')];
  const fill = document.getElementById('xp-fill'); const value = document.getElementById('xp-value');
  const rover = document.querySelector('.roadmap-rover'); const spine = document.querySelector('.roadmap-backbone');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
    const start = [0, 245, 160];
    const end = [255, 54, 87];
    const mix = Math.round(progress * 100) / 100;
    const color = `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * mix)).join(',')})`;
    if (fill) fill.style.width = `${progress*100}%`;
    if (fill) fill.style.setProperty('--progress-color', color);
    if (rover) rover.style.setProperty('--progress-color', color);
    if (value) value.textContent = `${Math.floor(progress*2000)} / 2000 XP`;
    if (rover && spine) {
      if (progress >= 0.999) {
        rover.classList.add('return-to-top');
      } else {
        rover.classList.remove('return-to-top');
        rover.style.top = `${spine.offsetTop + spine.offsetHeight*progress}px`;
      }
      const bounds = rover.getBoundingClientRect();
      const underMarker = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
      rover.classList.toggle('is-over-content', Boolean(underMarker && underMarker.closest('.stage-panel')));
    }
  };
  let progressFrame = 0;
  const scheduleProgressUpdate = () => {
    if (progressFrame) return;
    progressFrame = requestAnimationFrame(() => {
      progressFrame = 0;
      update();
    });
  };
  addEventListener('scroll', scheduleProgressUpdate, {passive:true});
  addEventListener('resize', scheduleProgressUpdate, {passive:true});
  update();
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.game-card').forEach((card, index) => card.style.setProperty('--card-delay', `${Math.min(index * 90, 360)}ms`));
        revealObserver.unobserve(entry.target);
      }
    }), {rootMargin:'0px 0px -12% 0px', threshold:0.08});
    const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), {rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(section => { revealObserver.observe(section); activeObserver.observe(section); });
  } else {
    sections.forEach(section => section.classList.add('is-visible'));
  }

  const typed = document.getElementById('typed-text');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typed && !reduceMotion) {
    const lines = ['Building resilient digital systems.', 'Exploring autonomous AI workflows.', 'Solving problems with curiosity.'];
    let line = 0;
    const typeLine = () => {
      const phrase = lines[line % lines.length];
      let position = 0;
      const write = () => {
        typed.textContent = phrase.slice(0, position++);
        if (position <= phrase.length) setTimeout(write, 48);
        else setTimeout(erase, 1900);
      };
      const erase = () => {
        typed.textContent = phrase.slice(0, position--);
        if (position >= 0) setTimeout(erase, 24);
        else { line++; setTimeout(typeLine, 250); }
      };
      write();
    };
    typeLine();
  }
});
