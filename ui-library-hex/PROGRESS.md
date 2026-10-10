# Progress

Legend: `[ ]` todo · `[~]` in progress · `[x]` done. One line per finished element: path + notes.

Resume protocol: read this file and DECISIONS.md first; continue from the first unfinished item.

Playwright: system Chrome via executablePath (`/usr/bin/google-chrome-stable`).

## Step 1 — Scaffold, tokens, tailwind, lib, ThemeToggle, playground shell  `[x]`
- [x] Repo scaffold (Vite, React 19, TS strict, Tailwind v4) — package.json, vite.config.ts, tsconfig, eslint, vitest
- [x] tokens: primitives, semantic, components, themes/dark, themes/compact — tokens/*.css
- [x] tailwind.css mapping — tailwind.css
- [x] lib: cn, tone, format, errors, types, skin — lib/*.ts(x)
- [x] hooks: use-controllable-state, use-theme — hooks/
- [x] ThemeToggle — ui/theme-toggle — segmented + cycle, controlled/uncontrolled, 3 tests
- [x] Playground shell (sidebar, theme + density switcher) — playground/ — hash router, glob registry, kit.tsx
- [x] CLAUDE.md

## Step 2 — Primitives + core form controls  `[x]`
- [x] Button / IconButton / ButtonGroup — ui/button — 5 variants × 6 tones, loading, asChild, group attached/vertical
- [x] Link — ui/link — external auto-detect, tokenised underline
- [x] Badge — ui/badge — subtle/solid/outline, dot, asChild
- [x] StatusDot — ui/status-dot — pulse, labelled
- [x] Tag / Chip — ui/tag — removable (Backspace), selectable
- [x] Spinner — ui/spinner
- [x] Skeleton — ui/skeleton — line/lines/rect/circle
- [x] Avatar / AvatarGroup — ui/avatar — initials fallback, status, +N
- [x] Card — ui/card — outline/raised/sunken, header/body/footer, asChild
- [x] Separator — ui/separator — labelled
- [x] Kbd — ui/kbd — combos
- [x] VisuallyHidden — ui/visually-hidden
- [x] Heading — ui/heading — size scale has 5 steps (documented deviation)
- [x] Text — ui/text
- [x] Code (inline) — ui/code
- [x] Icon — ui/icon
- [x] Field — ui/field — useFieldControl wires id/aria to controls
- [x] Input — ui/input — prefix/suffix, loading, invalid
- [x] Textarea — ui/textarea — autoResize, counter
- [x] Select — ui/select — grouped, portal container
- [x] Combobox — ui/combobox — cmdk + Popover, async onSearchChange, clearable
- [x] SegmentedControl — ui/segmented-control
- [x] CopyField (+ use-copy) — ui/copy-field + hooks/use-copy
- [x] FileDropzone (+ use-file-drop) — ui/file-dropzone + hooks/use-file-drop
- [x] hook: use-debounce — hooks/use-debounce

## Step 3 — Overlays and feedback  `[x]`
- [x] Dialog — ui/dialog — sizes, hideTitle, controlled, scroll body, portal container
- [x] ConfirmDialog — ui/confirm-dialog — AlertDialog, async confirm w/ loading + error
- [x] Sheet / Drawer — ui/sheet — right/left/bottom/top × sm/md/lg
- [x] Popover — ui/popover
- [x] Tooltip — ui/tooltip — focus+hover, shortcut, disabled
- [x] DropdownMenu — ui/dropdown-menu — data-driven entries (item/checkbox/radio/sub/label/separator); renderMenuEntries shared with ContextMenu
- [x] CommandPalette (+ use-hotkeys) — ui/command-palette + hooks/use-hotkeys
- [x] Toast — ui/toast — sonner unstyled + recipe classNames; Toaster mounted in playground
- [x] Alert / Callout — ui/alert — subtle/outline/callout
- [x] Banner — ui/banner
- [x] Progress — ui/progress — built early in step 2 (FileDropzone needs it)
- [x] Tabs — ui/tabs — underline/pill, counts, controlled

## Step 4 — State blocks  `[x]`
- [x] EmptyState — ui/empty-state
- [x] ErrorState — ui/error-state — normalizeError, retry, showDetail
- [x] AsyncBoundary — ui/async-boundary — error > loading > empty > content; isRefetching dims
- [x] AnimatedNumber — ui/animated-number + hooks/use-animated-number (reduced-motion aware, SR hears final value)
- [x] StatCard — ui/stat-card — delta tone via deltaGood, sparkline slot, loading/error
- [x] Meter — ui/meter — linear/radial, thresholds, cap marker, role=meter
- [x] ValueChange — ui/value-change
- [x] ScoreBreakdown — ui/score-breakdown — devWarn if parts != total (lib/dev.ts)
- [x] DescriptionList — ui/description-list — copyable, link, mono
- [x] List / ListItem — ui/list — link/button/static rows, trailing outside the link, loading/empty
- [x] Timeline — ui/timeline — dot/icon, reverse, loading/empty

## Step 5 — Live and code  `[x]`
- [x] useEventStream — hooks/use-event-stream — SSE, dedupe, resume via last_event_id param, backoff, terminal, mock replay; 10 tests with FakeEventSource
- [x] EventFeed — ui/event-feed — renderers+fallback, groupBy, role=log, auto-scroll that pauses, jump-to-latest, status line, i18n labels
- [x] CodeViewer — ui/code-viewer + hooks/use-highlighted-code — shiki css-variables theme (colors from --shiki-* tokens), highlights, folding, CodeHeader

## Step 6 — Flows  `[x]`
- [x] Stepper / Wizard (+ use-stepper) — ui/stepper + hooks/use-stepper — indicator (horiz/vert), Wizard w/ sync+async validation gate, focus moves to panel
- [x] CountdownTimer (+ use-countdown) — ui/countdown-timer + hooks/use-countdown — wall-clock, pause, phases, SR milestones, onExpire once
- [x] QuestionCard — ui/question-card — text/choice/custom, timer slot, result state w/ choice marking
- [x] RubricResult — ui/rubric-result — 1–5 segments, overall avg, follow-up slot
- [x] ConnectAccountCard — ui/connect-account-card — status badge, sync/disconnect w/ ConfirmDialog

## Step 7 — Layout  `[x]`
- [x] Stack / Grid / Section / Container — layout/stack — density-aware gaps, responsive Grid columns + auto-fit, Section header, Container
- [x] Breadcrumbs — layout/breadcrumbs — maxItems collapse into menu, aria-current
- [x] PageHeader — layout/page-header — h1, meta, actions, tabs slot, breadcrumbs data or node
- [x] SplitView — layout/split-view — drag + keyboard separator, clamp, persistKey, stacks below md
- [x] AppShell (+ use-media-query, use-local-storage) — layout/app-shell + hooks/use-media-query, use-local-storage — rail collapse (persisted), Sheet on mobile, skip link, renderLink/onNavigate
- [x] WorkspaceSwitcher — blocks/workspace-switcher — radio menu, compact, create
- [x] UserMenu — blocks/user-menu — identity, items, theme radio, sign out

## Step 8 — Charts + GraphView  `[x]`
- [x] Sparkline — ui/sparkline — responsive SVG sparkline, areas, points, accessible labels
- [x] LineChart — ui/line-chart — Recharts wrapper, loading/empty/error states
- [x] AreaChart — ui/area-chart — Recharts wrapper, gradients via semantic tokens
- [x] BarChart — ui/bar-chart — grouped/stacked bars, responsive legend and tooltip
- [x] Donut / RadialProgress — ui/donut — tokenised radial visualisation and centre label
- [x] ChartCard — ui/chart-card — title, legend, period slot, async states and data-view slot
- [x] GraphView — ui/graph-view — Cytoscape layout, selection, fit/zoom and minimap controls

## Step 9 — Remaining P controls  `[x]`
- [x] MultiSelect / TagInput — ui/multi-select, ui/tag-input — controlled/uncontrolled values, searchable picker, chip creation/removal, loading/empty/invalid states
- [x] Checkbox — ui/checkbox — checked, indeterminate, disabled and Field wiring
- [x] Switch — ui/switch — labelled setting, descriptions and Field wiring
- [x] RadioGroup — ui/radio-group — data-driven, vertical/horizontal, keyboard-operable options
- [x] Slider / RangeSlider — ui/slider — single/range values, keyboard operation and live value display
- [x] DatePicker — ui/date-picker — react-day-picker popover, Field wiring, bounds and disabled dates
- [x] DateRangePicker — ui/date-range-picker — responsive single/two-month calendar ranges
- [x] SearchInput — ui/search-input — controlled value, debounced search callback, clear and shortcut hint
- [x] FormSection / FormActions — ui/form-layout — grouped fields and optional sticky action bar
- [x] OTP / CodeInput — ui/code-input — paste, Backspace and arrow navigation, completion callback

## Step 10 — Data table and friends  `[ ]`
- [ ] DataTable (+ use-data-table)
- [ ] FilterBar + FacetFilter
- [ ] Pagination
- [ ] ContextMenu
- [ ] HoverCard
- [ ] Accordion / Collapsible

## Step 11 — Viewers and rich content  `[ ]`
- [ ] DiffViewer
- [ ] JSONViewer
- [ ] TreeView
- [ ] Markdown
- [ ] ChatThread
- [ ] Checklist
- [ ] CalendarHeatmap
- [ ] Heatmap

## Step 12 — Complex flows  `[ ]`
- [ ] KanbanBoard
- [ ] CSVImporter
- [ ] VoiceRecorder (+ use-recorder)
- [ ] PermissionMatrix
- [ ] RoleGate / FeatureGate
- [ ] ErrorPage / MaintenancePage
- [ ] NotificationBell + NotificationList
- [ ] InlineEdit

## Step 13 — Entities, marketing, auth  `[ ]`
- [ ] EntityHeader
- [ ] ProfileCard / ShareCard + QRCode
- [ ] PricingTable
- [ ] Percentile
- [ ] Marketing set (Navbar, Hero, FeatureGrid, LogoCloud, Testimonial, FAQ, CTA band, Footer)
- [ ] AuthCard + OAuthButton
- [ ] DocsLayout

## Step 14 — Skin test (skins/alt)  `[ ]`
- [ ] skins/alt tokens + recipes
- [ ] Skin switcher in playground
- [ ] All pages + tests pass under both skins
- [ ] Fix any element needing a .tsx change

## Docs
- [ ] README.md
- [ ] USAGE-PROOFGRAPH.md
- [ ] Final report

## Gate log

- Step 1 gate: tsc, eslint, vitest (3), vite build, shots (4 renders) all pass. Screenshots in .screenshots/1/.
- Step 2 gate: tsc, eslint, vitest (28 files, 88 tests), vite build, shots (104 renders, 0 problems). Screenshots in .screenshots/2/.
- Step 3 gate: tsc, eslint, vitest (40 files, 125 tests), vite build, shots (148 renders, 0 problems). Overlays verified open via scripts/peek.mjs (dialog dark panel, menu, toast, palette).
- Step 4 gate: tsc, eslint, vitest (51 files, 166 tests), vite build, shots (192 renders, 0 problems).
- Step 5 gate: tsc, eslint, vitest (54 files, 194 tests), vite build, shots (200 renders, 0 problems). Live replay verified via peek.
- Step 6 gate: tsc, eslint, vitest (61 files, 237 tests), vite build, shots (220 renders, 0 problems). Viewed stepper (vertical layout bug fixed).
- Step 7 gate: tsc, eslint, vitest (69 files, 275 tests), vite build, shots (248 renders, 0 problems). Viewed AppShell desktop/collapsed/mobile; fixed skip-link leak and Sheet/Dialog hideTitle close button.
- Note: step 7 shots had one transient screenshot timeout; shots.mjs now retries a page once and records harness errors as problems. Re-run clean (248 renders, 0 problems).
- Step 8 gate: tsc, eslint, vitest (75 files, 302 tests), vite build, shots (276 renders, 0 problems).
- Step 9 gate: tsc, eslint, vitest (86 files, 314 tests), vite build, shots (320 renders, 0 problems). Viewed mobile MultiSelect, DateRangePicker and their open popover panels; no overflow or clipping.

## Hex skin (fork) — Phase 1
- [x] Fonts self-hosted: `fonts/` (Archivo, Instrument Serif, IBM Plex Sans/Mono + OFL files), imported by `tailwind.css`; fontsource deps removed
- [x] Tokens: `tokens/skins/hex/primitives.css`, `semantic.css` (light + 2 identical dark blocks, nested scopes)
- [x] Skin registry: `skins/index.ts`, `skins/hex/index.ts`; playground skin switcher (Hex / Default / Warm), hex default
- [x] Recipe overrides (24): button (blush CTA, handles via `data-handles`), heading (display + serif em), badge, card, tabs, statCard, chartCard, segmentedControl, tag, kbd, progress, alert, dataTable, descriptionList, emptyState, stepper, dialog, timeline, pageHeader, appShell, workspaceSwitcher, marketing, authCard, errorPage
- [x] Token-only (inherit the hex look from tokens, no override yet, 86): accordion, animatedNumber, areaChart, asyncBoundary, avatar, banner, barChart, breadcrumbs, calendarHeatmap, chartFrame, chatThread, checkbox, checklist, code, codeInput, codeViewer, combobox, commandPalette, confirmDialog, connectAccountCard, contextMenu, copyField, countdownTimer, csvImporter, datePicker, dateRangePicker, diffViewer, docsLayout, donut, dropdownMenu, entityHeader, errorState, eventFeed, field, fileDropzone, filterBar, formLayout, gates, graphView, heatmap, hoverCard, icon, inlineEdit, input, jsonViewer, kanbanBoard, lineChart, link, list, markdown, meter, multiSelect, notificationList, pagination, percentile, permissionMatrix, popover, pricingTable, profileCard, questionCard, radioGroup, rubricResult, scoreBreakdown, searchInput, select, separator, sheet, skeleton, slider, sparkline, spinner, splitView, stack, statusDot, switch, tagInput, text, textarea, themeToggle, toast, tooltip, treeView, userMenu, valueChange, visuallyHidden, voiceRecorder
- [x] Test harness: `renderUI` honours `SKIN`; `npm run test:hex`; `skins/hex/hex.test.tsx`
- Gate: tsc, eslint clean; vitest 87 files / 316 tests under default, alt and hex; Playwright (1280 + 360, light + dark, console errors + overflow) 336 renders under hex, 0 problems

## Hex skin (fork) — Phase 2: new elements  (group "Hex pieces", playground step 9)
- [x] PaperGrain — ui/paper-grain — fixed overlay or contained, decorative, reads --grain-* tokens
- [x] PageFrame + GuideLine — ui/page-frame — framed column; horizontal/vertical/dashed rules
- [x] Arcs — ui/arcs — concentric hairline backdrop (`arcs-backdrop` utility)
- [x] CropMarks — ui/crop-marks — sm/md/lg, `asChild` (`crop-marks` utility)
- [x] HexBadge — ui/hex-badge — sm/md/lg, decorative unless `label`
- [x] LabelTab — ui/label-tab — AppWindow squares its corner after it
- [x] AppWindow — ui/app-window — app bar (logo, title, actions) / chrome bar (traffic dots, start or centered title) / bare
- [x] Quote — ui/quote — figure/blockquote/figcaption, `<strong>` emphasis
- [x] Composer — ui/composer — box/inline, Enter sends, controlled/uncontrolled, loading/disabled
- [x] Terminal — ui/terminal — focusable `<pre>`, TerminalToken kinds, caret
- [x] DisplayHeading — ui/display-heading — sm/md/lg, `<em>` serif accent
- Tests: 11 new test files (23 tests). Gate: tsc, eslint clean; vitest 98 files / 339 tests under default, alt, hex.

## Hex skin (fork) — Phase 3: animations + Hex page
- [x] Vendored hex-ui 0.8.1 `dist/` (byte-identical) + THIRD_PARTY_LICENSES.md + VENDOR.md + type declarations — `vendor/hex-animations/`
- [x] Default-skin values for the animation tokens (`--hx-waves-*`, `--hx-dots-*`, `--hx-thought-*`, `--hx-check-*`, `--hx-glass-*`) in light and both dark blocks
- [x] Motion elements under `blocks/motion/`: HeroWaves, DotFieldBackground, ThoughtLine, AnimatedCheckbox, GlassPillNav, StaggeredText (+ `use-skin-key`), each with index and test
- [x] Playground: group "Motion" (6 pages, step 10) and the "Hex" page (group "Hex", step 0, top of the sidebar) recreating hex-ui's demo from library elements
- [x] Tooling: `scripts/shot-dev.mjs` (screenshots from the dev server, no build), `scripts/find-overflow.mjs`; eslint ignores `vendor/`
- Gate: tsc, eslint clean; vitest 104 files / 348 tests under default, alt, hex
