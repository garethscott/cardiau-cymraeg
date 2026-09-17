import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { courses } from '../data/courses'
import { getCourseById, getCourseSection } from '../utils/courseData'
import Flashcard from './Flashcard'
import type { PhraseFlashcard, WordFlashcard } from '../types/course'

const mynediad = getCourseById(courses, 'mynediad')!
const phraseCard = getCourseSection(mynediad, 'units')!.units[0]
  .slides[0] as PhraseFlashcard
// "programme" / "programmes" — a real word card with a plural on both sides
// (English and Welsh text don't overlap, unlike e.g. "problem"/"problem").
const wordCard = getCourseSection(mynediad, 'words')!.units[0]
  .slides[5] as WordFlashcard
// "milk" / "llaeth" — a real dummy card with no plural on either side.
const noPluralWordCard = getCourseSection(mynediad, 'words')!.units[0]
  .slides[3] as WordFlashcard
// The one phrase card whose course data explicitly marks its register.
const informalPhraseCard = getCourseSection(mynediad, 'units')!.units[1]
  .slides[0] as PhraseFlashcard
// No real card is confidently classified as formal yet (see types/course.ts) —
// a minimal fixture, not real course data, exercises the formal rendering path.
const formalPhraseCard: PhraseFlashcard = {
  id: 'test-formal-phrase',
  english: 'Good afternoon',
  welsh: 'Prynhawn da',
  register: 'formal',
}

describe('phrase card', () => {
  test('shows the English phrase and hides the Welsh phrase initially', () => {
    render(<Flashcard card={phraseCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.getByText(phraseCard.english)).toBeInTheDocument()
    expect(screen.queryByText(phraseCard.welsh)).not.toBeInTheDocument()
  })

  test('reveals the Welsh phrase and keeps the English phrase visible', () => {
    render(<Flashcard card={phraseCard} isRevealed={true} onToggleReveal={() => {}} />)

    expect(screen.getByText(phraseCard.english)).toBeInTheDocument()
    expect(screen.getByText(phraseCard.welsh)).toBeInTheDocument()
  })
})

describe('word card', () => {
  test('shows both English forms and hides both Welsh forms initially', () => {
    render(<Flashcard card={wordCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.getByText(wordCard.english.singular)).toBeInTheDocument()
    expect(screen.getByText(wordCard.english.plural!)).toBeInTheDocument()
    expect(screen.queryByText(wordCard.welsh.singular)).not.toBeInTheDocument()
    expect(screen.queryByText(wordCard.welsh.plural!)).not.toBeInTheDocument()
  })

  test('revealing shows both Welsh forms and keeps both English forms visible', () => {
    render(<Flashcard card={wordCard} isRevealed={true} onToggleReveal={() => {}} />)

    expect(screen.getByText(wordCard.english.singular)).toBeInTheDocument()
    expect(screen.getByText(wordCard.english.plural!)).toBeInTheDocument()
    expect(screen.getByText(wordCard.welsh.singular)).toBeInTheDocument()
    expect(screen.getByText(wordCard.welsh.plural!)).toBeInTheDocument()
  })
})

describe('word card without a plural', () => {
  test('shows only the English singular initially, with no separator', () => {
    render(<Flashcard card={noPluralWordCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.getByText(noPluralWordCard.english.singular)).toBeInTheDocument()
    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })

  test('revealing shows only the Welsh singular, with no separator or placeholder', () => {
    render(<Flashcard card={noPluralWordCard} isRevealed={true} onToggleReveal={() => {}} />)

    expect(screen.getByText(noPluralWordCard.welsh.singular)).toBeInTheDocument()
    expect(screen.queryByText('/')).not.toBeInTheDocument()
    expect(screen.queryByText('undefined')).not.toBeInTheDocument()
    expect(screen.queryByText('null')).not.toBeInTheDocument()
    expect(screen.queryByText(/n\/a/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no plural/i)).not.toBeInTheDocument()
  })
})

describe('phrase register indicator', () => {
  test('a formal-register phrase card displays "Formal"', () => {
    render(<Flashcard card={formalPhraseCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.getByText('Formal')).toBeInTheDocument()
  })

  test('an informal-register phrase card displays "Informal"', () => {
    render(<Flashcard card={informalPhraseCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.getByText('Informal')).toBeInTheDocument()
  })

  test('the indicator remains visible after reveal', () => {
    render(<Flashcard card={informalPhraseCard} isRevealed={true} onToggleReveal={() => {}} />)

    expect(screen.getByText('Informal')).toBeInTheDocument()
    expect(screen.getByText(informalPhraseCard.welsh)).toBeInTheDocument()
  })

  test('a phrase card without a register renders no indicator', () => {
    render(<Flashcard card={phraseCard} isRevealed={false} onToggleReveal={() => {}} />)

    expect(screen.queryByText('Formal')).not.toBeInTheDocument()
    expect(screen.queryByText('Informal')).not.toBeInTheDocument()
  })

  test('word cards never render a register indicator', () => {
    render(<Flashcard card={wordCard} isRevealed={true} onToggleReveal={() => {}} />)

    expect(screen.queryByText('Formal')).not.toBeInTheDocument()
    expect(screen.queryByText('Informal')).not.toBeInTheDocument()
  })
})

describe('interaction', () => {
  test('clicking the card toggles reveal', async () => {
    const user = userEvent.setup()
    const onToggleReveal = jest.fn()
    render(<Flashcard card={phraseCard} isRevealed={false} onToggleReveal={onToggleReveal} />)

    await user.click(screen.getByRole('button'))

    expect(onToggleReveal).toHaveBeenCalledTimes(1)
  })

  test('pressing Enter toggles reveal', async () => {
    const user = userEvent.setup()
    const onToggleReveal = jest.fn()
    render(<Flashcard card={phraseCard} isRevealed={false} onToggleReveal={onToggleReveal} />)

    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')

    expect(onToggleReveal).toHaveBeenCalledTimes(1)
  })

  test('pressing Space toggles reveal', async () => {
    const user = userEvent.setup()
    const onToggleReveal = jest.fn()
    render(<Flashcard card={phraseCard} isRevealed={false} onToggleReveal={onToggleReveal} />)

    screen.getByRole('button').focus()
    await user.keyboard('[Space]')

    expect(onToggleReveal).toHaveBeenCalledTimes(1)
  })
})
