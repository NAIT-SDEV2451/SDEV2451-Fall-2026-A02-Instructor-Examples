// the base url is different in production than your local server
// most times this an environment variable and this points to our backend.
const BASE_URL = `http://localhost:8000/api/v1`
// note pay attention to the slashes in the url!

// we're going to make the fetch request to the backend
export async function fetchVehicles() {
  // export makes it available to other files.
  // make the request to the backend
  const response = await fetch(`${BASE_URL}/vehicles/`)
  // the above errors for 500s statuses but not 400s so let's throw an error if
  // it is a 400
  if (!response.ok) {
    throw new Error("Failed to fetch vehicles")
  }
  // if it's here it should be a good request.
  return response.json()
}

export async function fetchDrivers() {
  const response = await fetch(`${BASE_URL}/drivers/`)

  if (!response.ok) {
    throw new Error("Failed to fetch drivers")
  }

  return response.json()
}