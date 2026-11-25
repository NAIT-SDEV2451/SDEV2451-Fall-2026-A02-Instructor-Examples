import { useState } from 'react'
import OrganizerEventsTable from '../../components/organizer/OrganizerEventsTable'
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar'
import StatCard from '../../components/organizer/StatCard'
import { useOrganizerEvents } from '../../hooks/useOrganizerEvents'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'on_sale', label: 'On sale' },
  { value: 'past', label: 'Past' },
]

function MyEventsPage() {
  const [filter, setFilter] = useState('all')
  const { data, isLoading, isError } = useOrganizerEvents()

  if (isLoading) {
    return (
      <div className="flex justify-center mt-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Failed to load your events. Please try again later.</span>
        </div>
      </div>
    )
  }

  const { summary, events } = data
  const filteredEvents =
    filter === 'all' ? events : events.filter((event) => event.status === filter)

  return (
    <div className="flex flex-col md:flex-row md:min-h-[32rem] bg-base-100 border border-base-300 rounded-box overflow-hidden">
      <OrganizerSidebar />

      <div className="flex-1 min-w-0 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Events</h1>
          {/* Creating events doesn't exist yet. */}
          <button className="btn btn-primary btn-sm" disabled>+ Create event</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <StatCard label="Tickets sold" value={summary.tickets_sold.toLocaleString('en-US')} />
          <StatCard
            label="Gross revenue"
            value={Number(summary.gross_revenue).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          />
          <StatCard label="Live events" value={summary.live_events} />
        </div>

        <div className="flex gap-2 mb-4">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`btn btn-sm ${filter === value ? 'btn-soft btn-primary' : 'btn-outline'}`}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-base-content/60">
            {events.length === 0
              ? "You don't have any events yet."
              : 'No events match this filter.'}
          </p>
        ) : (
          <OrganizerEventsTable events={filteredEvents} />
        )}
      </div>
    </div>
  )
}

export default MyEventsPage
