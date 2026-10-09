// this will make the fetch requests
import apiClient from "./client";

export async function loginUser({username, password}) {
  return apiClient('/auth/login/', {
    method: "POST",
    body: JSON.stringify({username, password})
  })
}