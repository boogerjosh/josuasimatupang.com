# 004 — Add press feedback to primary CTAs

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: MEDIUM
- **Category**: Physicality
- **Estimated scope**: 3 files, ~6 className edits

## Problem

Primary interactive elements have hover feedback but no `:active` press state — the interface does not confirm click/tap at the moment of input.

Locations:

**Hero CTA** — `src/components/sections/Hero.tsx:73`:
```tsx
className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-foreground px-5 py-3 text-base text-foreground transition-opacity hover:opacity-70 sm:gap-4 sm:px-8 sm:py-4 sm:text-lg"
```

**Contact CTA** — `src/components/sections/Contact.tsx:24`:
```tsx
className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
```

**Project gallery triggers** — `src/components/sections/Projects.tsx:156` and `:169`:
```tsx
className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
```

**Preview image button** — `Projects.tsx:194`:
```tsx
className="mt-6 block w-full overflow-hidden border border-border/60 bg-background/70 text-left shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-opacity hover:opacity-90"
```

None include `active:scale-[0.97]` or equivalent.

## Target

Add press feedback per AUDIT.md §3:

```css
transform: scale(0.97);
transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
```

Tailwind equivalents on each pressable:

**Hero.tsx:73** — replace `transition-opacity` with:
```
transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] hover:opacity-70
```
Gate hover opacity: add `max-[hover:none]:hover:opacity-100` is awkward in Tailwind v3 — instead wrap hover opacity only:
```
transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:opacity-70
```
If arbitrary media queries fail lint, use:
```
transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] hover:opacity-70
```
and accept opacity hover on touch (less harmful than transform hover).

**Contact.tsx:24**:
```
transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] hover:bg-primary/90 motion-reduce-safe-colors
```

**Projects.tsx:156, :169** (icon buttons):
```
transition-[transform,color,border-color,background-color] duration-150 ease-out active:scale-[0.97] hover:text-foreground
```

**Projects.tsx:194** (preview button):
```
transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] hover:opacity-90
```

Exact press values:
- Scale: `0.97` (range 0.95–0.98 per AUDIT.md)
- Duration: `160ms` — use Tailwind `duration-150` (closest) or arbitrary `duration-[160ms]`
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` — use `ease-out` until plan 005 adds `--ease-out`, then `ease-[var(--ease-out)]`

Reduced motion: global block from plan 002 suppresses transform transitions. Press scale will not animate under reduced motion — acceptable (AUDIT.md §6: drop movement, keep opacity/color).

## Repo conventions to follow

- Buttons in sections use raw `<button>` / `<a>` with Tailwind classes, not always `Button` from shadcn.
- `button.tsx:8` uses `transition-colors` only — do not change the shared Button component in this plan (carousel uses it; modal nav is occasional).
- Match existing `inline-flex items-center justify-center` patterns on project triggers.

## Steps

1. Open `src/components/sections/Hero.tsx`. Update line 73 className per **Target** Hero string.
2. Open `src/components/sections/Contact.tsx`. Update line 24 className per **Target** Contact string.
3. Open `src/components/sections/Projects.tsx`. Update line 156 className (gallery icon button).
4. Update line 169 className (external link icon button) with same press pattern.
5. Update line 194 className (preview image button) with transform + opacity press pattern.
6. Ensure each element has `inline-flex` or `block` — transform applies correctly (preview button is `block`; scale still works).

## Boundaries

- Do NOT modify `src/components/ui/button.tsx`.
- Do NOT add press feedback to Navbar links (opacity-only nav is intentional; frequency during scroll is higher).
- Do NOT add new dependencies.
- Do NOT change click handlers or href values.

## Verification

- **Mechanical**: `npm run lint` and `npm run build` exit 0.
- **Feel check**:
  - Hero "View Projects & Impact" → visible shrink to ~97% on mouse down, releases smoothly on mouse up (~160ms)
  - Contact "Say Hello" → same press shrink + background color hover unchanged
  - Projects arrow buttons + preview image → shrink on press before dialog opens
  - Spam-click Hero CTA → each press retargets from current scale (CSS transition, not keyframes)
  - `prefers-reduced-motion: on` → no scale animation; click still works
  - DevTools 10% playback → only `transform` scales on `:active`, not layout properties
- **Done when**: All four CTA surfaces confirm press with `scale(0.97)` at ~160ms ease-out.
