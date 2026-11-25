import { afterEach, describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'
import LoginPage from '../pages/auth/LoginPage'
import { renderWithProviders } from '../test/renderWithProviders'
import { server } from '../test/server'

const BASE_URL = 'http://localhost:8000/api/v1'

// AuthContext reads user_id from the middle part of the token.
const accessToken = `header.${btoa(JSON.stringify({ user_id: 1 }))}.signature`

async function logInAs(role) {
  server.use(
    http.post(`${BASE_URL}/auth/login/`, () => {
      return HttpResponse.json({ access: accessToken, refresh: 'refresh-token' })
    }),
    http.get(`${BASE_URL}/auth/me/`, () => {
      return HttpResponse.json({ id: 1, username: 'testuser', email: 'test@example.com', role })
    })
  )

  renderWithProviders(
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<p>Events list</p>} />
        <Route path="/organizer/events" element={<p>Organizer events</p>} />
      </Routes>
    </AuthProvider>,
    { initialEntries: ['/login'] }
  )

  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText('Enter your username'), 'testuser')
  await user.type(screen.getByPlaceholderText('Enter your password'), 'testpass123')
  await user.click(screen.getByRole('button', { name: 'Log In' }))
}

describe('LoginPage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('sends an organizer to their events after logging in', async () => {
    await logInAs('event_organizer')

    expect(await screen.findByText('Organizer events')).toBeInTheDocument()
  })

  it('sends a normal user to the events list after logging in', async () => {
    await logInAs('user')

    expect(await screen.findByText('Events list')).toBeInTheDocument()
  })
})
