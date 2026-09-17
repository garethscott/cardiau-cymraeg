import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { courses } from '../data/courses'
import { renderApp } from '../test/renderApp'

test('every course from the data is displayed', () => {
  renderApp('/')

  for (const course of courses) {
    expect(screen.getByRole('link', { name: course.courseTitle })).toBeInTheDocument()
  }
})

test('selecting a course navigates to its content page', async () => {
  const user = userEvent.setup()
  const [firstCourse] = courses
  renderApp('/')

  await user.click(screen.getByRole('link', { name: firstCourse.courseTitle }))

  expect(
    screen.getByRole('heading', { name: firstCourse.courseTitle }),
  ).toBeInTheDocument()
})
