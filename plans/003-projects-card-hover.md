# 003 — Fix project card hover motion

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: MEDIUM
- **Category**: Performance + Purpose & frequency + Accessibility
- **Estimated scope**: 1 file (`Projects.tsx`), 1 line (+ optional `index.css` hover gate)

## Problem

Project cards at `src/components/sections/Projects.tsx:148`:

```tsx
className="group rounded-[28px] border border-border/60 bg-card/72 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/90 hover:bg-card/85"
```

Three issues:

1. **`transition-all`** animates every property change off the compositor (AUDIT.md §5).
2. **`hover:-translate-y-1`** is decorative positional motion on elements browsed tens of times per session — wrong frequency tier (AUDIT.md §1: remove or drastically reduce).
3. **No `@media (hover: hover) and (pointer: fine)`** — touch devices can trigger false hover lifts on tap (AUDIT.md §6).

## Target

Remove vertical lift entirely. Keep subtle border/background feedback only, with explicit transitions:

```tsx
className="group rounded-[28px] border border-border/60 bg-card/72 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[border-color,background-color] duration-200 ease-out motion-reduce-safe-colors hover:border-border/90 hover:bg-card/85"
```

Exact values:
- Properties: `border-color`, `background-color` only
- Duration: `200ms`
- Easing: `ease-out` → `cubic-bezier(0.23, 1, 0.32, 1)` when `--ease-out` token exists (plan 005); until then Tailwind `ease-out` is acceptable
- **No** `transform`, **no** `-translate-y-1`

If you want hover gated to fine pointers only (belt-and-suspenders since transform is removed), add to `index.css`:

```css
@layer components {
  @media (hover: hover) and (pointer: fine) {
    .project-card-interactive:hover {
      border-color: hsl(var(--border) / 0.9);
      background-color: hsl(var(--card) / 0.85);
    }
  }
}
```

Only add this if moving hover styles out of Tailwind — the Target class string above is sufficient without it.

## Repo conventions to follow

- Section components use inline Tailwind on `article` elements (same pattern as `Experience.tsx:178`).
- Hover feedback elsewhere uses opacity or color, not transform (`Hero.tsx:73`, `Navbar.tsx:59`).
- Add `motion-reduce-safe-colors` from plan 002 so hover colors survive reduced motion.

## Steps

1. Open `src/components/sections/Projects.tsx`.
2. Locate the `article` at line 146-148.
3. Replace the `className` on line 148 with the **Target** string: remove `transition-all duration-300 hover:-translate-y-1`, add explicit `transition-[border-color,background-color] duration-200 ease-out motion-reduce-safe-colors`.
4. Confirm no other `hover:-translate` or `transition-all` remains on project card child elements in this file (lines 154-206 are fine — they use `transition-colors` or `transition-opacity`).

## Boundaries

- Do NOT add replacement transform animations (scale, translate, etc.).
- Do NOT change project data, dialog, or carousel behavior.
- Do NOT modify `Dialog` or `DialogContent` in this plan.
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `npm run lint` and `npm run build` exit 0.
- **Feel check**:
  - Desktop: hover project cards → border/background shift subtly over ~200ms; **no vertical movement**
  - Mobile device or DevTools touch emulation: tap card → no stuck "lifted" state
  - `prefers-reduced-motion: on` → hover color feedback still works via `motion-reduce-safe-colors`
  - Performance panel: confirm no layout thrash on hover (only composite-friendly properties)
- **Done when**: Cards feel stable and crisp; no `transition-all`; no translate on hover.
