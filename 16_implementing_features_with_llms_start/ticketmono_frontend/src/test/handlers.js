import { http, HttpResponse } from 'msw'

const BASE_URL = 'http://localhost:8000/api/v1'

export const mockEvents = [
  {
    id: 1,
    name: 'Indie Rock Night',
    date_time: '2026-11-14T19:30:00Z',
    venue: { id: 1, name: 'The Aurora Room', address: '221 King St W' },
  },
  {
    id: 2,
    name: 'Comedy Open Mic',
    date_time: '2026-11-20T20:00:00Z',
    venue: { id: 2, name: 'Backroom Lounge', address: '77 Jasper Ave' },
  },
]

export const mockOrganizerEvents = {
  summary: { tickets_sold: 1250, gross_revenue: '31110.50', live_events: 1 },
  events: [
    {
      id: 1,
      name: 'Indie Rock Night',
      date_time: '2026-08-15T12:00:00Z',
      venue: { id: 1, name: 'The Aurora Room', address: '221 King St W' },
      status: 'past',
      tickets_sold: 1247,
      revenue: '31000.00',
    },
    {
      id: 2,
      name: 'Comedy Open Mic',
      date_time: '2027-01-30T12:00:00Z',
      venue: { id: 2, name: 'Backroom Lounge', address: '77 Jasper Ave' },
      status: 'on_sale',
      tickets_sold: 3,
      revenue: '110.50',
    },
  ],
}

export const handlers = [
  http.get(`${BASE_URL}/events/`, () => {
    return HttpResponse.json(mockEvents)
  }),
  http.get(`${BASE_URL}/organizer/events/`, () => {
    return HttpResponse.json(mockOrganizerEvents)
  }),
]