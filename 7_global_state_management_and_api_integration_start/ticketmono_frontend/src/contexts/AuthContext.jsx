import { createContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  fetchMe,
  loginUser,
  registerUser,
  refreshToken as refreshTokenApi,
} from '../api/auth'
import {
  clearStoredTokens,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  setAccessToken,
  setRefreshToken,
  setStoredUser,
} from '../api/tokenStorage'

// let's create our context
export const AuthContext = createContext(null)

// create the component that will provide this context
export default function AuthProvider({ children }) {
  // we're going to have some state for the user and
  // the token
  const [user, setUser] = useState(
    // make the default use what's in localstorage
    () => getStoredUser()
  )
  const [accessToken, setAccessTokenState] = useState(
    // make the default use what's in localstorage
    () => getAccessToken()
  )



  // loginMutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // credentials is going to be the username and password
      // 1. login the user
      const response = await loginUser(credentials)
      if (!response.ok) {
        const error = response.json()
        throw new Error(error.detail ?? "error while logging in")
      }

      // 2. get and set access token
      const tokens = await response.json()
      // access is the key on the response object from the backend
      setAccessToken(tokens.access)

      // 3. fetch the user
      const meResponse = await fetchMe()
      if (!meResponse.ok) {
        throw new Error("error fetching me")
      }
      const me = await meResponse.json()
      // 4. I'm going to return me, and the tokens
      return { tokens, me } // the params on onSuccess
    },
    onSuccess: ({ tokens, me }) => {
      // set all the info recieved
      // a. update our internal state
      setAccessTokenState(tokens.access)
      setUser(me)

      // b. perist the other tokens in local storage
      setAccessToken(tokens.access)
      setRefreshToken(tokens.refresh)
      setStoredUser(me)
    }
  })

  // registrationMutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      // user is the username, password, role, email
      const response = await registerUser(userData)
      if (!response.ok) {
        // look at the readme for the error format.
        throw new Error("Error while registering")
      }
      return response.json()
    }
  })


  // logout (not a mutation)


  return <AuthContext.Provider value={{
    user,
    accessToken,
    login: loginMutation.mutate, // perform the mutation
    isLoggingIn: loginMutation.isPending, // loading state
    error: loginMutation.error, // the error state.
  }}>
    {children}
  </AuthContext.Provider>
}