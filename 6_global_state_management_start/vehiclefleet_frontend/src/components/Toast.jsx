import { useEffect } from 'react'

const AUTO_HIDE_MS = 3000

export default function Toast({ notification, hide }) {
  // the notification is going to be a message as an
  // obj with also the type of message it is.

  // let's make it go away after 3 seconds
  // useEffect(()=> {
  //   if (!notification) {
  //     return null
  //   }
  //   // add a timer
  //   const timer = setTimeout(hide, AUTO_HIDE_MS)
  //   // clean up.
  //   return () => {clearTimeout(timer)}
  // }, [notification])


  // let's hide the notification if it's null.
  if (!notification) {
    return null
  }

  // make the class different based on the type of error
  const alertClass = notification.type === "success" ? 'alert-success' : 'alert-error'

  return <div className="toast toast-top toast-end z-50 mt-15">
    <div className={`alert ${alertClass} flex justify-between gap-4`}>
      <span>{notification.message}</span>
      <button class="btn btn-xs btn-ghost"
        onClick={hide}
      >x</button>
    </div>
  </div>
}