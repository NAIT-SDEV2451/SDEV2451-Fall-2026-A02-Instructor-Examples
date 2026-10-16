import {Link} from 'react-router-dom'

export default function EventCard({ event }) {

  // if you want to see the styling take a look at the docs
  // https://daisyui.com/components/card/?lang=en
  return <div className="card bg-base-100 shadow">
    <div className="card-body">
      <h2 className="card-title">{event.name}</h2>
      <p className="text-sm text-base-content/60">
        July 15 2026, 7:00 pm
      </p>
      <p className="text-sm">
        {event.venue.name}
      </p>
      <p className="text-sm text-base-content/60">
        {event.venue.address}
      </p>
      <div className="card-actions justify-end mt-2">
        <Link
          to={`/events/${event.id}/`}
          className="btn btn-primary btn-sm"
        >
          Get Tickets
        </Link>
      </div>
    </div>
  </div>
}