import Toast from "../components/Toast";

export default function NotificationProvider({children}) {

  return <>
    <Toast />
    { children }
  </>
}