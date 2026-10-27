// FEARLESS v7: language, the forge intro, the stamp (FEARLESS painted on a canvas with the gym's reel inside the
// letters), the zoom-through on scroll, the two-warriors split, lazy reels, the day-by-day timetable, open badge,
// WhatsApp form, hours. Scroll- and pointer-driven values are written straight to the elements (clip-path,
// transform, opacity): nothing changes its size, and no CSS variable is updated per frame.
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
    $('#hero-video').setAttribute('aria-label', T.hero_video_label);

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
    if (window.brand) brand.refit();
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

  // ---------- Reels: each loads only when its chapter is near and plays only while on screen. Never with Reduce Motion or Data Saver. ----------
  const reels = !calm && !saveData;
  if (reels && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); } v.play().catch(() => {}); }
      else v.pause();
    }), { rootMargin: '240px 0px' });
    $$('video[data-src]:not(#hero-video)').forEach((v) => vio.observe(v));
  }
  // The hero's reel starts loading at once: it has to be moving by the time the word stamps in.
  const heroVideo = $('#hero-video');
  if (reels) { heroVideo.src = heroVideo.dataset.src; heroVideo.load(); heroVideo.play().catch(() => {}); }

  // ---------- The stamp: FEARLESS on a canvas, the reel showing through the letters ----------
  // Each frame: fill the word in blood red, lay the reel over it in 'luminosity' (the reel's light and shade, the
  // word's red), then cut everything outside the letters away with a text mask (destination-in).
  // The reel drifts a little toward the pointer (or the phone's tilt). With Reduce Motion the poster is drawn once.
  const brand = (() => {
    const canvas = $('#brand'), ctx = canvas.getContext('2d');
    const mask = document.createElement('canvas'), mctx = mask.getContext('2d');
    const poster = new Image(); poster.src = canvas.dataset.poster;
    let W = 0, H = 0, dpr = 1, font = '', word = '', px = 0, py = 0, tx = 0, ty = 0, raf = 0, on = false;
    // Where the camera flies through (a hole inside a letter, found on the mask) and how far it must zoom
    // for that hole to cover the screen. box = the word's top and bottom, for the stamp's sparks.
    const hole = { x: .5, y: .5, zoom: 18 }, box = { top: 0, bottom: 0 };
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = mask.width = Math.round(W * dpr); canvas.height = mask.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fit();
      if (on) draw();  // resizing clears the canvas
    }
    function fit() {
      word = T.hero_brand;
      const ar = lang === 'ar', fam = ar ? "'Changa', 'IBM Plex Sans Arabic', sans-serif" : "'Anton', Impact, sans-serif", weight = ar ? 800 : 400;
      // Portrait screens stack the word (FEAR / LESS, like the gym's logo) so it can be several times bigger.
      const lines = W / H < .8 ? T.hero_brand_lines.split('|') : [word];
      ctx.font = `${weight} 100px ${fam}`;
      const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) || 1;
      const lh = ar ? 1.15 : .92, n = lines.length;
      const fs = Math.min(100 * (W * (W < 761 ? .92 : .9)) / w, (H * (n > 1 ? .56 : (ar ? .6 : .72))) / (n * lh));
      font = `${weight} ${fs.toFixed(1)}px ${fam}`;
      mctx.clearRect(0, 0, W, H); mctx.font = font; mctx.textAlign = 'center'; mctx.textBaseline = 'middle'; mctx.fillStyle = '#fff';
      const cy = n > 1 ? H * .45 : H / 2 + H * (ar ? -.02 : .015);
      lines.forEach((l, i) => mctx.fillText(l, W / 2, cy + (i - (n - 1) / 2) * fs * lh));
      box.top = cy - n * fs * lh / 2; box.bottom = cy + n * fs * lh / 2;
      // Fly through the inside of the A when there is one (the English word): its column is where the A is drawn.
      let aim = null;
      lines.forEach((l, i) => { const j = l.indexOf('A'); if (j < 0 || aim) return;
        const left = W / 2 - mctx.measureText(l).width / 2 + mctx.measureText(l.slice(0, j)).width;
        aim = { x: left + mctx.measureText('A').width / 2, y: cy + (i - (n - 1) / 2) * fs * lh, h: fs * lh }; });
      findHole(fs, aim);
    }
    // Scan the mask for the hole to fly through: an empty run fully enclosed by a letter. With an A, the topmost
    // hole in its column (the triangle above the crossbar); otherwise (Arabic) the hole nearest the middle of the
    // screen, or the middle itself if there is none.
    function findHole(fs, aim) {
      hole.x = .5; hole.y = .5; hole.zoom = 18;
      let data;
      try { data = mctx.getImageData(0, 0, mask.width, mask.height).data; } catch (e) { return; }
      const mw = mask.width, mh = mask.height, k = dpr, at = (x, y) => data[(y * mw + x) * 4 + 3] > 127;
      // Scan only the A's own line, so the gap under its legs (closed off by the line below) does not count.
      const top = aim ? aim.y - aim.h / 2 : box.top, bottom = aim ? aim.y + aim.h / 2 : box.bottom;
      const y0 = Math.max(0, Math.floor(top * k)), y1 = Math.min(mh - 1, Math.ceil(bottom * k));
      // A real hole is closed left and right too, within one letter's width (not the gap between two lines).
      const reach = fs * k * .5;
      const closedSides = (x, y) => { let l = x, r = x; while (l > 0 && x - l < reach && !at(l - 1, y)) l--; while (r < mw - 1 && r - x < reach && !at(r + 1, y)) r++; return l > 0 && x - l < reach && r < mw - 1 && r - x < reach; };
      let best = null;
      const xs = aim ? [Math.round(aim.x * k)] : Array.from({ length: Math.ceil(mw / 2) }, (_, i) => i * 2);
      for (const x of xs) {
        let inside = false, start = -1;
        for (let y = y0; y <= y1; y++) {
          const o = at(x, y);
          if (o) { if (start >= 0 && inside) { const len = y - start; if (len > fs * k * .06 && closedSides(x, Math.round((start + y) / 2))) { const c = { x, y: (start + y) / 2, len }; const d = aim ? c.y : Math.hypot(c.x - mw / 2, c.y - mh / 2); if (!best || d < best.d) best = { ...c, d }; } } inside = true; start = -1; }
          else if (inside && start < 0) start = y;
        }
      }
      if (!best) return;
      // Width of the hole at its middle: walk left and right until the letter.
      const yy = Math.round(best.y); let l = best.x, r = best.x;
      while (l > 0 && !at(l - 1, yy)) l--; while (r < mw - 1 && !at(r + 1, yy)) r++;
      const cx = (l + r + 1) / 2, hw = Math.max(2, r - l + 1) / k, hh = best.len / k;
      hole.x = cx / k / W; hole.y = best.y / k / H;
      // Zoom until the hole is wider and taller than the screen.
      hole.zoom = Math.min(160, Math.max(18, 1.25 * Math.max(W / hw, H / hh)));
    }
    function draw() {
      tx += (px - tx) * .06; ty += (py - ty) * .06;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#b3121b'; ctx.fillRect(0, 0, W, H);
      const v = heroVideo, src = (v.readyState >= 2 && !v.paused && !v.ended) ? v : (poster.complete && poster.naturalWidth ? poster : null);
      if (src) {
        const sw = src.videoWidth || src.naturalWidth, sh = src.videoHeight || src.naturalHeight;
        const k = Math.max(W / sw, H / sh) * 1.1, dw = sw * k, dh = sh * k;
        ctx.globalCompositeOperation = 'luminosity';
        ctx.globalAlpha = .85;
        ctx.drawImage(src, (W - dw) / 2 - tx * W * .03, (H - dh) / 2 - ty * H * .03, dw, dh);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(150, 12, 20, .34)'; ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = 'destination-in';
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(mask, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
    }
    function frame() { raf = 0; if (!on) return; draw(); raf = requestAnimationFrame(frame); }
    function run(want) {
      if (calm) { if (want && !on) { on = true; draw(); } else if (!want) on = false; return; }
      if (want && !on) { on = true; if (!raf) raf = requestAnimationFrame(frame); }
      if (!want && on) { on = false; cancelAnimationFrame(raf); raf = 0; }
    }
    function refit() { fit(); if (on || calm) draw(); }
    if (!calm) {
      $('.visor').addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { px = (e.clientX / W - .5) * 2; py = (e.clientY / H - .5) * 2; } }, { passive: true });
      window.addEventListener('deviceorientation', (e) => { if (e.gamma == null) return; px = clamp((e.gamma + 30) / 60) * 2 - 1; py = clamp((e.beta - 15) / 60) * 2 - 1; }, { passive: true });
      heroVideo.addEventListener('playing', () => { if (on) draw(); });
    }
    poster.onload = () => { if (on || calm) draw(); };
    return { el: canvas, size, run, refit, draw, hole, box };
  })();
  window.brand = brand;

  // ---------- The forge: sparks on a canvas, drawing the helmet's outline (first visit, motion allowed) ----------
  const forge = (() => {
    const canvas = $('#forge'), line = $('#hm-line'), glow = $('#hm-glow'), helmet = $('#intro-helmet');
    const svg = line.ownerSVGElement;
    const L = line.getTotalLength();
    if (!calm) { [line, glow].forEach((p) => { p.style.strokeDasharray = L; p.style.strokeDashoffset = L; }); }
    const ctx = canvas.getContext('2d');
    const DRAW_MS = 1300;
    let W = 0, H = 0, parts = [], raf = 0, mode = 'off', drawStart = 0, last = 0, blowStart = 0, stampStart = 0, cx = 0, cy = 0;
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
      if (mode === 'stamp') {
        // The word lands: sparks fly off its top and bottom edges.
        const k = (now - stampStart) / 800, bt = brand.box.top || H / 2 - Math.min(W * .11, H * .3), bb = brand.box.bottom || H / 2 + Math.min(W * .11, H * .3);
        if (k < .14) for (let i = 0; i < 26; i++) { const top = Math.random() < .5; const x = W / 2 + (Math.random() - .5) * W * .86, y = top ? bt : bb; const a = (top ? -Math.PI / 2 : Math.PI / 2) + (Math.random() - .5) * 1.6; const v = 160 + Math.random() * 420; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: .4 + Math.random() * .5, t: 0, s: 2, hot: Math.random() }); }
        if (k >= 1 && parts.length === 0) { stop(); return; }
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i];
        q.t += dt; if (q.t >= q.life) { parts.splice(i, 1); continue; }
        if (mode === 'blow') { q.vx += (q.x - cx) * dt * 6; q.vy += (q.y - cy) * dt * 6; } else { q.vy += (mode === 'stamp' ? 420 : 260) * dt; q.vx *= (1 - .9 * dt); }
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
      if (n === 4 && !calm) { if (!W) size(); stampStart = performance.now(); mode = 'stamp'; if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
      if (n >= 5) stop();
    }
    function reset() { stop(); helmet.classList.remove('drawn'); if (!calm) { line.style.strokeDashoffset = L; glow.style.strokeDashoffset = L; } }
    return { start, stop, stage, reset };
  })();

  // ---------- The intro ----------
  // Stage 0: dark, an ember at the top of the helmet.  Stage 1: sparks draw the outline.  Stage 2: the metal cools and fills, the eyes ignite.
  // Stage 3: you put it on; the helmet rushes past.  Stage 4: FEARLESS stamps down, the reel moving inside it.  Stage 5: everything else.
  // About 5.3 s on a first visit; 2.5 s with reduced motion (cross-fades only). The hero is the intro's last frame.
  const STAGES = calm ? [0, 300, 900, 1500, 2000, 2500] : [0, 350, 1800, 2900, 3450, 4300];
  const timers = [];
  const visor = $('.visor');
  let live = false;
  function setStage(n) { body.className = body.className.replace(/\bstage-\d\b/g, '').trim() + ' stage-' + n; forge.stage(n); if (n >= 4) brand.run(true); }
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
    brand.run(false);
    [brand.el, veil, meta, place, hint].forEach((el) => el.removeAttribute('style'));
    forge.reset();
    window.scrollTo({ top: 0, behavior: 'auto' });
    setStage(0); playIntro();
  });

  // ---------- Scroll: push the word toward you, fill PLAY HARD, show the call bar ----------
  const scene = $('#hero'), veil = $('#hero-veil'), meta = $('.hero-meta'), place = $('.hero-place'), hint = $('.hero-hint');
  const wall = $('#wall'), wallFill = $('#wall-fill');
  let range = 1, wallTop = 0, vh = 0, ticking = false;
  // Measured once per layout change, never per frame.
  function measure() {
    vh = window.innerHeight;
    range = Math.max(1, scene.offsetHeight - vh);
    wallTop = wall.getBoundingClientRect().top + window.scrollY;
    brand.size();
  }
  function paint() {
    ticking = false;
    const y = window.scrollY;
    const open = clamp(y / range);
    body.classList.toggle('past-hero', y > range);
    body.classList.toggle('visor-open', open > 0.3);
    body.classList.toggle('scrolled', y > 40);
    if (live) {
      // The camera flies toward the hole inside a letter at a steady speed (scale grows exponentially) and passes
      // through it: by the end the hole is bigger than the screen and only the gym is left.
      const s = calm ? 1 : Math.pow(brand.hole.zoom, Math.min(1, open / .86));
      brand.el.style.transformOrigin = `${(brand.hole.x * 100).toFixed(2)}% ${(brand.hole.y * 100).toFixed(2)}%`;
      brand.el.style.transform = `scale(${s.toFixed(3)})`;
      brand.el.style.opacity = (calm ? clamp(1 - open * 1.6) : clamp(1 - Math.max(0, open - .8) * 6)).toFixed(3);
      veil.style.opacity = (.9 - open * .62).toFixed(3);
      meta.style.opacity = place.style.opacity = hint.style.opacity = clamp(1 - open * 4).toFixed(3);
      brand.run(y < range + vh);
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

  // ---------- Two warriors: the split leans toward your pointer, or toward the side you tap ----------
  const versus = $('#versus');
  if (versus) {
    const lifter = $('#side-lifter'), fighter = $('#side-fighter'), vs = $('#vs');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let x = 50, target = 50, vraf = 0, vw = versus.clientWidth;
    function apply() {
      lifter.style.clipPath = `inset(0 ${(100 - x).toFixed(2)}% 0 0)`;
      fighter.style.clipPath = `inset(0 0 0 ${x.toFixed(2)}%)`;
      vs.style.transform = `translateX(${(vw * x / 100).toFixed(1)}px)`;
    }
    function tick() {
      vraf = 0;
      x += (target - x) * .14;
      if (Math.abs(target - x) < .05) { x = target; apply(); return; }
      apply(); vraf = requestAnimationFrame(tick);
    }
    function lean(t) {
      target = Math.max(32, Math.min(68, t));
      lifter.classList.toggle('dim', target < 44); fighter.classList.toggle('dim', target > 56);
      if (calm) { x = target; apply(); return; }
      if (!vraf) vraf = requestAnimationFrame(tick);
    }
    if (fine) {
      versus.addEventListener('pointermove', (e) => { const r = versus.getBoundingClientRect(); vw = r.width; lean(50 - ((e.clientX - r.left) / r.width - .5) * 36); }, { passive: true });
      versus.addEventListener('pointerleave', () => lean(50));
    } else {
      versus.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const r = versus.getBoundingClientRect(); vw = r.width;
        const onLifter = (e.clientX - r.left) < r.width * x / 100, t = onLifter ? 68 : 32;
        lean(target === t ? 50 : t);
      });
    }
    window.addEventListener('resize', () => { vw = versus.clientWidth; apply(); });
    apply();  // the line starts in the middle, before anyone touches it
  }

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
