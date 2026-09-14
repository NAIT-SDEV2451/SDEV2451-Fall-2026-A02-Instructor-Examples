// this is going to be the "root" of our components in our application.
// we're going to use react router to navigate to our pages here.
// docs here: https://reactrouter.com/home
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <nav className="navbar bg-base-100 shadow px-6">
        <div className="navbar-start">
          <span className="text-lg font-bold">Fleet Manager</span>
        </div>
        <div className="navbar-end gap-2">

        </div>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
      </main>
    </div>
  )
}

export default App
