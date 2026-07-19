# 006 — Smooth project gallery carousel scroll

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: LOW
- **Category**: Missed opportunities (Preventing a jarring change)
- **Estimated scope**: 2 files (`carousel.tsx`, optionally `Projects.tsx`), ~15 lines

## Problem

The project screenshot gallery in the modal uses Embla Carousel. Prev/next buttons call `scrollPrev()` / `scrollNext()` with Embla's default scroll behavior — slides snap instantly with no transition when navigating via the arrow buttons.

Evidence at `src/components/ui/carousel.tsx:62-67`:

```tsx
const scrollPrev = React.useCallback(() => {
  api?.scrollPrev();
}, [api]);

const scrollNext = React.useCallback(() => {
  api?.scrollNext();
}, [api]);
```

Used in `src/components/sections/Projects.tsx:102-120` inside `ProjectImageModal`. Users viewing 7 screenshots click arrows occasionally; instant jumps between full-width images feel disconnected from the polished dialog enter animation (`dialog.tsx:39`, 200ms zoom/fade).

## Target

Pass a scroll duration to Embla so programmatic scrolls animate over ~200ms (within UI budget, AUDIT.md §2).

In `carousel.tsx`, update scroll callbacks:

```tsx
const scrollPrev = React.useCallback(() => {
  api?.scrollPrev(true); // jump: false — scroll with animation when supported
}, [api]);

const scrollNext = React.useCallback(() => {
  api?.scrollNext(true);
}, [api]);
```

Embla v8 uses `scrollTo` with options. Verify API: `scrollPrev()` and `scrollNext()` accept no duration by default. The correct approach for Embla 8 is to pass options via carousel `opts` or use:

```tsx
api?.scrollPrev(); // with duration in opts
```

Set default scroll duration in `useEmblaCarousel` options at `carousel.tsx:43-48`:

```tsx
const [carouselRef, api] = useEmblaCarousel(
  {
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
    duration: 20, // Embla duration scale: ~20 ≈ 200ms feel
  },
  plugins,
);
```

Exact values:
- Scroll animation duration: Embla `duration: 20` (maps to ~200ms scroll; tune in feel-check to land 180–250ms)
- Properties animated: Embla moves slides via `transform` on the track — compositor-friendly
- Reduced motion: when `prefers-reduced-motion: reduce`, pass `duration: 0` or skip animation

Add reduced-motion branch in `Carousel` component:

```tsx
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const [carouselRef, api] = useEmblaCarousel(
  {
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
    duration: prefersReducedMotion ? 0 : (opts?.duration ?? 20),
  },
  plugins,
);
```

Prefer reading `matchMedia` once on mount via `useState` + `useEffect` to avoid SSR mismatch, or rely on plan 002 global transition suppression if it affects Embla's internal animation (feel-check both).

Alternative if `duration` in root opts doesn't affect `scrollPrev`/`scrollNext`: call `api.scrollTo(api.selectedScrollSnap() ± 1, true)` with duration in the third argument per Embla 8 docs — executor must confirm against installed `embla-carousel-react@8.6.0` types and adjust to match actual API; do not guess wrong method signatures.

## Repo conventions to follow

- Carousel wraps shadcn `Button` for prev/next (`carousel.tsx:173-214`).
- Project modal uses stock `Carousel` without custom opts (`Projects.tsx:102`).
- Do not add Framer Motion; Embla handles slide physics.
- Easing: Embla default easing for scroll is acceptable; no custom curve required unless feel-check shows linear snap.

Exemplar for occasional modal motion: `dialog.tsx:39` uses `duration-200` with `zoom-in-95` / `fade-in-0`.

## Steps

1. Open `src/components/ui/carousel.tsx`.
2. Read `node_modules/embla-carousel/esm/components/Options.d.ts` (or Embla docs) to confirm how `duration` is set for `scrollPrev` / `scrollNext` in v8.6.0.
3. Add `duration: 20` to default `useEmblaCarousel` options (merged with `opts`), unless `opts.duration` is already provided.
4. Add `prefers-reduced-motion` detection: `useEffect` + `matchMedia('(prefers-reduced-motion: reduce)')` setting local state; when true, use `duration: 0`.
5. If root `duration` does not affect button navigation, update `scrollPrev` / `scrollNext` to use the API method that accepts duration explicitly (document the exact call in a code comment).
6. Open `src/components/sections/Projects.tsx` line 102 — only if needed, pass `opts={{ align: "start", loop: ..., duration: 20 }}` explicitly to `Carousel` (prefer fixing defaults in `carousel.tsx` so all carousels benefit).
7. Run build to confirm TypeScript accepts option shape.

## Boundaries

- Do NOT change carousel item layout, loop logic, or dialog markup.
- Do NOT add npm dependencies or Embla plugins unless `duration` option is insufficient (try opts first).
- Do NOT modify drag/swipe physics — only programmatic prev/next scroll.
- Do NOT touch unrelated shadcn components.
- If Embla API differs from this plan at commit `dce2770`, STOP and report the actual API instead of improvising.

## Verification

- **Mechanical**: `npm run lint` and `npm run build` exit 0.
- **Feel check**: `npm run dev` → Projects → open Autobot or HopOn gallery modal.
  - Click Next → slide glides to next screenshot over ~200ms; not an instant snap.
  - Click Previous mid-scroll → retargets smoothly (interruptible).
  - Drag/swipe still works naturally.
  - DevTools → Rendering → `prefers-reduced-motion: on` → arrow clicks snap instantly (`duration: 0`).
  - DevTools Animations 10% playback → confirm track `transform` animates, not `left`/`margin`.
- **Done when**: Arrow navigation in project gallery has visible scroll transition; reduced motion disables it.
