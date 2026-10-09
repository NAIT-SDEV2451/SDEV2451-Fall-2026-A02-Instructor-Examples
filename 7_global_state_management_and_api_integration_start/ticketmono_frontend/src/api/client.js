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
  const headers = {}


}