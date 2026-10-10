# Decisions

Ambiguities resolved autonomously, newest last. Format: decision — reason.

## Setup and dependencies
- **TypeScript pinned to 6.0.3, not 7.x** — `typescript-eslint@8.71.1` peers `typescript <6.1`; 7.x would break lint.
- **Exact versions pinned** (`--save-exact`), resolved from npm on 2026-10-09.
- **Extra dev packages beyond the allowed list:** `@testing-library/user-event` (realistic keyboard/pointer tests), `@testing-library/jest-dom` (DOM matchers), `@types/react`, `@types/react-dom`, `@types/node`, `@types/papaparse` (typings), `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `globals` (eslint flat config). `@types/cytoscape` is a deprecated stub and was removed.
- **Approved by the user (kickoff answers):** `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono` (self-hosted fonts, works offline), `qrcode-generator` (QR encoding for ProfileCard/ShareCard), `react-day-picker` (date math), `react-markdown` + `remark-gfm` (safe Markdown), `diff` (line diffing), `papaparse` (CSV edge cases), `cmdk` (command palette). All styled only through tokens/recipes.
- **Browser for Playwright:** system `/usr/bin/google-chrome-stable` via `executablePath`; no browser download.

## Architecture
- **Semantic token names are short roles (`--bg`, `--fg-muted`, `--r-control`), Tailwind utility names carry the spec's names (`bg-bg`, `text-fg-muted`, `rounded-control`, `bg-success-subtle`).** Spec's `--color-bg` cannot be both the semantic var and the Tailwind `@theme inline` var (self-reference). The mapping lives in `tailwind.css`.
- **Tone scoping through CSS:** `[data-tone=…]` in `semantic.css` exposes `--t-*`; elements only emit the attribute, recipes read `--t-*`. Default tone scope is `accent` (not part of the public `Tone` type).
- **Theme selectors also match nested `[data-theme]`/`[data-density]`** so the playground can render light, dark and compact side by side; component tokens are redeclared per scope so density re-resolves.
- **Dark theme duplicates its declarations** under the media query and the attribute selector, exactly as spec §2.
- **Skins:** recipes stay beside elements (`ui/x/x.recipe.ts`); `skins/default/index.ts` collects them by name; `useRecipe(name, fallback)` returns the active skin's override or the default. Alt-skin shape is enforced in `skins/types.ts` (`Partial<typeof defaultSkin>`).
- **Imports are relative** (no path alias) so folders copy into other projects. Interactive elements carry `"use client"`.
- **Shared utilities in `tailwind.css`:** `focus-ring`, `tabular`, `scroll-y` read tokens only.
- **No `src/`:** the library root follows spec §2 literally; the playground is `playground/`.
- **Hash router in the playground** (react-router is not allowed); pages are auto-registered with `import.meta.glob`.
- **Step ordering deviation:** `DropdownMenu` is built in step 3 (UserMenu in step 7 and DataTable in step 10 depend on it); `ContextMenu`, `HoverCard`, `Accordion/Collapsible` stay in step 10 as in the plan table. `Breadcrumbs` is built in step 7 (PageHeader needs it). `OTP/CodeInput` goes in step 9, `InlineEdit` in step 12.
- **Progress built in step 2** (planned for step 3) because FileDropzone shows upload progress with it.
- **Heading `size` has five steps (sm…2xl)**, beyond the shared sm|md|lg, because a type scale needs them; `level` and `size` are independent.
- **Tone scope default is `accent`** for Button/Progress; Badge, Tag, StatusDot default to `neutral`.
- **Overlays portal into the nearest `PortalContainerProvider`** (lib/portal.tsx), falling back to `document.body`; the playground matrix provides one per panel so Select/Popover content inherits that panel's theme/density.
- **FileDropzone owns the upload list as data** (`UploadItem[]`, controlled/uncontrolled); the app starts uploads from `onFilesAdded` and updates `progress`/`status`.
- **DropdownMenu is data-driven** (`items: MenuEntry[]`); `renderMenuEntries` is exported so ContextMenu (step 10) reuses it with Radix ContextMenu primitives; both read the recipe named `dropdownMenu`.
- **Toast = sonner in `unstyled` mode** with class names from `toast.recipe.ts`. Toasts render in sonner's single region, so they use the global theme (not the matrix panel).
- **Overlay motion** keyframes live in `tailwind.css` (`animate-fade-in/out`, `pop-in/out`, `slide-in/out` with `--slide-from`); they use `--dur`/`--dur-fast`, so reduced motion and skins retime them.
- **Dialog/Sheet/ConfirmDialog/CommandPalette pass `aria-describedby={undefined}` when there is no description** to satisfy Radix's accessibility check without hiding a real description.
- **`useHotkeys`** supports single combos (`mod+k`, `ctrl+shift+p`, `/`) only; no key sequences.
- **Skeleton with an empty `label` is decorative** (no status role) so composite loading states (List, Timeline, StatCard) announce "Loading" once.
- **`lib/dev.ts` `devWarn`** works under Vite (`import.meta.env.DEV`) and webpack/Next (`process.env.NODE_ENV`); used by ScoreBreakdown.
- **Meter radial stroke width is a component token** (`--meter-radial-stroke`, unitless SVG units); linear heights are `--meter-linear-height-*`.
- **List trailing actions sit beside, not inside, the row link/button** to avoid nested interactive elements.
- **Syntax colors via shiki's CSS-variables theme** (`createCssVariablesTheme`): tokens carry `var(--shiki-token-*)`, defined in `tokens/semantic.css` and remapped in `tokens/themes/dark.css`; no bundled theme colors. Shiki loads lazily (dynamic import) on first highlighted render.
- **useEventStream resume:** native EventSource cannot set `Last-Event-ID`; the browser's own retries still send it, and hook-initiated reconnects append the last id as `?last_event_id=` (configurable, `resumeParam: false` disables).
- **EventFeed event type** defaults to `event.type ?? event.event_type`; override with `getType`.
- **Code viewer row numbers are `aria-hidden`**; highlighted ranges announce a screen-reader label at their first line (color is not the only signal).
- **Flows:** `useCountdown` guards `onExpire` to fire once (queued ticks); `CountdownTimer` announces only milestones/expiry through a polite live region (the digits are `role="timer"`, not live). `Wizard` validation returns `true | false | string` (string = message shown in an Alert).
- **QuestionCard choice mode uses Radix RadioGroup directly** (the standalone RadioGroup element arrives in step 9). Custom mode is the slot for VoiceRecorder.
- **ConnectAccountCard maps connection status → tone internally** (generic connection states, not domain statuses); icons: lucide 1.x has no brand icons, so apps pass their own.
- **Layout folders:** spacing helpers, Breadcrumbs, PageHeader, SplitView and AppShell live in `layout/`; WorkspaceSwitcher and UserMenu (composites) in `blocks/`. Recipe registration paths in `skins/default` follow.
- **Breadcrumbs collapse by item count (`maxItems`), not measured width**; long labels truncate with CSS. Measuring would need ResizeObserver and re-layout flicker for little gain.
- **AppShell `contained` prop** fills its parent's height (for embedding/demos); the default is full viewport. Mobile navigation is a Sheet below `lg`; `useMediaQuery` closes it when the viewport grows.
- **Dialog/Sheet `hideTitle`** now hides only the title text; the close button stays visible (top-right) so a titleless mobile nav can still be closed.
- **Skip-to-content link uses `sr-only` + `focus:not-sr-only`** rather than an off-screen transform (the transform leaked into neighbouring elements).

## Hex skin (fork `ui-library-hex`, started 2026-10-10)
- **Skin selector:** `<html data-skin="hex">`; recipes via `<SkinProvider skin={skins.hex}>` (`skins/index.ts` maps name → recipes). The default and alt skins are untouched. Playground default is now hex (switcher: Hex / Default / Warm); the store stores "default" explicitly so a stored choice survives.
- **Tokens:** `tokens/skins/hex/primitives.css` (hex-ui palette as `--hx-p-*`, plus two extrapolated amber hues for warning) and `semantic.css` (maps onto the library's existing semantic names). `semantic.css` was generated from one light list and one dark list, so the two dark blocks (OS preference and `data-theme="dark"`) are identical by construction. Selectors out-specify the default dark theme, and nested `[data-theme]` wrappers still re-resolve.
- **New semantic roles** (hex only, light + both dark blocks): `--border-ink`, `--cta-*` (blush CTA), `--handle-*` (selection handles), `--guide`/`--guide-dash`, `--badge-*` (hexagon badge), `--traffic`, `--grain-*`, `--font-display`, `--font-serif`. Animation tokens keep hex-ui's own `--hx-*` names (`--hx-waves-*`, `--hx-dots-*`, `--hx-thought-*`, `--hx-check-*`, `--hx-glass-*`) because the prebuilt animations read them by name.
- **fg-subtle** uses ink-500, not hex-ui's ink-400, for readable contrast on paper; hex's ink-400 is kept for disabled text and code comments.
- **Warning** has no hex-ui equivalent: amber-600/400 added and marked "ext" in the primitives.
- **Fonts:** hex-ui's four families (Archivo, Instrument Serif, IBM Plex Sans 400–700, IBM Plex Mono 400/500) are self-hosted in `fonts/` with their OFL licences and imported from `tailwind.css`, so any app importing `tailwind.css` gets them. The `@fontsource/ibm-plex-*` dependencies and imports were removed (same families, same licence), which also makes the default skin self-contained.
- **Recipes:** the hex look is mostly token-driven. Overrides in `skins/hex/index.ts` exist where tokens cannot express hex: blush CTA button with ink hairline (accent tone only; other tones stay flat), display-type headings with serif `<em>` accent, mono captions (badge, tag, kbd, table heads, KPI labels, sidebar section labels, timestamps), hexagon silhouettes (empty-state icon, workspace logo), hairline cards, KPI display numerals. Every override keeps the default recipe's variant keys and part names (enforced by `satisfies Skin`). Elements not listed there inherit the hex look through tokens only (see PROGRESS.md for the list).
- **Selection handles** are opt-in via `data-handles` on a Button (CSS utility `selection-handles` in `tailwind.css`, reading `--handle-*`). No prop change; the attribute passes through `...rest`.
- **Component tokens under hex:** control heights 28/38/46, card padding 18, badge radius = chip radius. Declared on the `data-skin` element only; a nested `[data-density]` wrapper re-declares the library defaults (matrix demos on the Density page keep library sizes).
- **Test harness fix:** `npm run test:alt` set `SKIN=alt` but nothing read it, so it ran the default skin. `renderUI` now picks the skin from `SKIN`; added `npm run test:hex`.

## Hex skin — Phase 2 (new elements)
- **New roles get default-skin values.** The new elements work under every skin, so `--border-ink`, `--guide`, `--guide-dash`, `--badge-*`, `--handle-*`, `--traffic`, `--grain-*`, `--grain-image`, `--font-display` and `--font-serif` are defined in `tokens/semantic.css` (light) and both dark blocks of `tokens/themes/dark.css`. The hex skin overrides them. Font families `--font-archivo` / `--font-instrument` moved from the hex primitives to the shared `tokens/primitives.css`.
- **Gradient-heavy decoration lives in `tailwind.css` utilities** (`arcs-backdrop`, `crop-marks`, `selection-handles`), like `focus-ring`: they read tokens only and keep recipes readable.
- **Tailwind only generates classes it can read literally.** A class built by string interpolation in a recipe is silently dropped (HexBadge rendered as a rectangle until its `before:`/`after:` clip-path classes were written out). Rule for recipes: write full class names; interpolating a complete class (`${hexagon}` = `[clip-path:…]`) is safe, interpolating a variant prefix is not.
- **PaperGrain is an overlay** (z-40 fixed, or absolute when contained) rather than hex-ui's `body::before` at z-index -1: a negative z-index layer hides behind the body background unless the body is an isolated stacking context, which a component cannot assume.
- **Composer** sends on Enter (Shift+Enter for a line), trims, clears itself when uncontrolled, and blocks sending while empty, loading or disabled. Its send button is a neutral solid IconButton.
- **Terminal** is a focusable `<pre>` (long lines scroll by keyboard). Token colours map to existing roles (value → success-fg, url → info-fg) instead of adding terminal-specific tokens.
- **AppWindow** is one element with props (`chrome`, `titleAlign`, `bare`, `logo`, `actions`) rather than a bar/body family; it is a `role="group"` named by its string title.
- **DisplayHeading** is separate from Heading: larger sizes, extra-bold, balanced wrapping. Under the default skin `--font-display` is the UI font, so it degrades to a bold sans with a serif italic accent.

## Hex skin — Phase 3 (animations)
- **Vendored, not linked.** hex-ui's `dist/` is copied byte-for-byte into `vendor/hex-animations/` (with its licence file) so the library stays a copyable folder and never edits hex-ui. Updating means re-copying `dist/`. Type declarations (`dist/*.d.ts`) are ours and are labelled as such in `VENDOR.md`.
- **Licences to remember:** the React Bits components inside are MIT + Commons Clause (do not resell the components themselves); GSAP is under its "no charge" standard licence (not for products that compete with Webflow's animation tools); ogl is public domain; motion and Hugeicons are MIT. StaggeredText is hex-ui's own implementation, not React Bits Pro source.
- **Names:** wrappers use library-style names (`GlassPillNav`, `AnimatedCheckbox`, `ThoughtLine`) instead of hex-ui's `Hx*`; `HeroWaves`, `DotFieldBackground` and `StaggeredText` keep theirs. They live under `blocks/motion/` as optional elements: an app that never imports them ships none of the WebGL/gsap/motion code.
- **No recipes for motion elements.** Their look is the vendored CSS plus tokens (hex-ui's own rule: colours as `--hx-*` tokens). They therefore have no `useRecipe` line in the skin registry; a skin retunes them through tokens only.
- **Tokens:** the animations read `--hx-*` names from `<html>`, so those names are kept as-is and defined for every skin (default values in `tokens/semantic.css` + both dark blocks; hex values in `tokens/skins/hex/semantic.css`). Wave colours are literal hex strings because the WebGL code cannot parse `var()`.
- **Skin switching:** hex's theme hook watches `data-theme` and `class`, not `data-skin`. Every wrapper remounts on a `data-skin` change via `useSkinKey` (a `useSyncExternalStore` over a MutationObserver). Nested theme scopes do not apply: the animations read the document root, so Motion pages have no ThemeMatrix and follow the global controls.
- **Decorative by default:** HeroWaves and DotFieldBackground render `aria-hidden` and fill the positioned parent; reduced motion is handled inside hex's wrappers (waves speed 0, dots static). GlassPillNav keeps hex's keyboard focus and `aria-current`.
- **Checklists only:** AnimatedCheckbox documents that settings toggles stay on Switch (a toggle is not a task and should not strike through its label).
- **Hex page** uses ProofGraph sample content (concepts, claims, evidence), not hex's wording or "Brand" placeholder. Pieces without a library equivalent (rail, chat bubbles, Slack messages) are composed from existing elements and Tailwind classes in the page only; none were added to the library.
- **Playwright and WebGL:** headless Chrome renders the waves through SwiftShader (`--use-gl=swiftshader`), which is only needed for screenshots.
