import { useParams } from "react-router-dom"

import EventDetailsHeader from "../../components/EventDetailsHeader"
import TicketTierList from "../../components/TicketTierList"

import { useEvent } from "../../hooks/useEvent"

const STATIC_TIERS = [
  {
    "id": 1,
    "price": "150.00",
    "name": "Floor"
  },
  {
    "id": 2,
    "price": "85.00",
    "name": "Lower Bowl"
  },
  {
    "id": 3,
    "price": "45.00",
    "name": "Upper Bowl"
  }
]

function EventDetailPage() {
  const { id } = useParams()

  // make the api in events
  // make the hook in useEvent
  const {
    data: event, // I'm renaming data to event in our code.
    isLoading,
    isError
  } = useEvent(id)
  // use it here, handle the loading states
  if (isLoading) {
    return <div className="flex justify-center mt-12">
      <span className="loading loading-spinner loading-lg" />
    </div>
  }

  if (isError) {
    return <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="alert alert-error">
        <span>Failed to load event {id}. Please try again later.</span>
      </div>
    </div>
  }
  // pass the data in to event details header.


  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <EventDetailsHeader event={event}/>
      <TicketTierList tiers={STATIC_TIERS} />
    </div>
  )
}

export default EventDetailPage
