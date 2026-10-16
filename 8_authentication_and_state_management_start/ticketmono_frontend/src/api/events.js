import apiClient from './client'

// a note this is essentially what we're doing on postman just with
// javascript, so these files in the "api" folder is what directly
// interacts with the backend.
export async function fetchEvents() {
  const response = await apiClient('/events/')
  if (!response.ok) {
    throw new Error("Failed to fetch events")
  }
  return response.json()
}

// you could make this as part of the above
// function but we're not right now
export async function fetchEvent(id) {
  const response = await apiClient(`/events/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch event " + id)
  }
  return response.json()
}