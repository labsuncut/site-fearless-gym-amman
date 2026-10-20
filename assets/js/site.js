// FEARLESS site behaviour: language, intro, open badge, WhatsApp trial form, hours table.
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Team rule: the intro plays even when the phone asks for reduced motion ("the intros make us unique").
  // It is short (under 2 s), has a Skip button and never hides page content behind it.
  const introSeen = () => { try { const v = sessionStorage.getItem('fearless-intro') === '1'; sessionStorage.setItem('fearless-intro', '1'); return v; } catch (e) { return false; } };

  let lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  let T = TEXT[lang];

  function applyLang() {
    T = TEXT[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('fearless-lang', lang); } catch (e) {}
    $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (v !== undefined) el.textContent = v; });
    document.title = lang === 'ar' ? 'فيرلس جيم | نادي رياضي ومدرسة فنون قتالية في خلدا، عمّان' : 'Fearless Gym | Gym and martial arts school in Khalda, Amman';
    $('#map').title = T.map_title;

    // Links that depend on the business facts.
    $$('.call-link').forEach((a) => { a.href = 'tel:' + BUSINESS.phone; });
    const wa = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(T.wa_msg)}`;
    $$('.wa-link').forEach((a) => { a.href = wa; });
    $('#directions').href = BUSINESS.google;
    if ($('#map').src !== BUSINESS.mapEmbed) $('#map').src = BUSINESS.mapEmbed;
    $('#contact-lines').innerHTML = `<a href="tel:${esc(BUSINESS.phone)}" dir="ltr">${esc(BUSINESS.phoneDisplay)}</a>` +
      ` · <a href="https://wa.me/${esc(BUSINESS.whatsapp)}" target="_blank" rel="noopener">${esc(T.cta_wa)}</a>`;

    // Lists built from content.
    $('#wall-track').innerHTML = Array(12).fill(`<span>${esc(T.wall)}</span>`).join('');
    $('#facts').innerHTML = T.facts.map((f) => `<div class="fact"><dt class="display">${esc(f.big)}</dt><dd>${esc(f.small)}</dd></div>`).join('');
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
    const s = lang === 'ar' ? `${h}:${String(m).padStart(2, '0')}` : `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
    return s;
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

  // Intro sequence. Timings: eyes 700 ms, snap 150 ms, stamp 600 ms. Total under 2 s.
  (function intro() {
    const el = $('#intro');
    const finish = () => {
      if (el.classList.contains('is-done')) return;
      el.classList.add('is-done');
      document.body.classList.add('is-ready');
      setTimeout(() => el.remove(), 500);
    };
    if (introSeen()) { el.remove(); document.body.classList.add('is-ready', 'no-intro'); return; }
    document.body.classList.add('intro-on');
    requestAnimationFrame(() => el.classList.add('is-eyes'));
    setTimeout(() => el.classList.add('is-snap'), 800);
    setTimeout(finish, 1050);
    $('#skip').addEventListener('click', finish);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') finish(); });
  })();

  // The phone call bar waits until the hero (which has its own call button) has scrolled away.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => { document.body.classList.toggle('past-hero', !es[0].isIntersecting); }, { threshold: 0.15 }).observe($('#hero'));
  } else { document.body.classList.add('past-hero'); }

  applyLang();
  setInterval(openBadge, 60000);
})();
