# Design decisions and actual research

Research date: 2026-10-11. The intended user wants a small creative experiment that becomes something worth keeping. They choose seeds, influence a season, observe the result, and leave with a saved study or a real export. No sign-up or hidden processing stands between them and the meadow.

## Choice of concept

The brief intentionally left the choice to the author. Three materially different directions were compared on a 1–5 scale before implementation.

| Concept | Memorable | Central function | Function / visual fit | Finish well at $0 | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| FALLOW: a living meadow and climate notebook | 5 | 5 | 5 | 5 | 20 |
| RILL: a watershed and erosion sandbox | 5 | 5 | 5 | 3 | 18 |
| TANGLE: a spatial folding logic puzzle | 4 | 5 | 4 | 4 | 17 |

FALLOW offers the clearest relationship between action and picture: a seed becomes a plant, a dry season changes its growth, and the same planting can be compared honestly. RILL would need more computational work to make its water dynamics convincing; TANGLE had a weaker expressive result beyond solving a puzzle.

This is deliberately a botanical, daylight, editorial world. Its principal mechanism is growth over time, distinct from the existing cosmic portfolio, orbital music instrument, print studio, accessibility maps and product landing pages. No existing project was edited and no portfolio entry was added.

## Twelve studied works

The requested user-browser automation could not initialize on this Windows host. Research continued with a separate local Chromium browser and official web reads. Screenshots, scrolling and interactions below were actually performed; gallery-only observations are labelled. Private research captures remain outside the public repository.

| Work and source | What was actually observed | Specific lesson |
| --- | --- | --- |
| **Yunjian Mountain Retreat**, Dara To, [Aura free gallery](https://www.aura.build/browse/components/free-templates?page=1) | Free-filtered gallery card, static preview | Mist and restrained serif type make layered depth feel calm. For FALLOW: cool atmosphere above a dark soil cutaway. No template or motion was inspected. |
| **KAIRO Luxury Travel**, Sourany, [Aura gallery](https://www.aura.build/browse/components) | Gallery preview | One dominant sculptural scene can carry a composition with small, disciplined controls. No live animation claimed. |
| **Gloop Slime Studio**, Aksonvady, [Aura gallery](https://www.aura.build/browse/components) | Free-template preview | A material image and confident serif headline can establish character without piles of decorative cards. |
| [**Yichen Xie portfolio**](https://yichenxie.com/) / [Codrops case study](https://tympanus.net/codrops/2026/10/06/yichen-xie-portfolio/) | Live landing scene and case-study text | A cream canvas, a precise hierarchy and very few controls allow visual play to feel intentional. |
| [**Liquid — Infinite Shape Canvas**](https://yichenxie.com/playground/liquid) | Live canvas and a pointer gesture that visibly altered its arrangement | Make the working surface present immediately. Let interaction reshape the central visual, rather than decorate a marketing page. |
| [**Isle Thorne Collective**](https://isle-thorne-collective.crnacura.workers.dev/) / [Codrops article](https://tympanus.net/codrops/2026/10/07/isle-thorne-collective-astro-template/) | Live page, scrolling and article | Editorial rhythm continues below the first screen. Native disclosure/dialog patterns and small utility features can support authored presentation. |
| [**Powder**](https://powder.framer.website/) / [Framer listing](https://www.framer.com/marketplace/templates/powder/) | Live preview and scroll | A conspicuous primary action and quiet secondary labels orient a new visitor. The SaaS structure was not reused. |
| [**Kern**](https://kern-template.framer.website/) / [Framer listing](https://www.framer.com/marketplace/templates/kern/) | Live first composition and scrolling | Typographic scale needs a disciplined baseline and room around it. FALLOW balances a large serif voice with compact functional labels. |
| [**Paradigm**](https://www.paradigmai.com/) / [Godly entry](https://godly.design/website/paradigmai/) | Live page and scroll | Large scene, restrained serif and subdued supporting copy can coexist without glowing UI treatments. |
| [**Fluid simulation**, Amanda Ghassaei](https://apps.amandaghassaei.com/gpu-io/examples/fluid/) | Live canvas; pointer input produced fluid trails | Controls become interesting when their effects are visible immediately. FALLOW recalculates the actual growth picture, not a prepared answer. |
| [**Slider**, micka_design, 21st](https://21st.dev/@micka_design/components/slider/range) | Read-only component metadata and browser preview | Keep a current value next to each parameter. Native range controls preserve precise keyboard use. Component code was not fetched. |
| [**Product Timeline**, hyperiux, 21st](https://21st.dev/@hyperiux/components/timeline) | Read-only metadata and preview | Time needs clear orientation and one continuous control. Full component animation was not verified. |

The five main references are **Liquid, Yunjian, Isle Thorne, Fluid simulation and Slider**. Their lessons govern the canvas-first experience, quiet depth, editorial rhythm, real parameter feedback and accessible controls. None supplies copied implementation or assets.

[Awwwards](https://www.awwwards.com/) was visited and its available listings inspected. Maria Vasilyeva and LPAS live visits remained at loading screens during capture, so they are not counted as studied live works. A Codrops layout-formation demo was blocked by Cloudflare; its movement is not claimed. Aura did not expose a verified Gemini authorship badge on the selected previews; no generator was used and no AI attribution is invented.

## The visual system

- Cool ivory `#f5f6ed`, deep botanical ink `#30482e`, muted olive, acid seed-packet selection and species-specific pigments. Soil is a darker cutaway; roots are visible from the start.
- Cormorant Garamond expresses the field notebook; Manrope handles controls. Original Latin and Cyrillic subsets are self-hosted under OFL. Russian is composed and tested, not an afterthought.
- Desktop: a wide working meadow with an adjacent climate column, six illustrated seed packets and three editorial study rows. Mobile: a portrait meadow remaps all x positions into view, then presents climate and seeds without hidden hover actions.
- The signature moment is the **seasonal botanical cutaway**. Growth, flowering, decline and root depth arise from one model. No photographic hero, 3D ornament, bento gallery or artificial intro.
- Wind is an optional slow stem motion. Every meaningful action responds immediately. Reduced motion disables wind and decorative pollen; it does not remove any function.

## Technical and license decisions

Native SVG is sharper and easier to export than a GPU-only canvas and works on modest devices. Small deterministic model functions are unit-tested. PNG rasterizes the very same standalone SVG. Native dialogs and ranges provide predictable platform behavior; explicit focus restoration covers content changes.

No code was borrowed from 21st, Framer, Aura or Codrops. Free template labels do not automatically grant unrestricted reuse; references remained observational. The only external application assets are OFL fonts, with their notices bundled. Source is MIT. Official technical sources: [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [Node test runner](https://nodejs.org/api/test.html), [Playwright Page](https://playwright.dev/docs/api/class-page), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
