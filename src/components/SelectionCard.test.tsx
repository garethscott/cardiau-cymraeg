import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SelectionCard from './SelectionCard'

test('renders an accessible link to the given route with the given label', () => {
  render(
    <MemoryRouter>
      <SelectionCard to="/course/mynediad" label="Mynediad" />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: 'Mynediad' })).toHaveAttribute(
    'href',
    '/course/mynediad',
  )
})
