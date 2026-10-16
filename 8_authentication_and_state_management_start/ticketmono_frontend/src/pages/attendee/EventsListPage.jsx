import EventCard from "../../components/EventCard"
// let's use the event
import { useEvents } from "../../hooks/useEvent"


function EventsListPage() {
  const {
    data: events,
    isLoading,
    isError
  } = useEvents()

  if (isLoading) {
    return <div className="flex justify-center mt-12">
      <span className="loading loading-spinner loading-lg" />
    </div>
  }

  if (isError) {
    return <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="alert alert-error">
        <span>Failed to load events. Please try again later.</span>
      </div>
    </div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* we're going to loop through the events pass the event to the card */}
        { events.map((event)=> {
          return <EventCard
            key={event.id}
            event={event}
          />
        })}
      </div>
    </div>
  )
}

export default EventsListPage
