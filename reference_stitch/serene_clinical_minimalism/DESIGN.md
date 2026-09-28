---
name: Serene Clinical Minimalism
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is engineered for reassurance, cognitive clarity, and effortless daily adherence. Designed for individuals managing personal health regimes, multi-prescription schedules, and long-term wellness plans, the interface balances clinical authority with domestic warmth. The emotional objective is total destigmatization: medication management should feel as natural, clean, and positive as a restorative morning ritual, completely divorced from sterile hospital terminals or anxiety-inducing medical paperwork.

Drawing from modern refined minimalism and soft tactile UI, the aesthetic prioritizes generous white space, balanced contrast, and a calm, orderly visual flow. Visual clutter is methodically stripped away to reduce cognitive load during times of physical vulnerability or cognitive fatigue. The tone is discreet, protective, and unmistakably dependable.

## Colors

The palette is anchored in restorative deep teal and serene sky blue, balanced by a sophisticated slate hierarchy that keeps readability effortless under all lighting conditions.

- **Primary (`#0D9488`):** Restorative Teal. Used for primary calls to action, active intake confirmations, and core brand focal points.
- **Secondary (`#0284C7`):** Soft Maritime Blue. Used for secondary navigation, schedule timelines, dosage counts, and informational indicators.
- **Tertiary (`#0F172A`):** Deep Navy Slate. Serves as the primary typographic color, grounding the interface with high-contrast, non-harsh readability.
- **Neutral (`#64748B`):** Cool Slate. Used for secondary metadata, muted icons, timestamps, and resting state outlines.

### Functional & Adherence Tokens
- **Background:** `#F8FAFC` (Canvas). Prevents eye fatigue compared to pure harsh white.
- **Surface:** `#FFFFFF` (Card & Modal Container). Clean, raised plane.
- **Border Subtle:** `#E2E8F0` (Slate-200) and `#F1F5F9` (Slate-100) for unassertive spatial containment.
- **Status - Success / Taken:** `#10B981` (Soft Emerald). Confirms completed dosages.
- **Status - Upcoming / Next:** `#3B82F6` (Gentle Cobalt). Identifies actionable upcoming time windows.
- **Status - Skipped / Deferred:** `#64748B` (Neutral Slate). Calm, guilt-free indication of non-administered doses.
- **Status - Missed / Critical Warning:** `#EF4444` (Soft Coral Red). Highlights overdue critical prescriptions without alarming panic.
- **Status - Low Refill / Alert:** `#F59E0B` (Soft Warm Amber). Denotes prescription refill urgency.

## Typography

The typographic hierarchy pairs **Plus Jakarta Sans** for expressive, warm, and human-centered headlines with **Inter** for clinical data legibility, medication metrics, and microcopy.

- **Plus Jakarta Sans:** Provides friendly geometry, soft terminals, and optimism in headers, intake routines, and patient greetings.
- **Inter:** Delivers strict vertical alignment, high x-height, and unmistakable character distinction for critical medical data (e.g., distinguishing `1`, `I`, `l` and `mg`, `mcg`, `ml`).

Letter spacing remains neutral to slightly open (`+0.01em` on labels and numbers) to ensure instantaneous scanning for elderly or visually impaired users. Tabular figures (`tnum`) must be enforced for all dosage figures, pill counts, and countdown schedules.

## Layout & Spacing

The layout is built on an adaptive fluid-grid framework adhering to an 8-point spatial rhythm (`space-xs` through `space-xl`).

### Layout Breakpoints
- **Mobile (< 640px):** Single-column layout. Margin `1rem` (16px), column gutter `1rem` (16px). All primary action targets span full width or sit locked in a bottom floating dock.
- **Tablet (640px - 1024px):** 6-column fluid grid. Margin `2rem` (32px), column gutter `1.5rem` (24px). Schedule timeline and prescription details sit side-by-side.
- **Desktop (> 1024px):** 12-column layout capped at a maximum width of `1280px`. Margin `3rem` (48px), column gutter `2rem` (32px). Allows a persistent navigation sidebar, daily dosage stream, and detailed medication drawer.

Spacing inside cards and containers must never feel compressed; airiness directly correlates with perceived calm and therapeutic control.

## Elevation & Depth

Visual hierarchy is communicated through soft, layered surfaces and diffused ambient shadows, completely eliminating harsh borders or dark drop shadows.

- **Canvas Base:** `#F8FAFC` forms the foundation.
- **Tier 1 (Surface Cards & Lists):** Pure white (`#FFFFFF`) with a 1px border of `#E2E8F0` and an ultra-soft slate shadow:
  `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02);`
- **Tier 2 (Hovered Cards & Active Items):** Slight upward translation accompanied by a dilated, serene shadow:
  `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.03);`
- **Tier 3 (Modals, Take Dose Drawers & Sheets):**
  `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);`
  Complemented by a backdrop overlay of `rgba(15, 23, 42, 0.35)` with an 8px backdrop blur (`backdrop-filter: blur(8px)`).

## Shapes

The design adopts a Level 2 (`Rounded`) shape profile, matching human-centric warmth while maintaining institutional structure.

- **Base Radius (0.5rem / 8px):** Applied to inputs, dropdown triggers, list row highlights, and medication status pills.
- **Medium Radius (0.75rem / 12px):** Applied to buttons, action panels, and notification toasts.
- **Large Radius (1rem / 16px):** Applied to prescription cards, schedule containers, and modal sheets.
- **Pill (9999px):** Reserved for quantitative dosage badges, adherence streaks, and quick-filter category chips.

## Components

### Buttons
- **Primary:** Solid `#0D9488` background, `#FFFFFF` text, `0.75rem` border-radius. Height `44px` on mobile for tactile ergonomics. Subtle hover state to `#0F766E`. Active state applies a scale transform (`0.98`).
- **Secondary:** Surface `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. On hover, background shifts to `#F8FAFC`.
- **Tertiary / Ghost:** No border or background. Text `#64748B`, hovering to `#0D9488`.

### Status Badges & Chips
- Designed with soft pastel tinted surfaces and saturated typography to ensure WCAG AAA legibility.
  - **Taken / Success:** Background `#ECFDF5`, text `#065F46`, border `1px solid #A7F3D0`.
  - **Upcoming:** Background `#EFF6FF`, text `#1E40AF`, border `1px solid #BFDBFE`.
  - **Skipped:** Background `#F1F5F9`, text `#475569`, border `1px solid #CBD5E1`.
  - **Missed / Refill Alert:** Background `#FEF2F2`, text `#991B1B`, border `1px solid #FECACA`.

### Medication Dose Card
- Container: Surface `#FFFFFF`, border `1px solid #E2E8F0`, corner radius `1rem` (16px), padding `1.25rem`.
- Left-accent micro-bar indicating status category.
- Header: Pill name (`headline-sm`, `#0F172A`) paired with dosage strength (e.g., "500 mg - 1 tablet", `body-sm`, `#64748B`).
- Footer: Quick-action "Take" circular button with affirmative feedback animation, accompanied by instructions ("Take with food").

### Form Fields & Inputs
- Height `44px`, background `#FFFFFF`, border `1px solid #CBD5E1`, border-radius `0.5rem`.
- Focus state: Border transitions to `#0D9488` with a 3px outer glow ring of `rgba(13, 148, 136, 0.15)`.
- Helper labels sit outside the input in `label-md` weight.

### Checkboxes & Segmented Controls
- Checkbox: `20x20px`, border `1.5px solid #94A3B8`, radius `6px`. Checked state fills `#0D9488` with a crisp white checkmark icon.
- Segmented Schedule Tabs (Morning, Afternoon, Evening, Night): Contained inside a `#F1F5F9` tray, active segment slides into place with `#FFFFFF` background, subtle elevation tier 1, and `#0F172A` bold text.