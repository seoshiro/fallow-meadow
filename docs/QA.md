# Verification record

2026-10-11. Environment: Windows, Node.js 24.18.0, local Chromium controlled by the host's Playwright 1.57 runtime. Browser tests use actual rendered DOM, keyboard, pointer, touchscreen, native downloads and localStorage. No source was uploaded to an outside review service.

## Audit 1 — product and composition

The first screen exposes a working planted meadow and a clear seed/weather/season loop. Roots became the default to make the botanical cutaway the central moment. Text describes what to do and what changes. The preset studies, comparison and notebook retain the same visual language. The EN mobile headline was recomposed to keep “wild in.” together. Russian glyphs and line wrapping were visually inspected.

## Audit 2 — functionality and independent local review

15 Node tests cover determinism, real weather effects, competition, future planting, seasonal behavior, empty scenes, capacity, schema bounds, duplicate and unsafe IDs, portable JSON and finite standalone SVG. All pass. Independent local review confirmed the model's arithmetic and measured 24-cluster/120-day simulation at roughly 2.7 ms and scene markup at 4.4 ms in Node on this host; these are local indicative measurements, not device guarantees.

Fixes from that review: seed re-rendering preserves keyboard focus; modal transitions focus their heading and closing restores the original opener; imported IDs use a safe bounded integer range with collision-free allocation; sowing at day 120 is blocked with a continuation instruction; the visually hidden file input has a visible label focus state.

The complete browser suite checks seed selection, mouse/touch/keyboard planting, undo, season playback and pause, timeline and weather keyboard control, climate comparison/apply/undo, named notebook save/reopen/delete/cancel, actual JSON/SVG/PNG downloads, correct PNG signature and 1600 × 950 dimensions, invalid import preserving state, valid import, reload persistence, EN/RU, storage failures and reduced motion. It passed 50/50 checks locally before the final focused audit.

## Audit 3 — visual and technical

Actual screenshots were inspected at 1440, 768, 390 and 360 CSS px. No horizontal page overflow. Full pages, first viewports, comparison, notebook and Cyrillic layouts are captured privately. The independent reviewer found mobile edge plants were cropped; the scene now maps its full planting domain into a narrower coordinate system. Touch planting was repeated against the corrected geometry.

A visual inspection then caught rainfall and sunlight controls colliding despite passing functional checks. Explicit control selectors replaced structural `nth-of-type` selectors. A focused geometry check verifies non-overlap and that both weather settings precede Save. Focus trapping/restoration, 24-cluster capacity, accessible removal/undo, season-end continuation and computed text contrast are checked separately. Main and muted body colors meet WCAG AA text contrast on the page background. Decorative miniature captions are not a complete WCAG certification.

Local browser suite: zero console/page errors, no failed resources. A warm local navigation transferred about 252 KB of resources. The app has no WebGL dependency or external runtime fetch; only optional CSS stem animation runs continuously. No unverified broad performance score is claimed.

## Public verification

Verified against **https://seoshiro.github.io/fallow-meadow/** on 2026-10-11: the complete public suite passed **50/50**, and the focused audit passed **30/30** (18 of those assertions are successive modal Tab presses). CI model tests/build and native Pages deployment succeeded. Public checks use isolated browser contexts and local downloads; they do not change any server data. Final exact release commit and CI run URLs are supplied with the handoff. A final screenshot review also removed stale-language toast text when switching EN/RU.

## Private artifacts and limits

`qa-private/` is git-ignored. It contains desktop/mobile screenshots, both machine-readable audit reports, verified downloads and `fallow-demo.webm`, a short recording of actual sow → grow → compare → save interactions. These are intentionally absent from the public repository. Windows Library upload was not available; no alternative public upload was used.

Not verified: physical phone hardware, Safari, Firefox, a screen reader, user-browser automation (its Windows runtime failed to initialize). Chromium touch emulation and keyboard checks are explicit substitutes, not claims of those environments. Storage is browser/origin-local; this is a transparent authored model, not a scientific forecast.
