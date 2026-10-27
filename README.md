# Fearless Gym, Amman — preview site

Showcase site for Fearless Gym (Khalda, Amman), built by FellowFlow. **Preview only**: `noindex` and `robots.txt` block search engines until the gym agrees to go public.

- Plain HTML, CSS and JS, no build step. Hosted on GitHub Pages from `main`.
- Every word and fact lives in `assets/js/content.js` (English and Arabic), including the class timetable (`SCHEDULE`, the October 2026 timetable from the gym's Instagram, shown one day at a time with today preselected) and the coach chapter (Murad Khmous, IFBB Pro). Facts marked `CONFIRM` wait on the gym and on Murad.
- Fonts are self-hosted in `assets/fonts/` (Anton, Changa, IBM Plex Sans Arabic).
- Video in `assets/img/` (`hero.mp4`, `fighter.mp4`, `lifter.mp4`, `kitchen.mp4`) is cut from three of the gym's own reels (originals in the shared folder), cropped past the watermarks, muted, 540 px wide, with a poster JPEG each. `murad-loop.mp4` is a 20 s black-and-white loop from a screen recording of Murad's posing video. Every reel except the hero's loads only when its chapter is near and plays only while on screen; none plays with Reduce Motion or Data Saver on. Photos (`boxing.jpg`, `murad-card.jpg`) are Instagram crops, sharpened. The helmet (`helmet.svg`, the `#helmet` symbol in `index.html`, the favicon) is traced from the gym's official outline mark.
- Brand sheet is at the top of `assets/css/site.css`.
- The intro ("the forge": sparks draw the helmet, the metal cools, the eyes ignite, you put it on, the helmet rushes past and FEARLESS stamps down) runs once per visit from `assets/js/site.js`; the sparks are a canvas, the helmet an inline SVG. It plays with Reduce Motion on as cross-fades only. `Skip intro`, Escape and the footer's `Replay the intro` control it.
- The landing word is a second canvas (`#brand`): the word in blood red with the hero reel showing through its letters (luminosity blend, then a text mask). The real `<h1>` stays in the HTML for search engines and screen readers. Scrolling scales that canvas up until you pass between the letters and the reel fills the screen.
- Chapter I (two warriors) is two full-width layers clipped to their halves with `clip-path`; the split leans toward the pointer, or toward the side tapped on a phone.
- Everything that moves on scroll or pointer (the word, the veil, the split, the PLAY HARD fill) is written straight to the elements as `clip-path`, `transform` and `opacity`; nothing animates its size.

Preview: https://labsuncut.github.io/site-fearless-gym-amman/

## After changing words or layout

Run `NODE_PATH=$(npm root -g) node tools/prerender.cjs` before committing. It bakes the English words into `index.html` so Google and link previews see them without JavaScript. Running it twice changes nothing.

The link preview (WhatsApp, Instagram, iMessage) uses `assets/img/og.jpg` and the `og:` tags in `index.html`. Their URLs are absolute: change them when the site moves to the gym's own domain.
