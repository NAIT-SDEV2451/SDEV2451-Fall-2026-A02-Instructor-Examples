import TripList from '../components/TripList'
import { TRIPS } from '../mockData'

import {
  useTrips
} from "../hooks/useTrips"


function TripsPage() {
  const {
    trips,
    isLoading,
    isError,
    error
  } = useTrips()
  console.log('currentState')
  console.log("trips", trips)
  console.log("isLoading", isLoading)
  console.log("isError", isError)
  console.log("error", error)

  // we're going to put a few guards
  // one for loading
  if (isLoading) {
    return (<div>
      <h2 className="text-xl font-semibold mb-3">
        Trips Loading...
      </h2>
      <span className='loading loading-spinner loading-md'></span>
    </div>)
  }

  // one for error state.
  if (isError) {
    return (<div>
      <h2 className="text-xl font-semibold mb-3">
        Trips
      </h2>
      <div className="text-md">
        Error occurred please contact blah
        {error.toString()}
      </div>
    </div>)
  }


  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Trips</h2>
      <TripList trips={trips} />
    </div>
  )
}

export default TripsPage
