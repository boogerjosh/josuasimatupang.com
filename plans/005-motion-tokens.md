# 005 — Introduce shared motion tokens

- **Status**: DONE
- **Commit**: dce2770
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files (`index.css`, `tailwind.config.ts`), ~20 lines

## Problem

Motion values are scattered with no shared source of truth:

- `tailwind.config.ts:81-82` — accordion uses bare `ease-out`
- `Experience.tsx:178,229` — `duration-300`, `duration-200` ad hoc
- `sheet.tsx:32` — `ease-in-out`, `duration-500` inline in shadcn stock (out of scope to refactor)
- No `--ease-out`, `--ease-in-out`, or duration tokens in `src/index.css`

Plans 001–004 reference `cubic-bezier(0.23, 1, 0.32, 1)` — without tokens, each file hardcodes or approximates.

## Target

Add to `:root` in `src/index.css` (inside existing `@layer base { :root { … } }`, after `--radius`):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
--duration-ui-fast: 160ms;
--duration-ui: 250ms;
--duration-ui-slow: 300ms;
```

Mirror the three easing vars into `.dark { … }` block (same values — easing is theme-independent).

Extend `tailwind.config.ts` under `theme.extend`:

```ts
transitionTimingFunction: {
  "ease-out-strong": "var(--ease-out)",
  "ease-in-out-strong": "var(--ease-in-out)",
  "ease-drawer": "var(--ease-drawer)",
},
transitionDuration: {
  "ui-fast": "var(--duration-ui-fast)",
  ui: "var(--duration-ui)",
  "ui-slow": "var(--duration-ui-slow)",
},
```

Update accordion animation to use token:

```ts
"accordion-down": "accordion-down var(--duration-ui-fast) var(--ease-out)",
"accordion-up": "accordion-up var(--duration-ui-fast) var(--ease-out)",
```

(Keep 200ms feel — `--duration-ui-fast` is 160ms; for accordion use `"var(--duration-ui)"` (`250ms`) or add `--duration-accordion: 200ms`. Use:

```css
--duration-accordion: 200ms;
```

and `"accordion-down": "accordion-down var(--duration-accordion) var(--ease-out)"`.)

Exact token set:

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| `--duration-ui-fast` | `160ms` |
| `--duration-ui` | `250ms` |
| `--duration-ui-slow` | `300ms` |
| `--duration-accordion` | `200ms` |

After tokens land, optionally update `Experience.tsx` (if plan 001 done) to use `duration-ui ease-out-strong` instead of arbitrary values — **only if plans 001–004 already applied**; otherwise leave a comment in PR.

## Repo conventions to follow

- Design tokens live as CSS custom properties in `src/index.css` `:root` / `.dark` (see `--primary`, `--radius` at lines 18-37).
- Tailwind reads tokens via `var(--token)` in `tailwind.config.ts` (see `colors.border: "hsl(var(--border))"`).
- Do not create a separate `tokens.css` file — keep single `index.css` pattern.

## Steps

1. Open `src/index.css`. Inside `:root`, after `--radius: 0.5rem;`, add all motion tokens from **Target**.
2. Inside `.dark`, duplicate the same motion token lines (values identical).
3. Open `tailwind.config.ts`. Inside `theme.extend`, add `transitionTimingFunction` and `transitionDuration` objects from **Target**.
4. Update `animation["accordion-down"]` and `animation["accordion-up"]` to use `var(--duration-accordion) var(--ease-out)`.
5. Run `npm run build` to confirm Tailwind accepts new utilities (`duration-ui`, `ease-out-strong`, etc.).

## Boundaries

- Do NOT refactor every component in the repo to use new tokens — scope is token definition + accordion config only.
- Do NOT change `sheet.tsx`, `dialog.tsx`, or other shadcn stock files in this plan.
- Do NOT add npm dependencies.
- If another plan (001–004) is in progress on the same branch, avoid merge conflicts — execute this plan **first** (see README order).

## Verification

- **Mechanical**: `npm run build` exit 0; inspect generated CSS contains `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- **Feel check**:
  - Accordion in shadcn Storybook/demo if available — otherwise skip; homepage Experience uses custom accordion (plan 001).
  - In browser devtools, inspect `:root` computed styles — all seven motion vars present in light and dark mode.
  - Spot-check: `ease-out-strong` class resolves to `cubic-bezier(0.23, 1, 0.32, 1)` in computed styles on a test element.
- **Done when**: Tokens exist in CSS and Tailwind; accordion keyframes reference `var(--ease-out)`.
