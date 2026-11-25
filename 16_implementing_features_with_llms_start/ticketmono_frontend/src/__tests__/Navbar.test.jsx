import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { renderWithProviders } from '../test/renderWithProviders'

function renderNavbar(role) {
  return renderWithProviders(
    <AuthContext.Provider value={{ user: { id: 1, username: 'testuser', role } }}>
      <Navbar />
    </AuthContext.Provider>
  )
}

describe('Navbar', () => {
  it('links organizers to their events', () => {
    renderNavbar('event_organizer')

    expect(screen.getByRole('link', { name: 'My Events' })).toHaveAttribute(
      'href',
      '/organizer/events'
    )
  })

  it('does not show the My Events link to normal users', () => {
    renderNavbar('user')

    expect(screen.queryByRole('link', { name: 'My Events' })).not.toBeInTheDocument()
  })
})
