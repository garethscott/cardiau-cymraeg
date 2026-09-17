import { screen } from '@testing-library/react'
import { renderApp } from './test/renderApp'

test('an unknown path renders the Not Found catch-all', () => {
  renderApp('/totally/not/a/real/path')
  expect(screen.getByRole('heading', { name: /content not found/i })).toBeInTheDocument()
})
