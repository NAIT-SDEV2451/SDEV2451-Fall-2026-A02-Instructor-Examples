# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

TicketMono is a teaching project for a course: event ticketing with a Django REST Framework backend and a React (Vite) frontend. Solutions should match the level and style of the existing code, not production patterns beyond it.

## Commands

Backend (from `ticketmono_backend/`, virtual environment active):
- `python manage.py runserver` (port 8000) · `python manage.py migrate`
- Sample data: `python manage.py create_organizers` then `python manage.py loaddata event_data.json`. Organizers are `alice_organizer` / `Organizer@100` and `bob_organizer` / `Organizer@101`. The sample data has no orders.
- Tests: `python manage.py test`; one test: `python manage.py test event_tickets.tests.EventTicketsTestCase.test_order_total_price`
- Coverage: `coverage run manage.py test`, then `coverage report` or `coverage html` (output in `htmlcov/`)

Frontend (from `ticketmono_frontend/`):
- `npm run dev` (port 5173, the only origin allowed by CORS) · `npm run build` · `npm run lint`
- Tests: `npm run test:run` (single run) or `npm test` (watch); one file: `npm run test:run -- src/__tests__/EventCard.test.jsx`

## Architecture

Backend
- `core` holds `CustomUser` (`AUTH_USER_MODEL`) with `role` of `user` or `event_organizer`, plus auth endpoints under `/api/v1/auth/` (register, JWT login, token refresh, `me`).
- `event_tickets` holds Venue → Event → TicketTier → Ticket, and Order (many-to-many to Ticket). Events have an `organizer`, venues an `owner`. Its ViewSets are registered on a `DefaultRouter` under `/api/v1/`.
- An order is priced from its tickets' tiers (`Order.total_price`); there is no stored total or quantity. Each purchased ticket is its own `Ticket` row.
- Auth is JWT only (SimpleJWT, `Bearer` header). Database is SQLite.

Frontend
- Layers: `src/api/` (fetch functions over `apiClient`) → `src/hooks/` (TanStack Query wrappers) → `src/pages/`.
- `api/client.js` attaches the token from `tokenStorage`, and on a 401 performs one shared token refresh via callbacks that `AuthProvider` registers, logging out if that fails.
- `AuthContext` keeps `{ id, username, role }` in state and localStorage; `role` comes from `/auth/me/` at login. `ProtectedRoute` only checks that a user exists.
- `CartContext` holds the ticket selection in memory between Select Tickets and Checkout.
- Styling is Tailwind v4 with daisyUI.
- Tests use Vitest + jsdom, React Testing Library, and MSW (`src/test/handlers.js`, `server.js`, wired in `setup.js`). Render with `renderWithProviders` from `src/test/`, which supplies a QueryClient (no retries) and MemoryRouter but not Auth or Cart providers.
