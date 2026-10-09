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