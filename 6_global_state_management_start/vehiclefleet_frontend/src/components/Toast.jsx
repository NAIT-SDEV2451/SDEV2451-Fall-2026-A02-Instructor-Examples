export default function Toast({ notification, hide }) {
  // the notification is going to be a message as an
  // obj with also the type of message it is.

  return <div className="toast toast-top toast-end">
    <div className="alert alert-info">
      <span>New mail arrived.</span>
    </div>
    <div className="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div>
}