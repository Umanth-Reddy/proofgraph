# ProofGraph app (frontend foundation)

Next.js (App Router, TypeScript strict) frontend for ProofGraph, built on the shared UI library with the **hex** skin. It runs entirely locally: no cloud services, no outside font or asset requests.

This is the foundation: the shell, data layer and 12 foundational pages. The core feature pages (skill graph, claims, viva, and so on) are listed in the navigation and render a "Coming soon" page until the backend is final.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000, mock mode
```

| Mode | How | What happens |
|---|---|---|
| **mock** (default) | `NEXT_PUBLIC_API_MODE=mock` or unset | Fixtures with a 300-800 ms delay. Session, read notifications and settings persist in the browser (localStorage). No network. |
| **live** | `NEXT_PUBLIC_API_MODE=live npm run dev` | Calls `/api/*`, which `next.config.ts` rewrites to `http://localhost:8000/*` (the FastAPI backend). Errors are read from FastAPI's `{ "detail": ... }`. |

Copy `.env.example` to `.env.local` to set the mode persistently. The mode is read at build time (`NEXT_PUBLIC_*`), so rebuild after changing it for `npm run build`.

In mock mode, sign in with any role from `/login` (students use GitHub, other roles an email). The sidebar's workspace switcher jumps between roles; it is a demo convenience, switched by `FEATURES.demoWorkspaceSwitcher` in `src/lib/config.ts`.

## Where things are

```
src/
  app/
    (public)/        landing /, /maintenance, /no-access, /dev/ui (dev only)
    (auth)/login/    sign in / create account
    onboarding/      5-step wizard
    (app)/           signed-in area (AppFrame: sidebar, topbar)
      [role]/        /student /college /company /admin  (home) and planned pages
      notifications/ settings/
    not-found.tsx error.tsx    404 and 500
  components/        AppFrame, RoleHome, RoleGate, NoAccess, ComingSoon, SignInForm, Providers
  lib/
    config.ts        PRODUCT_NAME, roles, feature flags, API mode
    api/             schemas.ts (zod), client.ts (live), mock-client.ts, fixtures.ts, errors.ts, index.ts (mode switch)
    queries/         TanStack Query hooks (pages never fetch directly)
    nav/nav-config.ts   navigation per role  <- the structure is final
  ui/                COPY of the UI library (do not edit by hand, see below)
scripts/             sync-ui.sh and the browser checks
```

Rules the code follows: pages never call `fetch` (eslint enforces it outside `src/lib/api/client.ts`); no literal colours (semantic tokens only); every page has loading, empty and error states through `AsyncBoundary`.

**Rename the product** by changing `PRODUCT_NAME` in `src/lib/config.ts`.

## Add a core page later

The navigation already lists every planned page, so adding one never changes the sidebar.

1. Find its entry in `src/lib/nav/nav-config.ts` (for example `student` → `skill-graph`, href `/student/skill-graph`).
2. Create `src/app/(app)/student/skill-graph/page.tsx` with the real page. A concrete route wins over the catch-all `[role]/[...slug]` that renders "Coming soon".
3. Add its schemas to `src/lib/api/schemas.ts`, endpoints to `client.ts` **and** the same functions to `mock-client.ts` (both implement `Api` in `types.ts`, so the compiler checks they match), and a hook in `src/lib/queries/`.
4. `RoleGate` already protects everything under `/[role]`.

A page that is not in the nav config is a real 404.

## The UI library and the hex skin

`src/ui` is a copy of the library fork at `../ui-library-hex` (kept outside this repository; `src/ui` is committed in full, so the app builds without it, and `npm run sync:ui` only works where the fork sits next to the app or `UI_LIBRARY_PATH` points at it) (itself a fork of the original `ui-library`, which is untouched). The library is the source of truth: **fix an element there first, then re-copy** so nothing drifts.

```bash
npm run sync:ui      # copies ui, blocks, layout, hooks, lib, skins, tokens, test, fonts, vendor, tailwind.css
```

The app ships only the hex skin: `<html data-skin="hex">` selects the tokens and `Providers` supplies the hex recipes. Fonts are self-hosted (`src/ui/fonts`). The six hex animations are vendored (`src/ui/vendor/hex-animations`, with their licence file; read `VENDOR.md` there about the Commons Clause and GSAP terms).

## Checks

```bash
npm run typecheck && npm run lint && npm test      # types, lint, unit tests (includes the library's own)
npm run build
npm run check:routes   # every route, light + dark, 1280 + 360 px: console errors, failed requests, overflow
npm run check:shell    # redirects, 403/404, role switch, mobile nav, sign out
npm run check:flows    # onboarding, notifications, settings, /dev/ui hidden in production
npm run check          # all of the above
```

The browser checks start `next start` themselves, so run `npm run build` first. They use system Chrome (`/usr/bin/google-chrome-stable`) and write screenshots to `.screenshots/`.

## Production notes

- `/dev/ui` returns 404 in production builds.
- Endpoint paths in `src/lib/api/client.ts` are provisional until the backend is final.
- Mock auth sets a role directly; it is not security. The live backend must enforce roles.
