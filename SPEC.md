# Cardiau Cymraeg — Specification

A responsive Welsh-language flashcard application for practising translation from
English into Welsh.

---

## 1. Project Overview

Build a responsive flashcard app for practising **English → Welsh** translation.

- The user is shown an English phrase first and attempts to translate it mentally.
- Tapping or clicking the flashcard reveals the Welsh translation.

The application is organised hierarchically:

```text
Course Stage
  └─ Content Type
       └─ Unit
            └─ Flashcards
```

For example:

```text
Mynediad
  └─ Geiriau
       └─ Uned 1
            └─ English → Welsh flashcards
```

The application must be **data-driven**. The UI must not contain hard-coded course
names, unit names, or flashcards; views are produced by mapping over the supplied
course data. The data structure will evolve later, so components and TypeScript
types should be designed to be easy to extend.

---

## 2. Technology Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Jest
- React Testing Library

Avoid adding state-management libraries unless a genuine need emerges. For the
initial version, React state, route parameters, and data lookup are sufficient.

---

## 3. Core User Journey

The user moves through four main views:

```text
CourseStagePage → CourseContentPage → UnitListPage → FlashcardPage
```

Routes represent the current location, so refreshing a page does not lose the
user's position.

### Route structure

| Route | View |
| --- | --- |
| `/` | Course Stage |
| `/course/:courseId` | Course Content |
| `/course/:courseId/:contentType` | Unit List |
| `/course/:courseId/:contentType/:unitId` | Flashcards |

Example URLs:

```text
/
/course/mynediad
/course/mynediad/words
/course/mynediad/words/uned-1
```

Do not rely exclusively on React Router `location.state` to pass course data
between pages. Route parameters identify the selected data, and the relevant
object is retrieved from the central course dataset. This ensures that refreshing
or directly opening a URL still works.

---

## 4. Data Model

- All significant objects contain stable, unique IDs.
- IDs are URL-safe strings where practical.
- Property names are lowercase and consistent — use `welsh`, not `Welsh`.

### TypeScript types

```ts
export type ContentType = "words" | "units";

/**
 * Singular (required) + plural (optional) forms of a word. Not every
 * vocabulary item has a distinct plural — omit `plural` (don't use `""`).
 */
export interface WordForms {
  singular: string;
  plural?: string;
}

/**
 * A phrase / sentence prompt — one string per side. `register` is optional and
 * phrase-only (never on `WordFlashcard`/`WordForms`): set it only where the
 * course data explicitly establishes the phrase's intended formal/informal
 * register, never inferred from the Welsh wording. When present, the UI shows
 * a small "Formal"/"Informal" indicator regardless of reveal state.
 */
export interface PhraseFlashcard {
  id: string;
  english: string;
  welsh: string;
  register?: "formal" | "informal";
}

/**
 * A vocabulary prompt — `WordForms` per side (e.g. `dog / dogs` → `ci / cŵn`,
 * or just `milk` → `llaeth` when there's no plural). The UI shows the plural
 * and its `/` separator only when `plural` is present.
 */
export interface WordFlashcard {
  id: string;
  english: WordForms;
  welsh: WordForms;
}

/** Narrow with `typeof card.welsh === "string"` (→ PhraseFlashcard). */
export type Flashcard = PhraseFlashcard | WordFlashcard;

export interface Unit {
  id: string;
  unitTitle: string;
  slides: Flashcard[];
}

export interface CourseSection {
  id: string;
  type: ContentType;
  title: string; // display label, e.g. "Geiriau" / "Unedau" — kept free-form
  units: Unit[];
}

export interface CourseStage {
  id: string;
  courseTitle: string;
  courseContent: CourseSection[];
}
```

`"words"` sections hold `WordFlashcard`s; `"units"` sections hold
`PhraseFlashcard`s. Geiriau (words) cards deal with singular/plural word forms;
Unedau (units) cards can optionally carry formal/informal register metadata —
the two concepts are unrelated and never mixed on the same card type.

Terminology can change when the final course data or type is supplied. For now,
this model is the source of truth.

---

## 5. Example Course Data

Create example/mock data that proves the complete application flow works:

```ts
import type { CourseStage } from "../types/course";

export const courses: CourseStage[] = [
  {
    id: "mynediad",
    courseTitle: "Mynediad",
    courseContent: [
      {
        id: "mynediad-words",
        type: "words",
        title: "Geiriau",
        units: [
          {
            id: "uned-1",
            unitTitle: "Uned 1",
            slides: [
              {
                id: "mynediad-words-uned-1-1",
                english: { singular: "dog", plural: "dogs" },
                welsh: { singular: "ci", plural: "cŵn" },
              },
              {
                id: "mynediad-words-uned-1-2",
                english: { singular: "cat", plural: "cats" },
                welsh: { singular: "cath", plural: "cathod" },
              },
            ],
          },
        ],
      },
      {
        id: "mynediad-units",
        type: "units",
        title: "Unedau",
        units: [
          {
            id: "uned-1",
            unitTitle: "Uned 1",
            slides: [
              {
                id: "mynediad-units-uned-1-1",
                english: "Good morning",
                welsh: "Bore da",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sylfaen",
    courseTitle: "Sylfaen",
    courseContent: [
      { id: "sylfaen-words", type: "words", title: "Geiriau", units: [] },
      { id: "sylfaen-units", type: "units", title: "Unedau", units: [] },
    ],
  },
];
```

This is development data only. The architecture must allow the dataset to be
replaced later without rewriting the application components.

---

## 6. Page Requirements

### 6.1 Course Stage Page

- **Route:** `/`
- **Purpose:** Display all available course stages.

The page maps over the `courses` array and renders a selectable card for each
course:

```text
Choose a course

  Mynediad
  Sylfaen
```

Selecting a course navigates to `/course/:courseId` (e.g. `/course/mynediad`).
The destination page uses `courseId` to find the corresponding `CourseStage`.

### 6.2 Course Content Page

- **Route:** `/course/:courseId`
- **Purpose:** Let the user choose which section of the course to practise.

```text
Mynediad

  Geiriau
  Unedau
```

The page maps over `selectedCourse.courseContent`. Do not hard-code buttons for
Geiriau and Unedau — each section is generated from the data.

Selecting a section navigates to `/course/:courseId/:contentType` (e.g.
`/course/mynediad/words`).

Include a **Back** button that returns to `/`.

### 6.3 Unit List Page

- **Route:** `/course/:courseId/:contentType`
- **Purpose:** Display the units belonging to the selected course section.

```text
Geiriau

  Uned 1
  Uned 2
  Uned 3
  ...
```

Each unit is selectable and navigates to
`/course/:courseId/:contentType/:unitId` (e.g. `/course/mynediad/words/uned-1`).

Include a **Back** button that returns to `/course/:courseId`.

### 6.4 Flashcard Page

- **Route:** `/course/:courseId/:contentType/:unitId`
- **Purpose:** Practise English → Welsh translations.

Retrieve the appropriate unit from the course data using `courseId`,
`contentType`, and `unitId`. The unit contains `slides: Flashcard[]`. Each
flashcard has an `id`, plus an `english` and a `welsh` side: for a
`PhraseFlashcard` both are strings; for a `WordFlashcard` both are `WordForms`
(`{ singular, plural? }`), and the card shows the singular, plus the plural (with
a `/` separator) only when one exists — e.g. `dog / dogs`, revealing `ci / cŵn`;
or, for a word with no plural, just `milk`, revealing just `llaeth`. A
`PhraseFlashcard` may also carry an optional `register: "formal" | "informal"`;
when present, the card shows a small "Formal"/"Informal" indicator regardless of
reveal state — omitted entirely when `register` is absent.

Only one flashcard is active at a time.

**Initial state:**

```text
┌────────────────────────────┐
│                            │
│        How are you?        │
│                            │
│     Tap to reveal Welsh    │
│                            │
└────────────────────────────┘
```

**After tapping/clicking:**

```text
┌────────────────────────────┐
│                            │
│        How are you?        │
│                            │
│        Sut wyt ti?         │
│                            │
└────────────────────────────┘
```

- The Welsh answer must not be visible before the user reveals the card.
- Clicking/tapping the card toggles its revealed state.
- Changing to another card resets the revealed state so the Welsh translation is
  hidden again.

---

## 7. Flashcard Navigation

Provide controls beneath the flashcard for moving through the unit:

```text
← Previous       3 / 12       Next →
```

Requirements:

- **Previous** moves to the previous flashcard; disabled on the first card.
- **Next** moves to the next flashcard; disabled on the final card.
- Display the current flashcard position (e.g. `3 / 12`).
- Moving between cards hides the Welsh answer again.

The flashcard itself remains the primary interaction — the entire visible card is
clickable/tappable rather than requiring a small Reveal button.

Include keyboard accessibility: a focused flashcard is revealable with
<kbd>Enter</kbd> and <kbd>Space</kbd>.

---

## 8. Back Navigation

Every view except the initial course-stage screen includes a clear **Back**
button:

```text
Flashcards      ──Back──▶  Unit List
Unit List       ──Back──▶  Course Content
Course Content  ──Back──▶  Course Stage
```

Prefer explicit parent-route navigation over `navigate(-1)`. This prevents
unexpected behaviour when someone opens a route directly.

---

## 9. Invalid Routes and Missing Data

The application must fail gracefully when route parameters do not match the course
data, for example:

```text
/course/not-a-course
/course/mynediad/not-a-section
/course/mynediad/words/not-a-unit
```

The application must not crash. Show a simple Not Found state with the text
`Content not found` and a link labelled `Back to courses`.

---

## 10. Components

Keep page-level routing components separate from reusable UI components. Suggested
structure (a recommendation, not a strict requirement):

```text
src/
├── components/
│   ├── BackButton/
│   │   ├── BackButton.tsx
│   │   └── BackButton.test.tsx
│   ├── Flashcard/
│   │   ├── Flashcard.tsx
│   │   └── Flashcard.test.tsx
│   ├── FlashcardNavigation/
│   │   ├── FlashcardNavigation.tsx
│   │   └── FlashcardNavigation.test.tsx
│   └── SelectionCard/
│       ├── SelectionCard.tsx
│       └── SelectionCard.test.tsx
├── pages/
│   ├── CourseStagePage.tsx
│   ├── CourseContentPage.tsx
│   ├── UnitListPage.tsx
│   ├── FlashcardPage.tsx
│   └── NotFoundPage.tsx
├── data/
│   └── courses.ts
├── types/
│   └── course.ts
├── utils/
│   └── courseData.ts
├── App.tsx
└── main.tsx
```

Do not over-engineer the application.

---

## 11. Data Lookup Utilities

Keep repeated course-data lookup logic outside page components where useful:

```ts
export const getCourseById = (courses: CourseStage[], courseId: string) => {
  return courses.find((course) => course.id === courseId);
};
```

Additional helpers may include `getCourseSection(...)` and `getUnit(...)`.
Functions should remain small, typed, and testable.

---

## 12. Styling

Use Tailwind CSS. Do not introduce CSS-in-JS libraries.

The visual style should be dark mode by default, modern, clean, minimal,
mobile-first, accessible, and distraction-free.

| Role | Appearance |
| --- | --- |
| Background | Dark charcoal / slate |
| Cards | Slightly lighter dark surface |
| Primary text | Near-white |
| Secondary text | Muted gray |
| Accent | A restrained Welsh-inspired red, or another consistent accent colour |

Example direction:

```tsx
className="min-h-screen bg-slate-950 text-slate-100"
```

Interactive items need clear **hover**, **focus**, **active**, and **disabled**
states. Use sensible spacing and rounded corners, and avoid excessive animations.

---

## 13. Responsive Behaviour

The application should work well on mobile phones, tablets, and desktop browsers,
with **mobile as the primary layout**.

- Content uses a sensible maximum width on larger screens, e.g.
  `max-w-2xl mx-auto`.
- Selection cards/buttons are large enough to tap comfortably on a phone.
- The flashcard occupies a significant portion of the screen without becoming
  unnecessarily wide on desktop.

---

## 14. Accessibility

- Use semantic HTML wherever possible.
- Clickable course/unit choices should use links when they navigate to another
  route.
- The flashcard is keyboard accessible with visible focus styles.
- Do not communicate state using colour alone; the flashcard communicates whether
  it is revealing an answer through accessible text/state.
- Where appropriate, use `aria-label`, `aria-pressed`, or equivalent semantic
  behaviour.
- Ensure text has sufficient contrast against the dark background.

---

## 15. State

Keep application state minimal.

- Course, section, and unit selection are represented by URL route parameters.
- Flashcard-specific local state uses React `useState`:

  ```ts
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  ```

Do not add Redux, Zustand, Context, or another global state system for the
initial implementation unless a genuine need emerges later.

---

## 16. Testing

Use Jest, React Testing Library, and `@testing-library/user-event`. Focus tests
on user-visible behaviour rather than implementation details.

Minimum coverage:

**CourseStagePage**

- All course titles from the data are rendered.
- Selecting a course navigates to the correct course.

**CourseContentPage**

- The selected course title is rendered.
- Its available content sections are rendered.
- Selecting a section navigates correctly.
- The Back button works.

**UnitListPage**

- All unit titles are rendered.
- Selecting a unit navigates correctly.
- The Back button works.

**Flashcard**

- The English text is initially visible.
- The Welsh translation is initially hidden.
- Clicking/tapping reveals the Welsh translation.
- Keyboard activation reveals the Welsh translation.
- Clicking again toggles the answer (if toggle behaviour is retained).

**FlashcardPage**

- The first card is displayed initially.
- Next displays the next card; Previous displays the previous card.
- Moving to another card resets `isRevealed`.
- Previous is disabled on the first card; Next is disabled on the final card.
- The progress indicator is correct.
- The Back button returns to the unit list.

**Invalid data**

- An invalid course ID, content type, or unit ID shows the Not Found UI rather
  than crashing.

---

## 17. Coding Standards

- Use strict TypeScript; avoid `any`.
- Components have clear, single responsibilities.
- Prefer small reusable components over very large page components, but do not
  create abstractions purely for their own sake.
- Use descriptive names — `selectedCourse`, `selectedSection`, `selectedUnit`,
  `currentCard` — over generic names like `data`, `item`, or `thing`.
- Do not duplicate course data inside components.
- Do not mutate the course data.
- Use array methods such as `map` and `find` to derive the UI from the source
  data.

---

## 18. Current MVP Scope

The initial version needs:

1. Course-stage selection.
2. Course-content-type selection.
3. Unit selection.
4. English → Welsh flashcards.
5. Tap/click to reveal Welsh.
6. Previous/Next flashcard navigation.
7. Progress indicator.
8. Back navigation on every nested view.
9. Dark-mode responsive UI.
10. TypeScript data models.
11. Example development data.
12. Routing based on IDs.
13. Graceful Not Found handling.
14. Unit/component tests with Jest and React Testing Library.

Do **not** add authentication, databases, APIs, user profiles, scoring,
gamification, persistence, or a CMS in the first implementation. The architecture
should make those features possible later without requiring them now.

---

## 19. Acceptance Criteria

The MVP is complete when a user can:

```text
Open app
  → Select "Mynediad"
  → Select "Geiriau"
  → Select "Uned 1"
  → See "dog / dogs"
  → Think of the Welsh translation
  → Tap the flashcard
  → See "ci / cŵn"
  → Move to the next flashcard
  → See the next English word with Welsh hidden
```

The user must also be able to navigate backwards through each level, and all
screens must work when accessed through their URLs directly.

---

## 20. Implementation Priorities

When implementing this specification:

1. Set up the React + TypeScript project and dependencies.
2. Configure Tailwind CSS.
3. Define the TypeScript course data model.
4. Add representative mock course data.
5. Configure React Router.
6. Implement the four-level navigation flow.
7. Implement flashcard reveal behaviour.
8. Implement Previous/Next navigation.
9. Implement Back buttons.
10. Add responsive dark-mode styling.
11. Add graceful invalid-route/data handling.
12. Add Jest and React Testing Library tests.
13. Run TypeScript checks, tests, and linting.
14. Fix errors before considering the implementation complete.

Do not prematurely introduce architecture or features outside this specification.

---

## 21. Future Enhancements

Not required for the initial implementation, but the architecture should not
prevent them:

- Randomise/shuffle cards
- Mark cards correct/incorrect
- Track progress
- Repeat incorrect cards
- Save progress locally
- User accounts
- Course completion percentages
- Dark/light theme toggle
- Card animations
- Keyboard shortcuts
- Touch/swipe navigation
- Audio pronunciation
- Multiple acceptable Welsh answers
- Search/filter units
- Course data loaded from an API/database
- Admin/content-management interface

---

## 22. Key Architectural Principle

Treat the supplied course array as application **content**, not application
**logic**.

Adding another course to the data:

```ts
{
  id: "canolradd",
  courseTitle: "Canolradd",
  courseContent: [...]
}
```

should automatically cause it to appear on the course-selection page. Likewise,
adding another section, unit, or flashcard should automatically appear in the
appropriate view without new React components or routes. The application is
data-driven at every level.

---

## 23. Open / Expected Changes

This specification represents the initial application architecture. The real
course data and/or an existing `CourseStage` type may be supplied later. When
that happens:

- Update the data interfaces as necessary.
- Preserve the existing routing hierarchy where possible.
- Adapt data-access functions rather than duplicating or rewriting UI components.
- Do not assume the current mock data is the final course schema.

The core product behaviour should remain:

```text
Course → Content Type → Unit → English/Welsh Flashcards
```
