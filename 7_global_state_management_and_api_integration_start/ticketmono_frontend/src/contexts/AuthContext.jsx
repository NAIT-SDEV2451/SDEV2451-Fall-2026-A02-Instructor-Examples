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
export default function AuthProvider({children}) {
  // we're going to have some state for the user and
  // the token
  const [user, setUser] = useState(
    // make the default use what's in localstorage
    () => getStoredUser()
  )
  const [accessToken, setAccessToken] = useState(
    // make the default use what's in localstorage
    () => getAccessToken()
  )



  // loginMutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // 1. login the user
      // 2. get and set tokens
      // 3. fetch the user
    },
    onSuccess: () => {
      // set all the info recieved
    }
  })


  // registrationMutation

  // logout (not a mutation)


  return <AuthContext.Provider value={{
    user,
    accessToken
  }}>
    {children}
  </AuthContext.Provider>
}