// FEARLESS v2: language, the visor intro and scroll scene, aperture reveals, open badge, WhatsApp form, hours.
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const html = document.documentElement, body = document.body;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lang = html.lang === 'ar' ? 'ar' : 'en';
  let T = TEXT[lang];

  function applyLang() {
    T = TEXT[lang];
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('fearless-lang', lang); } catch (e) {}
    $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (v !== undefined) el.textContent = v; });
    document.title = lang === 'ar' ? 'فيرلس جيم | نادي رياضي ومدرسة فنون قتالية في خلدا، عمّان' : 'Fearless Gym | Gym and martial arts school in Khalda, Amman';
    $('#map').title = T.map_title;

    $$('.call-link').forEach((a) => { a.href = 'tel:' + BUSINESS.phone; });
    const wa = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(T.wa_msg)}`;
    $$('.wa-link').forEach((a) => { a.href = wa; });
    $('#directions').href = BUSINESS.google;
    if ($('#map').src !== BUSINESS.mapEmbed) $('#map').src = BUSINESS.mapEmbed;
    $('#contact-lines').innerHTML = `<a href="tel:${esc(BUSINESS.phone)}" dir="ltr">${esc(BUSINESS.phoneDisplay)}</a>` +
      ` · <a href="https://wa.me/${esc(BUSINESS.whatsapp)}" target="_blank" rel="noopener">${esc(T.cta_wa)}</a>`;

    $('#rules').innerHTML = T.rules.map((r) => `<li>${esc(r)}</li>`).join('');
    const links = [];
    if (BUSINESS.facebook) links.push(`<a href="${esc(BUSINESS.facebook)}" target="_blank" rel="noopener">${esc(T.foot_fb)}</a>`);
    if (BUSINESS.instagram) links.push(`<a href="${esc(BUSINESS.instagram)}" target="_blank" rel="noopener">${esc(T.foot_ig)}</a>`);
    $('#foot-links').innerHTML = links.join(' · ');
    chips('#goal-chips', 'goal', T.goals);
    chips('#when-chips', 'when', T.whens);
    hoursTable();
    openBadge();
  }

  function chips(sel, name, opts) {
    const box = $(sel);
    const current = (box.querySelector('input:checked') || {}).value;
    box.innerHTML = opts.map((o, i) => `<label class="chip"><input type="radio" name="${name}" value="${i}" ${(current === String(i) || (current === undefined && i === 0)) ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('');
  }

  // Time in Amman, whatever the visitor's own time zone.
  function ammanNow() {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: BUSINESS.timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const g = (t) => (p.find((x) => x.type === t) || {}).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
    return { day, mins: (parseInt(g('hour'), 10) % 24) * 60 + parseInt(g('minute'), 10) };
  }
  const toMins = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const fmt = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return lang === 'ar' ? `${h}:${String(m).padStart(2, '0')}` : `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
  };
  function hoursTable() {
    const { day } = ammanNow();
    $('#hours').innerHTML = BUSINESS.hours.map(([o, c], i) =>
      `<tr${i === day ? ' class="today"' : ''}><th>${esc(T.days[i])}${i === day ? ` <small>${esc(T.today)}</small>` : ''}</th><td dir="ltr">${esc(fmt(o))} – ${esc(fmt(c))}</td></tr>`).join('');
  }
  function openBadge() {
    const b = $('#open-badge');
    const { day, mins } = ammanNow();
    if (day < 0) { b.hidden = true; return; }
    const [o, c] = BUSINESS.hours[day];
    const open = mins >= toMins(o) && mins < toMins(c);
    b.textContent = open ? `${T.open_now} · ${T.closes} ${fmt(c)}` : `${T.closed_now} · ${T.opens} ${fmt(BUSINESS.hours[(day + (mins >= toMins(c) ? 1 : 0)) % 7][0])}`;
    b.classList.toggle('is-open', open);
    b.hidden = false;
  }

  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); });
  $('#year').textContent = new Date().getFullYear();

  // Trial form: no server. It builds a WhatsApp message and opens the chat.
  $('#trial-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const name = (f.name.value || '').trim() || '-';
    const goal = T.goals[+(f.goal.value || 0)];
    const when = T.whens[+(f.when.value || 0)];
    const msg = T.wa_tpl.replace('{name}', name).replace('{goal}', goal).replace('{when}', when);
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  // ---------- The intro: you are inside the helmet ----------
  // Stage 0: dark, the two slit edges breathe (anticipation).  Stage 1: the slit opens and the gym appears.
  // Stage 2: stillness, the picture drifts.  Stage 3: FEAR and LESS take their places around the slit.
  // Stage 4: place, line, buttons and header arrive. About 4.6 s on a first visit; 2 s with reduced motion.
  // The hero is the intro's last frame, so there is no hand-off: the page simply continues.
  const STAGES = calm ? [0, 300, 700, 1100, 1700] : [0, 900, 1900, 3000, 3900];
  const timers = [];
  function setStage(n) { body.className = body.className.replace(/\bstage-\d\b/g, '').trim() + ' stage-' + n; }
  function finishIntro() {
    timers.forEach(clearTimeout);
    setStage(4);
    body.classList.remove('intro-lock');
    try { sessionStorage.setItem('fearless-intro', '1'); } catch (e) {}
  }
  function playIntro() {
    body.classList.add('intro-lock');
    window.scrollTo(0, 0);
    STAGES.forEach((t, i) => timers.push(setTimeout(() => { setStage(i); if (i === 4) finishIntro(); }, t)));
    // Safety: nothing may block the site. If the timeline never completes, open anyway.
    timers.push(setTimeout(finishIntro, STAGES[4] + 1500));
  }
  if (html.classList.contains('intro-seen')) { setStage(4); }
  else { playIntro(); }
  $('#skip').addEventListener('click', finishIntro);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !body.classList.contains('stage-4')) finishIntro(); });
  $('#replay').addEventListener('click', () => {
    try { sessionStorage.removeItem('fearless-intro'); } catch (e) {}
    html.classList.remove('intro-seen'); html.classList.add('intro-fresh');
    window.scrollTo({ top: 0, behavior: 'auto' });
    setStage(0); playIntro();
  });

  // ---------- Scroll: lift the visor, fill PLAY HARD, show the call bar ----------
  const scene = $('#hero'), visor = $('.visor'), wall = $('#wall');
  const clamp = (v) => Math.max(0, Math.min(1, v));
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY, vh = window.innerHeight;
      const range = scene.offsetHeight - vh;
      const open = clamp(y / range);
      visor.style.setProperty('--open', open.toFixed(4));
      body.classList.toggle('past-hero', y > range);
      body.classList.toggle('visor-open', open > 0.3);
      body.classList.toggle('scrolled', y > 40);
      const r = wall.getBoundingClientRect();
      const fill = clamp((vh * 0.85 - r.top) / (vh * 0.6));
      wall.style.setProperty('--fill', (fill * 100).toFixed(1) + '%');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Aperture reveals: sections open from a line when they come into view.
  if ('IntersectionObserver' in window && !calm) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    $$('.ap').forEach((el) => io.observe(el));
  } else { $$('.ap').forEach((el) => el.classList.add('in')); }

  // Photo bands open on tap (phones have no hover).
  $$('.band').forEach((b) => {
    b.addEventListener('click', () => { $$('.band').forEach((o) => { if (o !== b) o.classList.remove('is-open'); }); b.classList.toggle('is-open'); });
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); } });
  });

  applyLang();
  setInterval(openBadge, 60000);
})();
