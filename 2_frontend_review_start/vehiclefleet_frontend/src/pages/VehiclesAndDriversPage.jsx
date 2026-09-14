// this is going to be one of our pages.
// import the mock data and call the components that make sense.
import { VEHICLES, DRIVERS } from '../mockData'
// import the components as well.
import VehicleList from '../components/VehicleList'
import DriverList from '../components/DriverList'

export default function VehiclesAndDriversPage() {
  return <div className="flex flex-col gap-8">
    <section>
      <h2 className="text-xl font-semibold mb-3">Vehicles</h2>
      {/* we need to use our knowledge of JSX to actally call this component with the
      right props for us */}
      <VehicleList vehicles={VEHICLES} />
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-3">Drivers</h2>
      <DriverList drivers={DRIVERS} />
    </section>
  </div>
}