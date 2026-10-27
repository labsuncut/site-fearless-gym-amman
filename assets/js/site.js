// FEARLESS v6: language, the forge intro and the visor scroll scene, aperture reveals, the coach's video,
// the day-by-day timetable, open badge, WhatsApp form, hours. Scroll-driven values are written straight to the
// elements (clip-path, transform, opacity): nothing changes its size, and no CSS variable is updated per frame.
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const html = document.documentElement, body = document.body;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);

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
    $('#day-tabs').setAttribute('aria-label', T.day_tabs);
    $('#coach-video').setAttribute('aria-label', T.coach_video_label);

    $$('.call-link').forEach((a) => { a.href = 'tel:' + BUSINESS.phone; });
    const wa = (msg) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
    $$('.wa-link').forEach((a) => { a.href = wa(T.wa_msg); });
    $('#coach-wa').href = wa(T.coach_wa);
    $('#coach-ig').href = BUSINESS.coachInstagram;
    $('#directions').href = BUSINESS.google;
    if ($('#map').src !== BUSINESS.mapEmbed) $('#map').src = BUSINESS.mapEmbed;
    $('#contact-lines').innerHTML = `<a href="tel:${esc(BUSINESS.phone)}" dir="ltr">${esc(BUSINESS.phoneDisplay)}</a>` +
      ` · <a href="https://wa.me/${esc(BUSINESS.whatsapp)}" target="_blank" rel="noopener">${esc(T.cta_wa)}</a>`;

    $('#rules').innerHTML = T.rules.map((r) => `<li>${esc(r)}</li>`).join('');
    const links = [];
    if (BUSINESS.instagram) links.push(`<a href="${esc(BUSINESS.instagram)}" target="_blank" rel="noopener">${esc(T.foot_ig)}</a>`);
    if (BUSINESS.facebook) links.push(`<a href="${esc(BUSINESS.facebook)}" target="_blank" rel="noopener">${esc(T.foot_fb)}</a>`);
    $('#foot-links').innerHTML = links.join(' · ');
    chips('#goal-chips', 'goal', T.goals);
    chips('#when-chips', 'when', T.whens);
    buildTabs();
    renderDay();
    hoursTable();
    openBadge();
    measure();
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

  // ---------- The timetable: one day at a time, Saturday first (the gym's own order), today preselected ----------
  const ORDER = [6, 0, 1, 2, 3, 4, 5];
  const tabsBox = $('#day-tabs'), dayList = $('#day-list');
  let today = ammanNow().day;
  let day = today < 0 ? 6 : today;
  function buildTabs() {
    tabsBox.innerHTML = ORDER.map((d) => `<button class="day-tab" role="tab" type="button" id="day-tab-${d}" data-day="${d}" aria-selected="${d === day}" tabindex="${d === day ? 0 : -1}">${esc(T.day_short[d])}${d === today ? `<small>${esc(T.today)}</small>` : ''}</button>`).join('') + '<span class="tab-ink" aria-hidden="true"></span>';
  }
  function renderDay() {
    const items = SCHEDULE.filter((c) => c[0] === day).sort((a, b) => toMins(a[1]) - toMins(b[1]) || a[3].localeCompare(b[3]));
    dayList.innerHTML = items.length
      ? `<ul>${items.map((c, i) => `<li style="animation-delay:${i * 40}ms"><time>${esc(fmt(c[1]))}</time><span class="cls">${esc(T.cls[c[2]] || c[2])}</span><span class="team">${esc(T.teams[c[3]] || c[3])}</span></li>`).join('')}</ul>`
      : `<p class="day-empty">${esc(T.no_classes)}</p>`;
    dayList.setAttribute('aria-labelledby', 'day-tab-' + day);
    $$('.day-tab', tabsBox).forEach((b) => { const on = +b.dataset.day === day; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    inkTab();
  }
  function inkTab() {
    const t = tabsBox.querySelector('.day-tab[aria-selected="true"]'), ink = tabsBox.querySelector('.tab-ink');
    if (t && ink) ink.style.transform = `translateX(${t.offsetLeft}px) scaleX(${t.offsetWidth})`;
    // On a narrow phone the tabs scroll sideways: keep the selected day in view.
    if (t && tabsBox.scrollWidth > tabsBox.clientWidth) { const l = t.offsetLeft, r = l + t.offsetWidth, sl = tabsBox.scrollLeft, cw = tabsBox.clientWidth; if (l < sl || r > sl + cw) tabsBox.scrollLeft = l - (cw - t.offsetWidth) / 2; }
  }
  function showDay(d, focus) {
    if (d === day) return;
    day = d; renderDay();
    if (focus) { const t = tabsBox.querySelector(`[data-day="${d}"]`); if (t) t.focus(); }
  }
  tabsBox.addEventListener('click', (e) => { const t = e.target.closest('.day-tab'); if (t) showDay(+t.dataset.day); });
  tabsBox.addEventListener('keydown', (e) => {
    const i = ORDER.indexOf(day); let n = -1;
    if (e.key === 'ArrowRight') n = (i + (html.dir === 'rtl' ? -1 : 1) + 7) % 7;
    if (e.key === 'ArrowLeft') n = (i + (html.dir === 'rtl' ? 1 : -1) + 7) % 7;
    if (e.key === 'Home') n = 0; if (e.key === 'End') n = 6;
    if (n >= 0) { e.preventDefault(); showDay(ORDER[n], true); }
  });
  window.fearless = { showDay };  // used by tools/prerender.cjs

  function hoursTable() {
    const { day: d } = ammanNow();
    $('#hours').innerHTML = BUSINESS.hours.map(([o, c], i) =>
      `<tr${i === d ? ' class="today"' : ''}><th>${esc(T.days[i])}${i === d ? ` <small>${esc(T.today)}</small>` : ''}</th><td dir="ltr">${esc(fmt(o))} – ${esc(fmt(c))}</td></tr>`).join('');
  }
  function openBadge() {
    const b = $('#open-badge');
    const { day: d, mins } = ammanNow();
    if (d < 0) { b.hidden = true; return; }
    const [o, c] = BUSINESS.hours[d];
    const open = mins >= toMins(o) && mins < toMins(c);
    b.textContent = open ? `${T.open_now} · ${T.closes} ${fmt(c)}` : `${T.closed_now} · ${T.opens} ${fmt(BUSINESS.hours[(d + (mins >= toMins(c) ? 1 : 0)) % 7][0])}`;
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

  // ---------- The coach's video: loads only when the chapter is near, plays only while on screen ----------
  const video = $('#coach-video');
  if (!calm && !saveData && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { if (!video.getAttribute('src')) { video.src = video.dataset.src; video.load(); } video.play().catch(() => {}); }
      else video.pause();
    }), { rootMargin: '240px 0px' });
    vio.observe(video);
  }

  // ---------- The forge: sparks on a canvas, drawing the helmet's outline (first visit, motion allowed) ----------
  const forge = (() => {
    const canvas = $('#forge'), line = $('#hm-line'), glow = $('#hm-glow'), helmet = $('#intro-helmet');
    const svg = line.ownerSVGElement;
    const L = line.getTotalLength();
    if (!calm) { [line, glow].forEach((p) => { p.style.strokeDasharray = L; p.style.strokeDashoffset = L; }); }
    const ctx = canvas.getContext('2d');
    const DRAW_MS = 1300;
    let W = 0, H = 0, parts = [], raf = 0, mode = 'off', drawStart = 0, last = 0, blowStart = 0, cx = 0, cy = 0;
    const ease = (t) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function toScreen(p) { const r = svg.getBoundingClientRect(); return { x: r.left + p.x / 100 * r.width, y: r.top + p.y / 120 * r.height }; }
    function spark(x, y, speed, spread, life, size) {
      const a = -Math.PI / 2 + (Math.random() - .5) * spread;
      const v = speed * (.4 + Math.random() * .8);
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life, t: 0, s: size * (.6 + Math.random() * .8), hot: Math.random() });
    }
    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000 || .016); last = now;
      // Fade the previous frame a little: the sparks leave short trails.
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      if (mode === 'embers') { for (let i = 0; i < 2; i++) spark(Math.random() * W, H + 4, 50, .6, 1.6 + Math.random(), 1.6); }
      if (mode === 'draw') {
        const p = ease(clamp((now - drawStart) / DRAW_MS));
        const off = L * (1 - p);
        line.style.strokeDashoffset = off; glow.style.strokeDashoffset = off;
        const pt = toScreen(line.getPointAtLength(p * L));
        for (let i = 0; i < 7; i++) spark(pt.x, pt.y, 220, 2.4, .35 + Math.random() * .45, 1.8);
        // The weld point itself.
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 16);
        g.addColorStop(0, 'rgba(255,240,200,.95)'); g.addColorStop(.35, 'rgba(255,179,71,.55)'); g.addColorStop(1, 'rgba(228,32,43,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2); ctx.fill();
        if (p >= 1) mode = 'cool';
      }
      if (mode === 'blow') {
        const k = (now - blowStart) / 900;
        if (k < .25) for (let i = 0; i < 14; i++) { const pt = toScreen(line.getPointAtLength(Math.random() * L)); const a = Math.atan2(pt.y - cy, pt.x - cx); const v = 300 + Math.random() * 500; parts.push({ x: pt.x, y: pt.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: .5 + Math.random() * .4, t: 0, s: 2.2, hot: Math.random() }); }
        if (k >= 1 && parts.length === 0) { stop(); return; }
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i];
        q.t += dt; if (q.t >= q.life) { parts.splice(i, 1); continue; }
        if (mode === 'blow') { q.vx += (q.x - cx) * dt * 6; q.vy += (q.y - cy) * dt * 6; } else { q.vy += 260 * dt; q.vx *= (1 - .9 * dt); }
        q.x += q.vx * dt; q.y += q.vy * dt;
        const a = 1 - q.t / q.life;
        ctx.fillStyle = q.hot > .6 ? `rgba(255,220,160,${a})` : `rgba(255,${Math.round(90 + 90 * a)},60,${a * .9})`;
        ctx.beginPath(); ctx.arc(q.x, q.y, q.s * (.5 + a * .5), 0, Math.PI * 2); ctx.fill();
      }
      if (parts.length > 900) parts.splice(0, parts.length - 900);
      raf = requestAnimationFrame(frame);
    }
    function start() { if (calm) return; size(); parts = []; last = performance.now(); mode = 'embers'; cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    function stop() { cancelAnimationFrame(raf); raf = 0; mode = 'off'; parts = []; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); }
    function stage(n) {
      if (n === 1) { helmet.classList.add('drawn'); if (!calm) { drawStart = performance.now(); mode = 'draw'; } }
      if (n === 2 && !calm) { line.style.strokeDashoffset = 0; glow.style.strokeDashoffset = 0; mode = 'cool'; }
      if (n === 3 && !calm && raf) { const r = svg.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; blowStart = performance.now(); mode = 'blow'; }
      if (n >= 4) stop();
    }
    function reset() { stop(); helmet.classList.remove('drawn'); if (!calm) { line.style.strokeDashoffset = L; glow.style.strokeDashoffset = L; } }
    return { start, stop, stage, reset };
  })();

  // ---------- The intro ----------
  // Stage 0: dark, an ember at the top of the helmet.  Stage 1: sparks draw the outline.  Stage 2: the metal cools and fills, the eyes ignite.
  // Stage 3: you put it on; the helmet rushes past, the slit opens on the gym.  Stage 4: FEAR and LESS stamp in.  Stage 5: everything else.
  // About 5.3 s on a first visit; 2.5 s with reduced motion (cross-fades only). The hero is the intro's last frame.
  const STAGES = calm ? [0, 300, 900, 1500, 2000, 2500] : [0, 350, 1800, 2900, 3800, 4600];
  const timers = [];
  const visor = $('.visor');
  let live = false;
  function setStage(n) { body.className = body.className.replace(/\bstage-\d\b/g, '').trim() + ' stage-' + n; forge.stage(n); }
  function goLive() { live = true; visor.classList.add('live'); measure(); paint(); }
  function finishIntro() {
    timers.forEach(clearTimeout); timers.length = 0;
    setStage(5);
    body.classList.remove('intro-lock');
    try { sessionStorage.setItem('fearless-intro', '1'); } catch (e) {}
    timers.push(setTimeout(goLive, 700));
  }
  function playIntro() {
    body.classList.add('intro-lock');
    window.scrollTo(0, 0);
    forge.start();
    STAGES.forEach((t, i) => timers.push(setTimeout(() => { setStage(i); if (i === 5) finishIntro(); }, t)));
    // Safety: nothing may block the site. If the timeline never completes, open anyway.
    timers.push(setTimeout(() => { if (!live) finishIntro(); }, STAGES[5] + 1500));
  }
  $('#skip').addEventListener('click', finishIntro);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !body.classList.contains('stage-5')) finishIntro(); });
  $('#replay').addEventListener('click', () => {
    try { sessionStorage.removeItem('fearless-intro'); } catch (e) {}
    html.classList.remove('intro-seen'); html.classList.add('intro-fresh');
    live = false; visor.classList.remove('live');
    [aperture, edgeT, edgeB, wmF, wmL, apHelmet, meta, place, hint].forEach((el) => el.removeAttribute('style'));
    forge.reset();
    window.scrollTo({ top: 0, behavior: 'auto' });
    setStage(0); playIntro();
  });

  // ---------- Scroll: lift the visor, fill PLAY HARD, show the call bar ----------
  const scene = $('#hero'), aperture = $('#aperture'), edgeT = $('.aperture-edge-t'), edgeB = $('.aperture-edge-b');
  const wmF = $('.wm-fear'), wmL = $('.wm-less'), apHelmet = $('.aperture-helmet'), meta = $('.hero-meta'), place = $('.hero-place'), hint = $('.hero-hint');
  const wall = $('#wall'), wallFill = $('#wall-fill');
  const probe = document.createElement('span'); probe.className = 'ap-probe'; visor.appendChild(probe);
  let apH = 0, range = 1, wallTop = 0, vh = 0, ticking = false;
  // Measured once per layout change, never per frame.
  function measure() {
    vh = window.innerHeight;
    apH = probe.offsetHeight;
    range = Math.max(1, scene.offsetHeight - vh);
    wallTop = wall.getBoundingClientRect().top + window.scrollY;
  }
  function paint() {
    ticking = false;
    const y = window.scrollY;
    const open = clamp(y / range);
    body.classList.toggle('past-hero', y > range);
    body.classList.toggle('visor-open', open > 0.3);
    body.classList.toggle('scrolled', y > 40);
    if (live) {
      const h = apH + (vh - apH) * open, top = Math.max(0, (vh - h) / 2);
      aperture.style.clipPath = `inset(${top.toFixed(2)}px 0 ${top.toFixed(2)}px 0)`;
      edgeT.style.transform = `translateY(${(-h / 2).toFixed(2)}px)`;
      edgeB.style.transform = `translateY(${(h / 2).toFixed(2)}px)`;
      edgeT.style.opacity = edgeB.style.opacity = Math.max(0, .9 - open).toFixed(3);
      const shift = open * vh * 0.4, wo = clamp(1 - open * 2.5).toFixed(3);
      wmF.style.transform = `translateY(${(-shift).toFixed(1)}px)`; wmF.style.opacity = wo;
      wmL.style.transform = `translateY(${shift.toFixed(1)}px)`; wmL.style.opacity = wo;
      apHelmet.style.opacity = clamp(1 - open * 2).toFixed(3);
      meta.style.opacity = place.style.opacity = hint.style.opacity = clamp(1 - open * 4).toFixed(3);
    }
    const fill = clamp((vh * 0.85 - (wallTop - y)) / (vh * 0.6));
    wallFill.style.clipPath = `inset(0 ${((1 - fill) * 100).toFixed(1)}% 0 0)`;
  }
  function onScroll() { if (ticking) return; ticking = true; requestAnimationFrame(paint); }
  function onResize() { measure(); inkTab(); onScroll(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(document.body);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);

  // Aperture reveals: sections open from a line when they come into view.
  if ('IntersectionObserver' in window && !calm) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    $$('.ap').forEach((el) => io.observe(el));
  } else { $$('.ap').forEach((el) => el.classList.add('in')); }

  applyLang();
  onScroll();
  // The intro starts last: everything it writes to (the scroll engine's elements and measurements) exists by now.
  if (html.classList.contains('intro-seen')) { setStage(5); goLive(); }
  else { playIntro(); }
  setInterval(() => { openBadge(); const t = ammanNow().day; if (t !== today) { today = t; buildTabs(); renderDay(); } }, 60000);
})();
