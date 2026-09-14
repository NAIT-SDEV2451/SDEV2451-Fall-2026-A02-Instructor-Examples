// this is going to be the "root" of our components in our application.
// we're going to use react router to navigate to our pages here.
// docs here: https://reactrouter.com/home
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

// import our pages
import VehiclesAndDriversPage from './pages/VehiclesAndDriversPage'
import CreateTripPage from './pages/CreateTripPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">
        <nav className="navbar bg-base-100 shadow px-6">
          <div className="navbar-start">
            <span className="text-lg font-bold">Fleet Manager</span>
          </div>
          <div className="navbar-end gap-2">
            {/* what we're going to do add some links */}
            <NavLink
              to="/"
              className={`btn btn-sm btn-ghost`}
            >
              Vehicles and Drivers
            </NavLink>
            <NavLink
              to="/trips/new"
              className={`btn btn-sm btn-ghost`}
            >
              Create Trip
            </NavLink>
          </div>
        </nav>
        {/* Build out our pages here. */}
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            {/* each route is going to take a component/element, and a path */}
            <Route
              path="/"
              element={<VehiclesAndDriversPage />}
            />
            <Route
              path="/trips/new"
              element={<CreateTripPage />}
            />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
