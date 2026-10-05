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

  // the values that are being exposed here
  // the items in the object of the prop value
  return <NotificationContext value={{
    showError, showSuccess, hide // these are being exposed
  }}>
    {/*  */}
    <Toast notification={notification} hide={hide}/>
    {children}
  </NotificationContext>
}