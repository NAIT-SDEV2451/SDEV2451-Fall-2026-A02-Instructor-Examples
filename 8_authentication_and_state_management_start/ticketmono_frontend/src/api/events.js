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