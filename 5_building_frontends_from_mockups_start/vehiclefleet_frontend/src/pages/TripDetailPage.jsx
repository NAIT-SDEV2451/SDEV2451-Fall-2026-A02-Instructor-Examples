// so that we can use the path.
import { useParams } from "react-router-dom"

import BackButton from "../components/BackButton"
import TripMap from "../components/TripMap"
import TripInfo from "../components/TripInfo"

// let's import our hook.
import { useTripDetails } from "../hooks/useTripDetails"

import { TRIPS } from "../mockData"

const STATUS_BADGE = {
  pending: "badge-ghost",
  in_progress: "badge-info",
  completed: "badge-success",
  failed: "badge-error"
}
const STATUS_LABEL = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Complete",
  failed: "Failed"
}

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

  const start = () => {
    startTripMutation.mutate()
  }


  // let's create the guards for the loading and error states.
  if (isLoading) {
    return <span className="loading loading-spinner, loading-lg"></span>
  }

  if (isError) {
    return <p className="text-error">
      Trip not found, error: {error.toString()}
    </p>
  }

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

        <span className={`badge ${STATUS_BADGE[trip.status]}`}>
          {STATUS_LABEL[trip.status]}
        </span>
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
      {/* we're changing the buttons based on the status */}
      { trip.status === "pending" &&
        <button
          className="btn btn-outline"
          onClick={start}
        >Start Trip</button>
      }

      { trip.status === "in_progress" &&
        <>
           <button className="btn btn-outline">Complete Trip</button>
            <button className="btn btn-outline btn-error">Can't be Delivered</button>
        </>
      }

    </div>
    {/* Trip info the 3 cards */}
    <TripInfo trip={trip} />
  </div>
}