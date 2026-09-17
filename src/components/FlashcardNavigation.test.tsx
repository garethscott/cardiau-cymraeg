import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FlashcardNavigation from './FlashcardNavigation'

test('shows the current position and total', () => {
  render(
    <FlashcardNavigation currentIndex={1} total={5} onPrevious={() => {}} onNext={() => {}} />,
  )

  expect(screen.getByText('2 / 5')).toBeInTheDocument()
})

test('Previous is disabled on the first card', () => {
  render(
    <FlashcardNavigation currentIndex={0} total={5} onPrevious={() => {}} onNext={() => {}} />,
  )

  expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
})

test('Next is disabled on the final card', () => {
  render(
    <FlashcardNavigation currentIndex={4} total={5} onPrevious={() => {}} onNext={() => {}} />,
  )

  expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
})

test('clicking Previous / Next calls the corresponding handler', async () => {
  const user = userEvent.setup()
  const onPrevious = jest.fn()
  const onNext = jest.fn()
  render(
    <FlashcardNavigation currentIndex={1} total={5} onPrevious={onPrevious} onNext={onNext} />,
  )

  await user.click(screen.getByRole('button', { name: /previous/i }))
  await user.click(screen.getByRole('button', { name: /next/i }))

  expect(onPrevious).toHaveBeenCalledTimes(1)
  expect(onNext).toHaveBeenCalledTimes(1)
})
