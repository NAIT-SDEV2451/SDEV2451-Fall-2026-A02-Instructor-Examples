function OrganizerEventsTable({ events }) {
  return (
    <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-box">
      <table className="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date &amp; Venue</th>
            <th>Status</th>
            <th>Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const formattedDate = new Date(event.date_time).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })

            return (
              <tr key={event.id}>
                <td className="font-semibold">{event.name}</td>
                <td className="text-sm">{formattedDate} · {event.venue.name}</td>
                <td>
                  {event.status === 'on_sale' ? (
                    <span className="badge badge-soft badge-success whitespace-nowrap">ON SALE</span>
                  ) : (
                    <span className="badge badge-soft">PAST</span>
                  )}
                </td>
                <td>{event.tickets_sold.toLocaleString('en-US')}</td>
                <td>
                  {Number(event.revenue).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrganizerEventsTable
