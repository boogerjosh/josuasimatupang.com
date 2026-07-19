# 002 — Add global prefers-reduced-motion layer

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`index.css`), ~25 lines added

## Problem

The codebase has zero `prefers-reduced-motion` handling (grep returns no matches). Movement-based animations run at full intensity for users who requested reduced motion — including:

- `html { scroll-behavior: smooth; }` at `src/index.css:144-146`
- Project card hover lift at `Projects.tsx:148` (`hover:-translate-y-1`)
- Dialog enter/exit via `tailwindcss-animate` on `Projects.tsx` gallery modals
- Experience chevron rotation (after plan 001, panel grid animation)

Reduced motion means fewer and gentler animations, **not zero** — opacity and color feedback should remain.

## Target

Add a global reduced-motion block in `src/index.css` after the `html { scroll-behavior: smooth; }` rule:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Then add **targeted overrides** in `@layer utilities` so comprehension-aiding feedback survives:

```css
@layer utilities {
  @media (prefers-reduced-motion: reduce) {
    .motion-reduce-safe-opacity {
      transition: opacity 200ms ease !important;
    }
    .motion-reduce-safe-colors {
      transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease !important;
    }
  }
}
```

Apply `motion-reduce-safe-opacity` to elements that should keep hover opacity feedback:
- `Navbar.tsx:59,71` nav buttons
- `Hero.tsx:73,82,91,100` CTA and social links

Apply `motion-reduce-safe-colors` to:
- `Contact.tsx:24` Say Hello button
- `Projects.tsx:148` card border/background hover (after plan 003 removes translate)

Do **not** restore transform transitions under reduced motion.

Optional: add `@media (hover: hover) and (pointer: fine)` gating for hover transforms in plan 003 — this plan focuses on reduced motion only.

## Repo conventions to follow

- Global base styles live in `src/index.css` under `@layer base` and `@layer components`.
- Tailwind `@apply` is used in base layer (see `body` at line 140-142).
- New utility classes belong in `@layer utilities` at the end of `index.css`.

## Steps

1. Open `src/index.css`.
2. After the `html { scroll-behavior: smooth; }` block (line 144-146), insert the global `@media (prefers-reduced-motion: reduce)` block from **Target**.
3. At the end of the file, add `@layer utilities` with `motion-reduce-safe-opacity` and `motion-reduce-safe-colors` classes.
4. Open `src/components/Navbar.tsx`. Add `motion-reduce-safe-opacity` to the logo button (line 59) and each nav button (line 71).
5. Open `src/components/sections/Hero.tsx`. Add `motion-reduce-safe-opacity` to the CTA button (line 73) and the three social links (lines 82, 91, 100).
6. Open `src/components/sections/Contact.tsx`. Add `motion-reduce-safe-colors` to the Say Hello anchor (line 24).
7. If plan 003 is already applied, add `motion-reduce-safe-colors` to project card `article` at `Projects.tsx:148`. If plan 003 is not yet applied, note in PR that 003 should add this class.

## Boundaries

- Do NOT remove all transitions globally without the targeted override classes above.
- Do NOT modify `tailwindcss-animate` plugin source or `node_modules`.
- Do NOT add JavaScript `useReducedMotion` hooks in this plan — CSS-only.
- Do NOT change dialog markup; the global animation-duration override handles enter/exit.

## Verification

- **Mechanical**: `npm run lint` and `npm run build` exit 0.
- **Feel check**:
  - DevTools → Rendering → `prefers-reduced-motion: on`
  - Scroll via navbar → instant jump, no smooth scroll
  - Open project gallery dialog → appears nearly instantly (no zoom/slide)
  - Hover Hero CTA → opacity still shifts gently (~200ms)
  - Hover Contact button → background color still shifts
  - Toggle Experience accordion (with plan 001) → panel snaps, no height animation
  - Turn reduced motion **off** → smooth scroll and dialog animations return
- **Done when**: Global movement is suppressed; opacity/color hover feedback remains on marked elements.
