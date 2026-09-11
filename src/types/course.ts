// Domain model for the flashcard app (SPEC.md §4).
//
// Provisional schema (SPEC.md §23): the real Welsh course data / types may replace
// this. Keep it minimal — UI depends only on these types and the helpers in
// ../utils/courseData, nothing deeper.

/** Course-section identifier; also the `:contentType` route param. */
export type ContentType = 'words' | 'units'

/** Singular + plural forms of a word. */
export interface WordForms {
  singular: string
  plural: string
}

/** A phrase / sentence prompt — one string per side. */
export interface PhraseFlashcard {
  id: string
  english: string
  welsh: string
}

/**
 * A vocabulary prompt — singular + plural per side. Both English forms are shown
 * on the front (e.g. `dog / dogs`); both Welsh forms are shown on reveal
 * (e.g. `ci / cŵn`).
 */
export interface WordFlashcard {
  id: string
  english: WordForms
  welsh: WordForms
}

/**
 * A single prompt. Discriminate with `typeof card.welsh === 'string'`
 * (→ `PhraseFlashcard`, and `card.english` is then also a string).
 */
export type Flashcard = PhraseFlashcard | WordFlashcard

/** A group of flashcards practised together. */
export interface Unit {
  id: string
  unitTitle: string
  slides: Flashcard[]
}

/** One practisable section of a course (e.g. Geiriau, Unedau). */
export interface CourseSection {
  id: string
  type: ContentType
  title: string
  units: Unit[]
}

/** A top-level course stage (e.g. Mynediad, Sylfaen). */
export interface CourseStage {
  id: string
  courseTitle: string
  courseContent: CourseSection[]
}
