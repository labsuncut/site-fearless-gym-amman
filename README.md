# Fearless Gym, Amman — preview site

Showcase site for Fearless Gym (Khalda, Amman), built by FellowFlow. **Preview only**: `noindex` and `robots.txt` block search engines until the gym agrees to go public.

- Plain HTML, CSS and JS, no build step. Hosted on GitHub Pages from `main`.
- Every word and fact lives in `assets/js/content.js` (English and Arabic), including the class timetable (`SCHEDULE`, the October 2026 timetable from the gym's Instagram, shown one day at a time with today preselected) and the coach chapter (Murad Khmous, IFBB Pro). Facts marked `CONFIRM` wait on the gym and on Murad.
- Fonts are self-hosted in `assets/fonts/` (Anton, Changa, IBM Plex Sans Arabic).
- Photos in `assets/img/` are crops of the gym's and Murad's Instagram posts, sharpened with an upscaler, used as placeholders until the gym sends originals. `murad-loop.mp4` is a 20 s black-and-white loop cut from a screen recording of Murad's posing video; it loads only when the coach chapter is near and plays only while on screen (never with Reduce Motion or Data Saver on). The helmet (`helmet.svg`, the `#helmet` symbol in `index.html`, the favicon) is traced from the gym's official outline mark.
- Brand sheet is at the top of `assets/css/site.css`.
- The intro ("the forge": sparks draw the helmet, the metal cools, the eyes ignite, you put it on and the visor slit opens on the gym) runs once per visit from `assets/js/site.js`; the sparks are a canvas, the helmet an inline SVG. It plays with Reduce Motion on as cross-fades only. `Skip intro`, Escape and the footer's `Replay the intro` control it.
- Everything that moves on scroll (the visor slit, FEAR/LESS, the PLAY HARD fill) is written straight to the elements as `clip-path`, `transform` and `opacity`; nothing animates its size.

Preview: https://labsuncut.github.io/site-fearless-gym-amman/

## After changing words or layout

Run `NODE_PATH=$(npm root -g) node tools/prerender.cjs` before committing. It bakes the English words into `index.html` so Google and link previews see them without JavaScript. Running it twice changes nothing.

The link preview (WhatsApp, Instagram, iMessage) uses `assets/img/og.jpg` and the `og:` tags in `index.html`. Their URLs are absolute: change them when the site moves to the gym's own domain.
