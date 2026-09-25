// so that we can use the path.
import { useParams } from "react-router-dom"

import BackButton from "../components/BackButton"
import TripMap from "../components/TripMap"
import TripInfo from "../components/TripInfo"

// let's import our hook.
import { useTripDetails } from "../hooks/useTripDetails"

import { TRIPS } from "../mockData"

export default function TripDetailPage() {
  const { id } = useParams()
  const {
    trip,
    isLoading,
    isError,
    error,
    startTripMutation,
    completeTripMutation,
  } = useTripDetails(id) // pass the id.

  // the static data
  // const trip = TRIPS[4] // this is so that we can see the inprogress
  // let's create a boolean fo in progress
  const isInProgress = trip.end_time === null

  // let's create the guards for the loading and error states.


  return <div className="flex flex-col gap-6">
    <div>
      {/* top of the page back button and title. */}
      <BackButton to="/trips" label="Back To Trips" />
      <div className="flex items-center gap-3">
        <h1
          className="text-3xl font-bold"
        >
          Trip #{trip.id}
        </h1>
        {isInProgress
          && <span className="badge badge-info">Is in Progress</span>}
      </div>

    </div>
    {/* Add the map */}
    <TripMap
      startLocation={trip.start_location}
      endLocation={trip.end_location}
    />
    {/* buttons */}
    <div className="flex flex-wrap gap-2">
      <button className="btn btn-outline">Get Directions</button>
      <button className="btn btn-outline">Complete Trip</button>
      <button className="btn btn-outline btn-error">Can't be Delivered</button>
    </div>
    {/* Trip info the 3 cards */}
    <TripInfo trip={trip} />
  </div>
}