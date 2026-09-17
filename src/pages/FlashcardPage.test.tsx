import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { courses } from '../data/courses'
import { getCourseById, getCourseSection } from '../utils/courseData'
import { renderApp } from '../test/renderApp'

const mynediad = getCourseById(courses, 'mynediad')!
const units = getCourseSection(mynediad, 'units')!
const firstUnit = units.units[0]
const total = firstUnit.slides.length

// The flashcard is the only button with aria-pressed — that (rather than its
// text, which also contains "Tap to reveal"/the Welsh side) disambiguates it
// from the Previous/Next buttons.
function getCard(pressed: boolean) {
  return screen.getByRole('button', { pressed })
}

test('the first card is shown on load, with its Welsh side hidden', () => {
  renderApp(`/course/mynediad/units/${firstUnit.id}`)

  expect(screen.getByText(firstUnit.slides[0].english as string)).toBeInTheDocument()
  expect(getCard(false)).toBeInTheDocument()
})

test('Next moves to the next card and resets reveal; Previous moves back', async () => {
  const user = userEvent.setup()
  renderApp(`/course/mynediad/units/${firstUnit.id}`)

  await user.click(getCard(false)) // reveal card 1
  expect(getCard(true)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /next/i }))
  expect(screen.getByText(firstUnit.slides[1].english as string)).toBeInTheDocument()
  expect(getCard(false)).toBeInTheDocument() // reveal reset on the new card

  await user.click(getCard(false)) // reveal card 2
  await user.click(screen.getByRole('button', { name: /previous/i }))
  expect(screen.getByText(firstUnit.slides[0].english as string)).toBeInTheDocument()
  expect(getCard(false)).toBeInTheDocument() // reveal reset again
})

test('the progress indicator matches the unit\'s slide count', () => {
  renderApp(`/course/mynediad/units/${firstUnit.id}`)

  expect(screen.getByText(`1 / ${total}`)).toBeInTheDocument()
})

test('Previous is disabled on the first card, Next disabled on the final card', async () => {
  const user = userEvent.setup()
  renderApp(`/course/mynediad/units/${firstUnit.id}`)

  expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()

  for (let i = 1; i < total; i++) {
    await user.click(screen.getByRole('button', { name: /next/i }))
  }

  expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
})

test('the Back button returns to the exact unit-list parent route', () => {
  renderApp(`/course/mynediad/units/${firstUnit.id}`)

  expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute(
    'href',
    '/course/mynediad/units',
  )
})

test('an unknown course id shows Not Found', () => {
  renderApp(`/course/not-a-course/units/${firstUnit.id}`)
  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})

test('an unknown content type shows Not Found', () => {
  renderApp(`/course/mynediad/not-a-type/${firstUnit.id}`)
  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})

test('an unknown unit id shows Not Found', () => {
  renderApp('/course/mynediad/units/not-a-unit')
  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})
