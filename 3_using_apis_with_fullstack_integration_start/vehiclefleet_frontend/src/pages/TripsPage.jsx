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

  // we're going to put a few guards
  // one for loading
  if (isLoading) {
    return <div>
      <h2 className="text-xl font-semibold mb-3">
        Trips Loading...
      </h2>
      <span className='loading loading-spinner loading-md'></span>
    </div>
  }

  // one for error state.



  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Trips</h2>
      <TripList trips={TRIPS} />
    </div>
  )
}

export default TripsPage
