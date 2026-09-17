// Domain model for the flashcard app (SPEC.md §4).
//
// Provisional schema (SPEC.md §23): the real Welsh course data / types may replace
// this. Keep it minimal — UI depends only on these types and the helpers in
// ../utils/courseData, nothing deeper.

/** Course-section identifier; also the `:contentType` route param. */
export type ContentType = "words" | "units";

/**
 * Singular (required) + plural (optional) forms of a word. Not every
 * vocabulary item has a distinct plural — omit `plural` rather than using an
 * empty string. The UI shows `singular` alone when `plural` is absent.
 */
export interface WordForms {
  singular: string;
  plural?: string | undefined;
}

/**
 * A phrase / sentence prompt — one string per side. `register` is optional and
 * phrase-only (never on `WordFlashcard`/`WordForms`): most phrases have no
 * formal/informal distinction to record, so it's only set where the course
 * data explicitly establishes the intended register, not inferred from the
 * Welsh wording. When present, the UI shows a small "Formal"/"Informal"
 * indicator regardless of reveal state.
 */
export interface PhraseFlashcard {
  id: string;
  english: string;
  welsh: string;
  register?: "formal" | "informal";
}

/**
 * A vocabulary prompt — `WordForms` per side. Both English forms are shown on
 * the front (e.g. `dog / dogs`, or just `milk` if there's no plural); both
 * Welsh forms are shown on reveal (e.g. `ci / cŵn`, or just `llaeth`).
 */
export interface WordFlashcard {
  id: string;
  english: WordForms;
  welsh: WordForms;
}

/**
 * A single prompt. Discriminate with `typeof card.welsh === 'string'`
 * (→ `PhraseFlashcard`, and `card.english` is then also a string).
 */
export type Flashcard = PhraseFlashcard | WordFlashcard;

/** A group of flashcards practised together. */
export interface Unit {
  id: string;
  unitTitle: string;
  slides: Flashcard[];
}

/** One practisable section of a course (e.g. Geiriau, Unedau). */
export interface CourseSection {
  id: string;
  type: ContentType;
  title: string;
  units: Unit[];
}

/** A top-level course stage (e.g. Mynediad, Sylfaen). */
export interface CourseStage {
  id: string;
  courseTitle: string;
  courseContent: CourseSection[];
}
