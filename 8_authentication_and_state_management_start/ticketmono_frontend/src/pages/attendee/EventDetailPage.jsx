import { useParams, Link } from "react-router-dom"

import EventDetailsHeader from "../../components/EventDetailsHeader"
import TicketTierList from "../../components/TicketTierList"

import { useEvent } from "../../hooks/useEvent"

import { useCart } from "../../hooks/useCart"

function EventDetailPage() {
  const { id } = useParams()

  // let's import our cart hook, and if theres'
  // items let's give them a checkout button.

  const {items} = useCart()
  // let's check to see if our object has items.
  const hasItems = Object.keys(items).length > 0


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
      <TicketTierList
        tiers={event.ticket_tiers}
        eventId={event.id}
        eventName={event.name}
      />
      {hasItems && (
        <div className="mt-6">
          <Link
            className="btn btn-primary w-full"
          >
            Go to checkout
          </Link>
        </div>
      )}
    </div>
  )
}

export default EventDetailPage
