
export default function DriverList({drivers}) {
  return (
    <div className="overflow-x-auto"> {/* className is used for class instead react */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>License Number</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver)=> {

            return <tr>

            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}