# 001 — Animate Experience accordion expand/collapse

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: HIGH
- **Category**: Interruptibility (+ Performance, same file)
- **Estimated scope**: 2 files (`Experience.tsx`, `index.css`), ~40 lines changed

## Problem

The Work history accordion chevron rotates over 300ms, but the panel body mounts and unmounts instantly. Users see a spatial inconsistency: the UI signals expansion while content teleports.

At `src/components/sections/Experience.tsx:234-252`, content is conditionally rendered:

```tsx
{isOpen ? (
  <div id={`${item.id}-content`} className="overflow-hidden">
    <div className="px-5 pb-6 sm:px-6">
      ...
    </div>
  </div>
) : null}
```

Toggling rapidly cannot retarget mid-animation because the DOM node is removed.

At `Experience.tsx:178`, the card wrapper uses `transition-all duration-300`, which animates border, background, and box-shadow off the compositor — an unnecessary performance cost on the same interactive surface.

## Target

Always render the content panel. Animate height with CSS grid row transition (interruptible, no keyframes) and opacity on the inner wrapper.

```tsx
{/* card wrapper — explicit transitions, no `all` */}
className={`overflow-hidden rounded-[22px] border transition-[border-color,background-color,box-shadow] duration-300 ease-out ${...}`}

{/* panel — always in DOM */}
<div
  id={`${item.id}-content`}
  className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out motion-reduce:transition-none ${
    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
  }`}
>
  <div className="overflow-hidden">
    <div className="px-5 pb-6 sm:px-6">
      ...
    </div>
  </div>
</div>
```

Exact values:
- Panel height + opacity: `250ms` with `ease-out` → `cubic-bezier(0.23, 1, 0.32, 1)` (via `var(--ease-out)` if plan 005 is done; otherwise inline `ease-out` Tailwind class + custom property from plan 005)
- Chevron: keep existing `transition-transform duration-300`
- Card border/background/shadow: `300ms ease-out`, properties listed explicitly — never `transition-all`
- Reduced motion: panel snaps open/closed (no grid-row animation); opacity may stay instant too. Chevron rotation may remain or snap — prefer snap for consistency under `prefers-reduced-motion: reduce`

Add a small utility in `index.css` if Tailwind arbitrary grid rows are awkward:

```css
@layer components {
  .experience-panel {
    display: grid;
    transition: grid-template-rows 250ms var(--ease-out, ease-out),
                opacity 250ms var(--ease-out, ease-out);
  }
  .experience-panel[data-open="true"] {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .experience-panel[data-open="false"] {
    grid-template-rows: 0fr;
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .experience-panel {
      transition: none;
    }
    .experience-panel[data-open="false"] {
      display: none; /* or visibility:hidden — pick one, keep aria-expanded accurate */
    }
  }
}
```

If using the CSS class approach, set `data-open={isOpen}` on the panel wrapper and remove the conditional `{isOpen ? … : null}`.

## Repo conventions to follow

- Section components use Tailwind utility classes inline (see `Experience.tsx:178-181`, `Projects.tsx:148`).
- Easing for UI entrances should be `ease-out` per `tailwind.config.ts:81` accordion pattern.
- Keep `aria-expanded`, `aria-controls`, and keyboard handler on the trigger row unchanged.
- Do not introduce Framer Motion or new dependencies.

Exemplar for interruptible expand: shadcn `accordion.tsx:43` uses height animation, but prefer grid-row CSS transitions here (AUDIT.md §4) because this is custom toggle logic, not Radix Accordion.

## Steps

1. Open `src/components/sections/Experience.tsx`.
2. On the card wrapper `div` at line 177, replace `transition-all duration-300` with `transition-[border-color,background-color,box-shadow] duration-300 ease-out`.
3. Replace the conditional block at lines 234–252 with an always-rendered panel:
   - Outer: `id={`${item.id}-content`}`, grid container, `data-open={isOpen}` or class toggled by `isOpen`
   - Middle: `overflow-hidden` child (required for grid 0fr/1fr technique)
   - Inner: existing padding/content markup unchanged
4. Add panel transition classes: `grid`, `grid-rows-[0fr]` closed / `grid-rows-[1fr]` open, `opacity-0` closed / `opacity-100` open, `transition-[grid-template-rows,opacity] duration-[250ms] ease-out`.
5. Open `src/index.css`. In `@layer components`, add `.experience-panel` rules from **Target** (optional but recommended for reduced-motion handling). Wire the component to use `experience-panel` + `data-open`.
6. Under `@media (prefers-reduced-motion: reduce)` in the same block, disable panel transitions and hide closed content without animation.
7. Verify chevron at line 229 still uses `transition-transform duration-300` — do not change unless reduced-motion block also snaps it.

## Boundaries

- Do NOT touch `src/components/ui/accordion.tsx` — it is unused on the homepage.
- Do NOT change experience data, timeline rail, or toggle logic (`openId` / `setOpenId`).
- Do NOT add new npm dependencies.
- Do NOT animate `height` directly via keyframes.
- If line numbers drift from commit `dce2770`, locate the conditional `{isOpen ? (` panel and the `transition-all` card wrapper — if absent, STOP and report.

## Verification

- **Mechanical**: Run `npm run lint` and `npm run build` — both exit 0.
- **Feel check**: `npm run dev`, scroll to Work history.
  - Click closed role → body expands smoothly over ~250ms while chevron rotates over ~300ms; no content pop-in.
  - Click open role mid-animation → animation retargets from current height (does not restart from zero).
  - Rapidly toggle two different roles → each panel responds without flash of empty state.
  - DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → panel snaps with no height slide; content still accessible when open.
  - DevTools → Animations panel, 10% playback → confirm only `grid-template-rows`, `opacity`, and `transform` (chevron) animate — not `height`, not `margin`.
- **Done when**: Accordion body and chevron tell the same spatial story; no `transition-all` on the card wrapper; reduced-motion path verified.
