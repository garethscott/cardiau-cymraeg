import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BackButton from './BackButton'

test('links to the given explicit route', () => {
  render(
    <MemoryRouter>
      <BackButton to="/course/mynediad" label="Back to Mynediad" />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: /back to mynediad/i })).toHaveAttribute(
    'href',
    '/course/mynediad',
  )
})

test('defaults to the label "Back"', () => {
  render(
    <MemoryRouter>
      <BackButton to="/" />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument()
})
