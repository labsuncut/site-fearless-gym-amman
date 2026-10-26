# Fearless Gym, Amman — preview site

Showcase site for Fearless Gym (Khalda, Amman), built by FellowFlow. **Preview only**: `noindex` and `robots.txt` block search engines until the gym agrees to go public.

- Plain HTML, CSS and JS, no build step. Hosted on GitHub Pages from `main`.
- Every word and fact lives in `assets/js/content.js` (English and Arabic), including the class timetable (`SCHEDULE`, copied from the gym's Instagram posts). Facts marked `CONFIRM` wait on the gym.
- Fonts are self-hosted in `assets/fonts/` (Anton, Changa, IBM Plex Sans Arabic).
- Photos in `assets/img/` are low-resolution crops of the gym's Instagram posts, used as placeholders until the gym sends originals. The helmet (`helmet.svg`, the `#helmet` symbol in `index.html`, the favicon) is traced from the gym's official outline mark.
- Brand sheet is at the top of `assets/css/site.css`.

Preview: https://labsuncut.github.io/site-fearless-gym-amman/

## After changing words or layout

Run `NODE_PATH=$(npm root -g) node tools/prerender.cjs` before committing. It bakes the English words into `index.html` so Google and link previews see them without JavaScript. Running it twice changes nothing.

The link preview (WhatsApp, Instagram, iMessage) uses `assets/img/og.jpg` and the `og:` tags in `index.html`. Their URLs are absolute: change them when the site moves to the gym's own domain.
