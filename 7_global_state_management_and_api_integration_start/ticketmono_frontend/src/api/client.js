import { getAccessToken } from "./tokenStorage"


const BASE_URL = "http://localhost:8000/api/v1"


// this is going to augment our fetch so that you can always
// have the token on the request.
export default async function apiClient(
  endpoint, // the url
  options = {}, // all other options in the fetch request.
) {
  // 1. we're going to get the access token
  const accessToken = getAccessToken()

  // 2. we're going to construct our headers so that we always
  // have the Authorization header.
  const headers = {
    "Content-Type": "application/json",
    // we're goign to be sending the headers from the options
    ...options.headers,
    // if we have the token add it to the header (below ternary)
    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}`} : {})
  }

  // 4. Let's make the request.
  let response = await fetch(
    `${BASE_URL}${endpoint}`, // this is the url that we passed in the beginning.
    {
      ...options, // that are passed in
      headers: headers
    }
  )

  // 5. a place holder when a token expires I want to refresh the
  // the token if I get a 401 from the above which means the
  // access token is refreshed.

  // 6. return the response (not awaited stays as promise)
  return response.json()
}