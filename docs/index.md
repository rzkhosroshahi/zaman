---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zaman'
  text: 'Persian/Jalali + Gregorian date & time pickers for React. Beautiful, fast, and accessible.'
  tagline: 'Lightweight. Themeable. RTL by design. TypeScript native.'
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: See Components
      link: /components

features:
  - title: Jalali + Gregorian
    details: Switch calendars instantly. Bidirectional text support with locale-aware numerals.
  - title: Powerful Theming
    details: ThemeProvider, CSS variables, presets, and utilities for complete control.
  - title: Range & Time Pickers
    details: Date ranges, inline calendars, and 12/24-hour time selection.
---

<div data-parallax-root>
  <div data-parallax="0.08" style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(1200px 600px at 10% 10%, rgba(65,209,255,.15), transparent 60%)"></div>
  <div data-parallax="0.12" style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(1000px 520px at 90% 20%, rgba(189,52,254,.12), transparent 60%)"></div>
</div>

<section class="zmn-hero" style="margin-top:24px">
  <div class="zmn-glow"></div>
  <div class="zmn-spark s1"></div>
  <div class="zmn-spark s2"></div>
  <div class="zmn-spark s3"></div>
  <div class="zmn-orbit">
    <div class="zmn-dial"></div>
    <div class="zmn-numerals" id="zmn-numerals">
      <div class="fa">۱۴۰۴ • ۰۷ • ۲۳</div>
      <div class="en">2025 • 10 • 11</div>
    </div>
  </div>
  <div class="zmn-cursor-light"></div>
</section>

<div class="demo-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:32px">
  <a class="vp-feature" href="/zaman/examples.html" style="display:block;padding:16px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft)">
    <h3 style="margin-top:0">Interactive Demos</h3>
    <p style="margin:8px 0 0 0">Explore live Storybook demos embedded right in the docs.</p>
  </a>
  <a class="vp-feature" href="/zaman/theming.html" style="display:block;padding:16px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft)">
    <h3 style="margin-top:0">Theme Gallery</h3>
    <p style="margin:8px 0 0 0">Pick from presets or craft your own with createTheme().</p>
  </a>
  <a class="vp-feature" href="/zaman/internationalization.html" style="display:block;padding:16px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft)">
    <h3 style="margin-top:0">Built-in i18n</h3>
    <p style="margin:8px 0 0 0">Localized month/day names, numerals, and RTL layout out-of-the-box.</p>
  </a>
</div>

<section class="zmn-show">
  <div class="zmn-show__card">
    <h3 class="zmn-show__title">Bilingual by Design</h3>
    <p class="zmn-show__desc">Numbers and layout adapt seamlessly between Persian (RTL) and English (LTR).</p>
    <div class="zmn-bidi">
      <span class="fa">۱۴۰۴/۰۷/۲۳</span>
      <span class="en">2025/10/11</span>
    </div>
  </div>
  <div class="zmn-show__card">
    <h3 class="zmn-show__title">Range Selection</h3>
    <p class="zmn-show__desc">Visualize selected spans with elegant, themeable accents.</p>
    <div class="zmn-range"></div>
  </div>
  <div class="zmn-show__card">
    <h3 class="zmn-show__title">Time Picker</h3>
    <p class="zmn-show__desc">12/24-hour formats with smooth clock ticks.</p>
    <div class="zmn-clock"></div>
  </div>
</section>

<div id="zmn-embed-container" style="margin-top:40px">
  <div data-fallback style="padding:16px;border:1px dashed var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft)">
    <strong>Live demos</strong> will appear here after Storybook is available.
    <div style="margin-top:6px;color:var(--vp-c-text-2)">
      In local dev, run <code>pnpm storybook</code> (port 6006), or build with <code>pnpm build-storybook</code> for embedded demos.
    </div>
  </div>
  <iframe title="Zaman Storybook" data-src="/zaman/storybook/index.html" style="display:none;width:100%;height:520px;border:1px solid var(--vp-c-divider);border-radius:12px;overflow:hidden"></iframe>
  <p style="margin-top:10px;color:var(--vp-c-text-2)">Tip: open the demo fullscreen for more components and controls.</p>
</div>
