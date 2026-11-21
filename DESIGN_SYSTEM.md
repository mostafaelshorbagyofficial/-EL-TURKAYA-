# TURKEYA — Design System (`DESIGN_SYSTEM.md`)

## 1. Brand Identity & Color Tokens

All primary brand tokens are extracted directly from the official **TURKEYA** (`التركايه .png`) and **ProMedia** (`promedia-logo.png`) assets without substituting or inventing brand colors.

| CSS Variable | Hex | Role & WCAG 2.2 AA Usage |
| :--- | :---: | :--- |
| `--brand-blue` | `#2F3B8E` | Official TURKEYA wordmark blue — institutional authority, deep studio accents, editorial numerals on light surfaces (9.1:1 on `#FAF7F2`). |
| `--brand-orange` | `#FE7C01` | Official TURKEYA "OK" hand accent — primary CTA fill paired with `#090C16` text (8.3:1 AAA), active broadcast indicators, focus rings. |
| `--brand-orange-text-on-light` | `#B85400` | Darkened accessible orange for eyebrow labels on `#FAF7F2` paper surfaces (4.7:1 AA). |
| `--brand-sand` | `#F0C188` | Official TURKEYA wood-grain warm sand — framed logo backdrop, subtle editorial hairlines, secondary highlights on dark surfaces (11.5:1 on `#090C16`). |
| `--surface-obsidian` | `#090C16` | Primary cinematic dark canvas. |
| `--surface-elevated` | `#111629` | Elevated cards, header controls, studio caption bars, and secondary dark sections. |
| `--surface-paper` | `#FAF7F2` | Warm editorial light section surface for visual pacing and future Media Kit print views. |
| `--surface-white` | `#FFFFFF` | Pure white surface for light-mode cards and **mandatory isolated container for the ProMedia logo**. |
| `--promedia-slate` | `#434B5D` | Sampled from ProMedia wordmark. |
| `--promedia-crimson` | `#E54E58` | Sampled from ProMedia vinyl/play mark. |

### Mandatory Logo Rules
1. **TURKEYA Logo (`التركايه .png`):** Preserved inside a warm `#F0C188` framed editorial plate so its original wood-grain texture integrates seamlessly with the dark `#090C16` hero and header.
2. **ProMedia Logo (`promedia-logo.png`):** Rendered exclusively via `<ProMediaLogo />`, which enforces a pure `#FFFFFF` white background plate (`promedia-logo-plate`) at all times. Never inverted or placed directly on dark/colored surfaces.

---

## 2. Typography & Bilingual RTL/LTR Rules

- **Default Language:** Arabic (`<html lang="ar" dir="rtl">`) rendered natively on SSR to eliminate hydration flicker and layout shift (CLS = 0).
- **Arabic Font:** `Cairo` (`400`, `500`, `600`, `700`, `800`) via `next/font/google` (`--font-cairo`, `display: "swap"`).
- **English Font:** `Plus Jakarta Sans` (`400`, `500`, `600`, `700`, `800`) via `next/font/google` (`--font-jakarta`, `display: "swap"`).
- **Directional Layout:** Uses CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline-start`) and direction-aware icons (`ArrowLeft` in RTL, `ArrowRight` in LTR).
- **Numerals:** `.tabular-nums` (`font-variant-numeric: tabular-nums`) for all statistics, KPIs, and episode numbers.

---

## 3. Mobile-First, Safe-Area & Accessibility Foundations

- **Minimum Supported Viewport:** `320px` (tested across `320px`, `360px`, `375px`, `390px`, `414px`, `430px`, `768px`, `1024px`, `1280px`, `1440px+`).
- **Zero Horizontal Overflow:** `overflow-x: clip` applied at `html` and `body`.
- **iOS Notch & Dynamic Island:** `viewportFit: "cover"` + `env(safe-area-inset-top/bottom/left/right)` on sticky header, container edges, and footer.
- **Touch Targets:** Minimum `44×44px` on all navigation links, icon buttons, and language toggles; `48px` height on primary hero CTAs.
- **No Hover-Only UI:** All actions work via tap and keyboard (`Enter`, `Space`, `Escape`).
- **Keyboard & Focus:** Skip-to-content link + high-contrast `#FE7C01` `:focus-visible` outline.
- **Reduced Motion:** Framer Motion `useReducedMotion()` hook + `@media (prefers-reduced-motion: reduce)` CSS safeguard.
