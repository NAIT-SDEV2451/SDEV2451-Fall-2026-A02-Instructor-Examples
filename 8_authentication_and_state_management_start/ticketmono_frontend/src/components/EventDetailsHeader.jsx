

export default function EventDetailsHeader(
  {event}
) {



  return (
    <div className="bg-base-100 shadow rounded-box p-6 mb-6">
      <h1 className="text-3xl font-bold mb-2">
        {event.name}
      </h1>
      <p className="text-base-content/60 mb-4">
        July 15, 2026 · 7:00 PM
      </p>
      <div>
        <p className="font-semibold">
          {event.venue.name}
        </p>
        <p className="text-sm text-base-content/60">
          {event.venue.address}
        </p>
      </div>
    </div>
  )
}
