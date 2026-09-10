# CLAUDE.md

We're building the app described in @SPEC.md. Read that file for genral architectural tasks or to double checck the exact tech stack and application structure.

Keep your replies conise and focus on conveyong the key information. No fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is a **greenfield project**. `SPEC.md` is the authoritative specification for
what to build — read it in full before making changes. It defines the data model,
routing hierarchy, page requirements, styling direction, and MVP scope.

The toolchain is set up (router, Tailwind, Jest) but **no application pages exist
yet**. `src/App.tsx` is a minimal placeholder shell; `README.md` is still stock
template text.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (typechecks app + tests) then vite build
npm run lint     # ESLint (flat config, eslint.config.js)
npm test         # Jest (jsdom); testMatch src/**/*.{test,spec}.{ts,tsx}
npm run preview  # serve the production build
```

Single test: `npm test -- src/App.test.tsx` or `npm test -- -t "renders the app title"`.

## Toolchain notes

- **Tailwind v4** via `@tailwindcss/vite` plugin; entry is `@import 'tailwindcss'`
  in `src/index.css`. No `tailwind.config` file — configure in CSS if needed.
- **Jest** uses `babel-jest` (`babel.config.cjs`, Jest-only — Vite/Oxc ignores it).
  Config: `jest.config.cjs`. Setup: `src/setupTests.ts` (jest-dom matchers).
  CSS imports are stubbed via `test/styleMock.cjs`.
- Test files are excluded from `tsconfig.app.json` and typechecked via
  `tsconfig.test.json` (adds `jest` + `@testing-library/jest-dom` global types).
- `eslint.config.js` has a second block giving test files the Jest globals.

## Architecture (target, per SPEC.md)

The app is **entirely data-driven**. A single `CourseStage[]` array
(`src/data/courses.ts`) is the only content source. Adding a course, section,
unit, or flashcard to that array must surface it in the UI with no new components
or routes. Never hard-code course/unit/flashcard names in components.

Four nested route levels, each identified by a URL param and resolved against the
central dataset (not passed via `location.state`, so deep links and refreshes
work):

| Route                                    | Page              | Resolves                   |
| ---------------------------------------- | ----------------- | -------------------------- |
| `/`                                      | CourseStagePage   | list all courses           |
| `/course/:courseId`                      | CourseContentPage | `getCourseById` → sections |
| `/course/:courseId/:contentType`         | UnitListPage      | section → units            |
| `/course/:courseId/:contentType/:unitId` | FlashcardPage     | unit → `slides`            |

Data-lookup helpers live in `src/utils/courseData.ts` (`getCourseById`,
`getCourseSection`, `getUnit`) — small, typed, testable, used by pages to turn
route params into domain objects. Any lookup miss renders the Not Found state
rather than throwing.

Flashcard behaviour: only local `useState` (`currentCardIndex`, `isRevealed`).
The whole card is the click/Enter/Space target; changing card resets
`isRevealed`. No global state library (Redux/Zustand/Context) for the MVP.

Back navigation uses **explicit parent routes**, not `navigate(-1)`.

Types in `src/types/course.ts` are the source of truth but expected to change
when real course data arrives (see spec sections 4 and 23) — keep UI components
decoupled from schema details so only the types and `courseData.ts` helpers need
updating.

## Conventions

- Strict TypeScript, no `any`. Config enables `noUnusedLocals`,
  `noUnusedParameters`, `erasableSyntaxOnly`, `verbatimModuleSyntax` (use
  `import type` for type-only imports).
- Data property names are lowercase (`welsh`, not `Welsh`).
- Dark-mode-first, mobile-first Tailwind. All interactive elements need visible
  hover/focus/active/disabled states; don't signal state by colour alone.
- Page components (`src/pages/`) stay separate from reusable UI
  (`src/components/`), with co-located `*.test.tsx`.
