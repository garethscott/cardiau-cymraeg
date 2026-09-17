import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getCourseById } from '../utils/courseData'
import { courses } from '../data/courses'
import { renderApp } from '../test/renderApp'

const mynediad = getCourseById(courses, 'mynediad')!

test('displays the course title and every section from the data', () => {
  renderApp('/course/mynediad')

  expect(screen.getByRole('heading', { name: mynediad.courseTitle })).toBeInTheDocument()
  for (const section of mynediad.courseContent) {
    expect(screen.getByRole('link', { name: section.title })).toBeInTheDocument()
  }
})

test('selecting a section navigates using its internal type, not its title', () => {
  renderApp('/course/mynediad')

  const words = mynediad.courseContent.find((section) => section.type === 'words')!
  const units = mynediad.courseContent.find((section) => section.type === 'units')!

  expect(screen.getByRole('link', { name: words.title })).toHaveAttribute(
    'href',
    '/course/mynediad/words',
  )
  expect(screen.getByRole('link', { name: units.title })).toHaveAttribute(
    'href',
    '/course/mynediad/units',
  )
})

test('selecting a section navigates to its unit list', async () => {
  const user = userEvent.setup()
  const words = mynediad.courseContent.find((section) => section.type === 'words')!
  renderApp('/course/mynediad')

  await user.click(screen.getByRole('link', { name: words.title }))

  expect(screen.getByRole('heading', { name: words.title })).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: words.units[0].unitTitle }),
  ).toBeInTheDocument()
})

test('the Back button returns to the course stage page', () => {
  renderApp('/course/mynediad')

  expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/')
})

test('an unknown course id shows Not Found', () => {
  renderApp('/course/not-a-course')

  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})
