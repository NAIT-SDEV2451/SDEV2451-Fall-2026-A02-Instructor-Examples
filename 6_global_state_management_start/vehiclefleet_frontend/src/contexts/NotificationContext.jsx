import { useState, createContext } from 'react'

import Toast from "../components/Toast";

export const NotificationContext = createContext(null)

export default function NotificationProvider({ children }) {
  // create some state
  const [notification, setNotification] = useState(null)

  // create two functions
  // showing a success message
  const showSuccess = (message) => {
    setNotification({
      message: message,
      type: "success"
    })
  }
  // showing a error message
  const showError = (message) => {
    setNotification({
      message: message,
      type: "error"
    })
  }
  // for hiding the toast
  const hide = () => {
    setNotification(null)
  }

  return <NotificationContext value={{
    showError, showSuccess, hide
  }}>
    <Toast />
    {children}
  </NotificationContext>
}