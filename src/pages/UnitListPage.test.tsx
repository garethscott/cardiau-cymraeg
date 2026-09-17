import { screen } from '@testing-library/react'
import { getCourseById, getCourseSection } from '../utils/courseData'
import { courses } from '../data/courses'
import { renderApp } from '../test/renderApp'

const mynediad = getCourseById(courses, 'mynediad')!
const words = getCourseSection(mynediad, 'words')!

test('displays the section title and every unit from the data', () => {
  renderApp('/course/mynediad/words')

  expect(screen.getByRole('heading', { name: words.title })).toBeInTheDocument()
  for (const unit of words.units) {
    expect(screen.getByRole('link', { name: unit.unitTitle })).toBeInTheDocument()
  }
})

test('a unit links to the (not-yet-built) flashcard route', () => {
  renderApp('/course/mynediad/words')

  const [firstUnit] = words.units
  expect(screen.getByRole('link', { name: firstUnit.unitTitle })).toHaveAttribute(
    'href',
    `/course/mynediad/words/${firstUnit.id}`,
  )
})

test('the Back button returns to the course content page', () => {
  renderApp('/course/mynediad/words')

  expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute(
    'href',
    '/course/mynediad',
  )
})

test('an unknown content type shows Not Found', () => {
  renderApp('/course/mynediad/not-a-type')

  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})

test('an unknown course id shows Not Found', () => {
  renderApp('/course/not-a-course/words')

  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})
