
export default function TripList({trips}) {
  // ? this in jsx and javascript is an shortened if else statement.
  // && is an if statement that only shows the true condition
  // ?? is a statement that should show the false condition

  return (
    <div className="overflow-x-auto"> {/* className is used for class instead react */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>From</th>
            <th>To</th>
            <th>Start Time</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => {
            return <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.vehicle_detail.make} {trip.vehicle_detail.model}</td>
              <td>{trip.driver_detail.name}</td>
              <td>{trip.start_location}</td>
              <td>{trip.end_location}</td>
              <td>
                {/* we're going to convert this to a date and then use tolocale string */}
                {new Date(trip.start_time).toLocaleString()}
              </td>
              <td>
                {/* if there's no distance we'll say that it's in progress */}
                {trip.distance ?? (
                  <span className="badge badge-warning badge-sm">In progress</span>
                )}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}