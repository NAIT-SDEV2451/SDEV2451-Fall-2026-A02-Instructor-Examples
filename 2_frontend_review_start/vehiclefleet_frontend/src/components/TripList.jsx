
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

        </tbody>
      </table>
    </div>
  )
}