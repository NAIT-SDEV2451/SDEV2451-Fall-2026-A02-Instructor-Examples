import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { AuthContext } from '../contexts/AuthContext'
import MyEventsPage from '../pages/organizer/MyEventsPage'
import { renderWithProviders } from '../test/renderWithProviders'
import { server } from '../test/server'

const ORGANIZER_EVENTS_URL = 'http://localhost:8000/api/v1/organizer/events/'

const organizer = { id: 100, username: 'alice_organizer', role: 'event_organizer' }

function renderPage() {
  return renderWithProviders(
    <AuthContext.Provider value={{ user: organizer }}>
      <MyEventsPage />
    </AuthContext.Provider>
  )
}

describe('MyEventsPage', () => {
  it('shows a loading spinner while events are loading', () => {
    const { container } = renderPage()

    expect(container.querySelector('.loading-spinner')).toBeInTheDocument()
  })

  it('shows the summary statistics', async () => {
    renderPage()

    expect(await screen.findByText('1,250')).toBeInTheDocument()
    expect(screen.getByText('$31,110.50')).toBeInTheDocument()
    expect(screen.getByText('Live events').nextElementSibling).toHaveTextContent('1')
  })

  it('shows the details and statistics of each event', async () => {
    renderPage()

    const pastRow = await screen.findByRole('row', { name: /Indie Rock Night/ })
    expect(pastRow).toHaveTextContent('Sat, Aug 15, 2026 · The Aurora Room')
    expect(pastRow).toHaveTextContent('PAST')
    expect(pastRow).toHaveTextContent('1,247')
    expect(pastRow).toHaveTextContent('$31,000.00')

    const upcomingRow = screen.getByRole('row', { name: /Comedy Open Mic/ })
    expect(upcomingRow).toHaveTextContent('ON SALE')
    expect(upcomingRow).toHaveTextContent('$110.50')
  })

  it('filters the events by status', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(await screen.findByRole('button', { name: 'On sale' }))
    expect(screen.getByText('Comedy Open Mic')).toBeInTheDocument()
    expect(screen.queryByText('Indie Rock Night')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Past' }))
    expect(screen.getByText('Indie Rock Night')).toBeInTheDocument()
    expect(screen.queryByText('Comedy Open Mic')).not.toBeInTheDocument()
  })

  it('shows a message if the organizer has no events', async () => {
    server.use(
      http.get(ORGANIZER_EVENTS_URL, () => {
        return HttpResponse.json({
          summary: { tickets_sold: 0, gross_revenue: '0.00', live_events: 0 },
          events: [],
        })
      })
    )

    renderPage()

    expect(await screen.findByText("You don't have any events yet.")).toBeInTheDocument()
  })

  it('shows an error message if the request fails', async () => {
    server.use(
      http.get(ORGANIZER_EVENTS_URL, () => {
        return HttpResponse.json({ detail: 'Server error' }, { status: 500 })
      })
    )

    renderPage()

    expect(
      await screen.findByText('Failed to load your events. Please try again later.')
    ).toBeInTheDocument()
  })
})
