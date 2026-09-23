import BackButton from "../components/BackButton"
import TripMap from "../components/TripMap"

import { TRIPS } from "../mockData"

export default function TripDetailPage() {
  // the static data
  const trip = TRIPS[4] // this is so that we can see the inprogress
  // let's create a boolean fo in progress
  const isInProgress = trip.end_time === null

  return <div className="flex flex-col gap-6">
    <div>
      {/* top of the page back button and title. */}
      <BackButton to="/trips" label="Back To Trips"/>
      <div className="flex items-center gap-3">
        <h1
          className="text-3xl font-bold"
        >
          Trip #{trip.id}
        </h1>
        { isInProgress
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
  </div>
}