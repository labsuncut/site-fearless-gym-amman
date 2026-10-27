// Bakes the English words, timetable and lists into index.html, so the content is in the HTML itself
// (for Google, AI crawlers and anyone with JavaScript off). The page still fills itself from content.js
// at load, so run this after every change to content.js or index.html:
//   NODE_PATH=$(npm root -g) node tools/prerender.cjs        (needs Playwright with Chromium)
// Same tool as the Apollo site, adapted. Running it twice gives the same file.
const { chromium } = require('playwright');
const { createServer } = require('http');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

const root = join(__dirname, '..');
(async () => {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(req.url.split('?')[0].replace(/\/$/, '/index.html')));
    if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(readFileSync(file));
  }).listen(0);
  const port = server.address().port;

  const launch = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : (existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {});
  const browser = await chromium.launch(launch);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce', timezoneId: 'Asia/Amman' });
  await ctx.addInitScript(() => { try { localStorage.setItem('fearless-lang', 'en'); sessionStorage.setItem('fearless-intro', '1'); } catch (e) {} });
  const page = await ctx.newPage();
  await page.route(/^(?!http:\/\/localhost)/, (r) => r.abort()); // nothing leaves the machine
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelectorAll('#day-list li, #day-list .day-empty').length > 0 && document.querySelectorAll('#hours tr').length === 7, null, { timeout: 15000 });
  // Only words are baked, never state: no reveal/open classes, no scroll styles, no "today", no open/closed badge, no map URL.
  const body = await page.evaluate(() => {
    document.querySelectorAll('.ap.in').forEach((el) => el.classList.remove('in'));
    // The intro has already run in this page: undo its traces so a first visit starts from the dark.
    document.querySelectorAll('.visor.live').forEach((el) => el.classList.remove('live'));
    document.querySelectorAll('.intro-helmet.drawn').forEach((el) => el.classList.remove('drawn'));
    document.querySelectorAll('.ap-probe').forEach((el) => el.remove());
    const forge = document.getElementById('forge'); if (forge) { forge.removeAttribute('width'); forge.removeAttribute('height'); }
    ['brand'].forEach((id) => { const c = document.getElementById(id); if (c) { c.removeAttribute('width'); c.removeAttribute('height'); } });
    const hv = document.getElementById('hero-video'); if (hv) hv.removeAttribute('src');
    document.querySelectorAll('.side.dim').forEach((el) => el.classList.remove('dim'));
    // The timetable opens on today's day: bake Saturday (the gym's first day) with no 'today' mark instead.
    window.fearless.showDay(6);
    document.querySelectorAll('.day-tab small').forEach((s) => s.remove());
    document.querySelectorAll('[style]').forEach((el) => { if (el.closest('svg[width="0"]')) return; el.removeAttribute('style'); });
    document.querySelectorAll('#hours tr.today').forEach((tr) => { tr.classList.remove('today'); if (!tr.getAttribute('class')) tr.removeAttribute('class'); const s = tr.querySelector('small'); if (s) { s.previousSibling && s.previousSibling.nodeType === 3 && (s.previousSibling.textContent = s.previousSibling.textContent.replace(/\s+$/, '')); s.remove(); } });
    const b = document.getElementById('open-badge'); b.textContent = ''; b.className = 'open-badge'; b.hidden = true;
    document.getElementById('map').setAttribute('src', '');
    document.querySelectorAll('.wa-link').forEach((a) => a.setAttribute('href', '#'));
    return document.body.innerHTML;
  });
  await browser.close(); server.close();

  const file = join(root, 'index.html');
  const html = readFileSync(file, 'utf8');
  const open = html.match(/<body[^>]*>/);
  const start = open.index + open[0].length, end = html.lastIndexOf('</body>');
  if (end < 0) throw new Error('index.html has no </body>');
  const out = html.slice(0, start) + body.replace(/^\s*/, '\n  ').replace(/\s+$/, '\n') + html.slice(end);
  writeFileSync(file, out);
  // Keep the Content-Security-Policy in _headers in step with the inline <head> script: hash every inline script that runs.
  const { createHash } = require('crypto');
  const hashes = [...out.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`);
  const hf = join(root, '_headers');
  if (existsSync(hf)) writeFileSync(hf, readFileSync(hf, 'utf8').replace(/script-src 'self'( 'sha256-[^']+')*/, `script-src 'self' ${hashes.join(' ')}`.trim()));
  const words = body.replace(/<script[\s\S]*?<\/script>|<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`index.html prerendered: ${words} words in the HTML (${Math.round(out.length / 1024)} KB).`);
})();
