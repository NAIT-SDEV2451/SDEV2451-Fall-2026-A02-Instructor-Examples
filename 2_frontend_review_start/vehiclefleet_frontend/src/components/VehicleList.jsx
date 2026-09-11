// this is going to just be a static component first.
export default function VehicleList({vehicles}) {
  // we are destructuring the params for vehicles with the {}
  // remember that in a component you return a single node.
  return (
    <div className="overflow-x-auto"> {/* className is used for class instead react */}
      <table className="table table-zebra w-full">
        <thead>

        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}