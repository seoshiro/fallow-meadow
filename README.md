# FALLOW

**A small world, grown by you.** An interactive botanical playground by [seoshiro](https://github.com/seoshiro).

[Open FALLOW](https://seoshiro.github.io/fallow-meadow/) · [Design research](docs/DESIGN.md) · [Verification](docs/QA.md)

Sow poppies, daisies, cornflowers, clover, yarrow and grass. Watch a 120-day season become a layered botanical cutaway, with leaves, flowers, seed heads and a visible root system. Rainfall, light, neighbouring plants and the time of planting change the result. The graphics and growth rules are original; this is an artistic simulation, not a gardening forecast.

## Three complete paths

- **Grow your own:** start from bare soil or a planted study, choose seeds, tap the meadow or use the keyboard position selector, and scrub or play the season. Remove plants and undo decisions. The workspace restores when you return.
- **Ask “what if?”:** compare the same planting under different rain and sunlight, see the actual scene and metrics change, then apply that climate or return to your original conditions.
- **Keep a field notebook:** name and save up to 12 studies, reopen or delete them, export a real 1600 × 950 PNG, a standalone SVG, or editable JSON. Import JSON to continue on another device.

English and Russian are included, with locally bundled Cyrillic fonts. All planting positions remain visible on a phone. Native controls, a keyboard planting path, visible focus, modal focus restoration, touch input and reduced motion are supported. Wind is off by default.

## Run locally

Use Node.js 22 or newer. There are no packages to install.

```sh
npm run dev
# http://127.0.0.1:4173/
npm test
npm run build
```

`npm run build` creates a self-contained `dist/`. The repository root also runs directly as a static site; all application URLs are relative, so GitHub Pages project paths work. Serve through HTTP, rather than opening `index.html` as a file.

Optional browser QA uses a locally available Playwright installation. `tools/browser-qa.cjs` covers complete scenarios and screenshots; `tools/browser-additional.cjs` checks boundary states, mobile control geometry, focus trapping, contrast and records a short demo. Set `FALLOW_BROWSER` to your Chromium executable if needed. These scripts put artifacts in ignored `qa-private/`, never in the public site.

## How it works

Native ES modules, HTML, CSS and SVG; no framework, backend, WebGL or runtime dependency. `src/model.js` runs a deterministic daily model. Rain replenishes soil moisture; sunlight and crowding affect growth; drought reduces health; species have different flowering windows and seasonal decline. `src/botany.js` draws each species procedurally from that model. A mobile composition changes the coordinate system while retaining every planting position.

Weather describes a hypothetical **whole season**, not a forecast beginning today. Planting is limited to 24 clusters and days 0–119. At day 120, return to an earlier day to sow. “Growing species” counts species with health above 30% and growth above 10%; “in bloom” counts flowering clusters; vitality is mean health among clusters planted by the selected day. Decorative foreground grass is not included in metrics.

State stays in `localStorage` on the current browser and origin. It does not sync between devices. Clearing browser data, private browsing or changing origins can remove it; JSON is the portable backup. Blocked storage is explained and exports remain available. Undo is session-local and stores the last 30 planting/weather decisions. Imported files are capped at 60 KB, validated, and never executed.

## $0 operation

Checked against official GitHub documentation on **2026-10-11**: [Pages is available for public repositories with GitHub Free](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). This is a noncommercial creative playground with no transactions, paid API, account, trial, card, credits or purchased domain. The bundled app has no external runtime requests. Publication uses the existing GitHub authorization and branch-based Pages; no new credential or elevated workflow permission is required.

[Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) include a 1 GB published site, a soft 100 GB monthly bandwidth limit and a soft 10 branch builds per hour. This app is far below the size limit. GitHub can rate-limit traffic; their hosting terms can change. GitHub logs visitors’ IP addresses for hosting security even though FALLOW itself has no analytics or tracking code.

## Licenses and provenance

Original source, SVG graphics and icon: [MIT](LICENSE), copyright 2026 seoshiro. Cormorant Garamond and Manrope are bundled unmodified under [SIL Open Font License 1.1](THIRD_PARTY.md), including their license notices. No gallery template, 21st component code, photograph or external illustration was copied. Design references are inspiration only; exact observations and access limits are recorded in [DESIGN.md](docs/DESIGN.md).

Modern browsers with JavaScript, SVG, native `dialog`, ES modules and Canvas are required. PNG is raster; SVG retains vector geometry. Export uses system typefaces for its small stamp so it remains a standalone file. No AI is involved.
