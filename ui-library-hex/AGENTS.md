# UI library — rules (condensed from ../ui-library-spec.md §2, §3)

Source of truth: `../ui-library-spec.md`. Re-read the relevant section before each step.

## Architecture (four layers)
1. **Tokens** `tokens/` — primitive (`primitives.css`) → semantic (`semantic.css`, remapped by `themes/*.css`) → component (`components.css`). Components read semantic + component tokens **only**, never primitives.
2. **Behavior** `hooks/` — headless hooks + Radix. No styles.
3. **Styled elements** `ui/`, `blocks/`, `layout/` — every element is **three files**: `element.tsx` (structure, a11y, props, slots), `element.recipe.ts` (ALL class strings, via cva), `index.ts`.
4. **Domain adapters** live in the app (see `examples/proofgraph/`), never in the library.

## The two-file rule
- Structure/behavior in `element.tsx`; look in `element.recipe.ts`. A redesign edits recipes and tokens only.
- No literal colors or px values outside `tokens/` (Tailwind spacing scale and `(--token)` arbitrary values are fine).
- Resolve the recipe with `useRecipe("name", defaultRecipe)` (lib/skin.tsx). With no `SkinProvider` the default recipe is used, so a single copied element still works.
- Register every recipe in `skins/default/index.ts` (one line). Alt skins (`skins/alt/`) override by name with the same shape (typed via `skins/types.ts`).
- Tone: set `data-tone={tone}` on the root; recipes read `--t`, `--t-subtle`, `--t-fg`, `--t-border`, `--t-solid-fg`. Default for solid/accent elements is `data-tone="accent"`.

## Next.js / Server Components
- Any `.tsx` that uses a React hook, context or `useRecipe` starts with `"use client"` (`lib/use-client.test.ts` enforces it). Recipes (`*.recipe.ts`), types and `index.ts` stay directive-free so server code can import them.

## Rules every element follows
1. No domain knowledge, no data fetching.
2. Shared props: `variant`, `size: sm|md|lg`, `tone: neutral|info|success|warning|danger`, `className`, `classNames` (multi-part), `asChild` where sensible.
3. Stateful → `value` / `defaultValue` / `onValueChange` (`useControllableState`).
4. Design loading, empty, error, disabled, invalid states.
5. Keyboard operable, `focus-ring` utility, correct roles/names, live regions, reduced motion.
6. Works at 360 px; tables/code scroll inside their own container.
7. All visible strings are props with English defaults.
8. Header comment lists dependencies; import only React, `lib/*`, `hooks/*`, other library elements, listed packages.
9. A redesign never changes props.

## Per element
Playground page (`playground/pages/<id>.page.tsx`, inside `<ThemeMatrix>`), a vitest test using `renderUI` from `test/utils.tsx`, a line in `skins/default/index.ts`, and a line in `PROGRESS.md`.

## Commands
`npm run dev` · `npm run typecheck` · `npm run lint` · `npm test` · `npm run test:alt` · `npm run build` · `node scripts/shots.mjs --step N` (needs a build first).
