interface FlashcardNavigationProps {
  currentIndex: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

const navButtonClass =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:text-slate-400 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:text-slate-600 disabled:active:text-slate-600'

export default function FlashcardNavigation({
  currentIndex,
  total,
  onPrevious,
  onNext,
}: FlashcardNavigationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={navButtonClass}
      >
        ← Previous
      </button>
      <p aria-live="polite" className="text-sm text-slate-400">
        {currentIndex + 1} / {total}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={currentIndex === total - 1}
        className={navButtonClass}
      >
        Next →
      </button>
    </div>
  )
}
