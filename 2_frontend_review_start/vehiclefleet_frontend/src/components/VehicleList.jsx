// this is going to just be a static component first.
export default function VehicleList({vehicles}) {
  // we are destructuring the params for vehicles with the {}
  // remember that in a component you return a single node.
  return (
    <div className="overflow-x-auto"> {/* className is used for class instead react */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>License Plate</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle)=> {
            // lists need a key.
            return <tr key={vehicle.id}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.license_plate}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}