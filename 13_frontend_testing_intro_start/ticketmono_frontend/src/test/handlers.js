// note docs here: https://mswjs.io/docs/quick-start
// setup msw which is the mock backend so that we can test
// our frontends here
import { http, HttpResponse } from 'msw'


const BASE_URL = "http://localhost:8000/api/v1"

// for events.
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

// we're going to also mock the login.
export const mockUser = { id: 1, username: 'sam', role: 'user' }

// A fake JWT: header.payload.signature. Only the payload is real base64 JSON,
// because AuthContext decodes it to read user_id.
const FAKE_ACCESS_TOKEN = `header.${btoa(JSON.stringify({ user_id: 1 }))}.signature`

// let's make the endpoints that we're going to use
export const handlers = [
  // events endpoint.
  http.get(`${BASE_URL}/events/`, () => {
    return HttpResponse.json(mockEvents)
  }),
  // let's mock our login endpoints
  http.post(`${BASE_URL}/auth/login/`, ()=> {
    return HttpResponse.json({
      access: FAKE_ACCESS_TOKEN,
      refresh: 'fake-refresh-token'
    })
  }),
  // me auth endpoint
  http.get(`${BASE_URL}/auth/me`, () => {
    return HttpResponse.json(mockUser)
  })
]
