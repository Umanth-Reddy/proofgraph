# Claude Code prompt: Hex skin + ProofGraph foundation

Before pasting, replace the three placeholders:
- `</home/ureddy/Desktop/projects/libraries/edufront/ui-library/>`: the React library Claude Code built (the folder with ui-library-spec.md, PROGRESS.md, skins/)
- `</home/ureddy/Desktop/projects/libraries/edufront/hex/hex-ui-repo/>`: your local hex-ui repo
- `<https://hex.tech/>`: the website whose style you want

Run it from the parent folder that holds both repos, and allow Bash and edits before you leave, as last time.

---

```text
GOAL
Give our React UI library a new default look taken from hex-ui and the reference website, then scaffold the ProofGraph frontend app on it with a foundational set of pages. The core feature pages come later, once the backend is final. Work autonomously: never stop to ask. When something is ambiguous, choose what best fits the rules below, log it in DECISIONS.md, and continue. Track every item in PROGRESS.md and resume from it after any context reset.

INPUTS
- UI library: <UI_LIBRARY_PATH>. Read its README.md, CLAUDE.md, ui-library-spec.md, PROGRESS.md and DECISIONS.md first. Its architecture is the law: four layers, element.tsx + element.recipe.ts, components read semantic tokens only, skins swap recipes and tokens without touching .tsx.
- Style source: <HEX_UI_PATH>. Read README.md, CLAUDE.md, src/tokens.css, src/elements.css, docs/react-port-prompt.md, and open demo/index.html plus demo/previews/*.png. This is the visual truth: palette, fonts (self-hosted in src/fonts), paper grain, frame and guide lines, crop marks, buttons with selection handles, serif-accent display type, window chrome, chart cards, KPI cards, and the prebuilt animations in dist/.
- Reference site: <STYLE_SITE_URL>. If you can fetch it, study its layout rhythm, spacing, section patterns and motion. If you can't, rely on hex-ui and its previews. Take the style only: never copy its logo, name, wording, images or illustrations. Everything user-facing says ProofGraph.

PHASE A: "hex" skin for the library
A1. Tokens: add tokens/skins/hex/ that maps hex-ui's --hx-p-* primitives and --hx-* semantic roles onto the library's semantic token names. Add a semantic token only where none fits, and give it light and both dark-block values. Copy the fonts into the library and self-host them; no outside font requests.
A2. Recipes: write a hex recipe for EVERY element in the library, not just the 30 in hex-ui's table. For elements hex-ui doesn't show (DataTable, Dialog, DatePicker, Kanban, etc.), extrapolate from its language: hairline borders, paper/ink surfaces, the violet accent, blush primary CTA, mono for data, restrained radius, guide-line framing. Structure (.tsx) must not change; if an element can't be restyled from its recipe alone, fix the element so it can, and log it.
A3. New elements: hex-ui pieces with no library equivalent become new library elements in the two-file pattern, with playground pages: PaperGrain, PageFrame + GuideLines, Arcs backdrop, CropMarks, HexBadge, LabelTab, AppWindow (with window bar), Quote, Composer, Terminal, DisplayHeading with serif accent.
A4. Animations: wrap hex-ui's prebuilt animations (HeroWaves, DotFieldBackground, HxThoughtLine, HxCheckbox, HxPillNav, StaggeredText) as optional library elements under blocks/motion/. Import from hex-ui's dist, keep its licences file, respect reduced motion, and don't edit hex-ui's dist by hand.
A5. Make hex the default skin; keep the old default and alt skins working. Playground: add a "Hex" page that recreates hex-ui's demo/index.html with library elements, and keep the skin switcher.
A6. Gate: tsc, eslint, vitest and build pass under all skins. Run the Playwright check (console errors, horizontal overflow at 1280 and 360, light and dark) on every playground page; view screenshots for the Hex page, overlays, charts, DataTable and any element whose recipe changed a lot, and fix what looks wrong.

PHASE B: ProofGraph app, foundational pages
Stack: Next.js App Router + TypeScript strict, importing the library (copy it into src/ui or link it, whichever keeps "copy the folder" working; log the choice). Hex skin by default with a theme toggle (system/light/dark). Everything runs locally: frontend on port 3000, a rewrite from /api/* to http://localhost:8000/*, and no cloud services.

B1. Data layer (no real endpoints yet): src/lib/api/ with schemas.ts (zod), client.ts (the only file that calls fetch), mock-client.ts (same functions, fixtures, 300–800 ms delay), index.ts switching on NEXT_PUBLIC_API_MODE=mock|live, and errors.ts reading FastAPI's {detail}. TanStack Query hooks in src/lib/queries/. Pages never fetch directly. Only define what the foundational pages need (session, current user and role, notifications, settings); leave the core domain schemas for later.

B2. Route groups and shell: (public), (auth), and (app) with /student, /college, /company and /admin. One AppShell with a sidebar driven by a nav config per role and a WorkspaceSwitcher to jump between roles (demo convenience, flagged in config). The nav already lists the future core pages, each pointing to a shared "Coming soon" template, so the structure is final and only page bodies are added later.

B3. Foundational pages (12, plus a dev page):
 1. Landing (/): hero with HeroWaves or DotField and StaggeredText, the problem, how it works (claims → evidence → viva), the three audiences, a CTA. Built from the library's marketing elements, in hex style.
 2. Sign in / Sign up (/login): one page with tabs; GitHub button for students, email for others; mock auth sets a role.
 3. Onboarding (/onboarding): Stepper wizard shell (choose role → connect accounts → upload profile → pick target role → done), where steps are placeholders backed by mocks.
 4. Student home (/student)
 5. College home (/college)
 6. Company home (/company)
 7. Admin home (/admin)
    Each home: a PageHeader, a KPI row of StatCards on mock data, a "what's next" panel, and recent activity (Timeline). These are templates the core features will fill.
 8. Notifications (/notifications): list, unread state, mark read, empty state.
 9. Settings (/settings): tabs for Profile, Connected accounts (ConnectAccountCard placeholders), Appearance (theme, density), and Privacy (PermissionMatrix placeholder).
10. Not found (404)
11. No access (403): also used by RoleGate
12. Something went wrong (error boundary / 500), plus a maintenance variant
13. /dev/ui (dev only, hidden in production): links to the library playground and shows the hex skin in context.
 Shared template, not counted: "Coming soon", which names the feature and what it will show.

B4. Every page: loading, empty and error states through AsyncBoundary; works at 360 px; keyboard reachable; both themes; no literal colours; no data fetching outside src/lib.

B5. Gate: tsc, eslint, vitest (at least the data-layer switch, RoleGate and nav config) and next build pass. Playwright visits every route in light and dark at 1280 and 360 and fails on console errors or overflow. View screenshots for the landing page, one role home, onboarding, and settings, and fix what looks wrong.

FINISH
Write the app's README (how to run in mock and live mode, where the pages and the nav config are, how to add a core page later) and the final report in PROGRESS.md: what was built, gates passed, anything skipped and why, and open decisions.

Never create commits. Never delete or modify hex-ui's files; read from it only. If you run low on context, finish the current item, update PROGRESS.md and DECISIONS.md, and continue in the next session.
```
