import type {
  Flashcard as FlashcardData,
  PhraseFlashcard,
  WordFlashcard,
  WordForms,
} from '../types/course'

interface FlashcardProps {
  card: FlashcardData
  isRevealed: boolean
  onToggleReveal: () => void
}

/** Discriminate the two card shapes (see the JSDoc on `Flashcard` in types/course.ts). */
function isPhraseFlashcard(card: FlashcardData): card is PhraseFlashcard {
  return typeof card.welsh === 'string'
}

// A real <button> so click, tap, Enter, and Space all reveal/hide natively —
// no manual key handling needed. aria-pressed communicates reveal state.
export default function Flashcard({ card, isRevealed, onToggleReveal }: FlashcardProps) {
  return (
    <button
      type="button"
      aria-pressed={isRevealed}
      onClick={onToggleReveal}
      className="flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center transition-colors hover:border-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-slate-800"
    >
      {isPhraseFlashcard(card) ? (
        <PhraseContent card={card} isRevealed={isRevealed} />
      ) : (
        <WordContent card={card} isRevealed={isRevealed} />
      )}
    </button>
  )
}

function PhraseContent({ card, isRevealed }: { card: PhraseFlashcard; isRevealed: boolean }) {
  return (
    <>
      {card.register !== undefined && <RegisterBadge register={card.register} />}
      <span className="block text-2xl font-semibold">{card.english}</span>
      {isRevealed ? (
        <span className="block text-2xl font-semibold text-red-400">{card.welsh}</span>
      ) : (
        <span className="block text-sm text-slate-400">Tap to reveal</span>
      )}
    </>
  )
}

// Secondary metadata, not the main prompt/answer — small, muted, always visible
// (both before and after reveal) regardless of reveal state.
function RegisterBadge({ register }: { register: 'formal' | 'informal' }) {
  return (
    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">
      {register === 'formal' ? 'Formal' : 'Informal'}
    </span>
  )
}

function WordContent({ card, isRevealed }: { card: WordFlashcard; isRevealed: boolean }) {
  return (
    <>
      <span className="block text-2xl font-semibold">
        <WordFormText forms={card.english} />
      </span>
      {isRevealed ? (
        <span className="block text-2xl font-semibold text-red-400">
          <WordFormText forms={card.welsh} />
        </span>
      ) : (
        <span className="block text-sm text-slate-400">Tap to reveal</span>
      )}
    </>
  )
}

// Shared by both sides of a word card: the plural + its "/" separator are only
// rendered when a plural actually exists — never a placeholder or dangling "/".
function WordFormText({ forms }: { forms: WordForms }) {
  return (
    <>
      <span>{forms.singular}</span>
      {forms.plural !== undefined && (
        <>
          <span aria-hidden="true" className="mx-1 text-slate-500">
            /
          </span>
          <span>{forms.plural}</span>
        </>
      )}
    </>
  )
}
