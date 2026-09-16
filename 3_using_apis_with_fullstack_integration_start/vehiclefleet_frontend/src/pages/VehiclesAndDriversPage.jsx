import VehicleList from '../components/VehicleList'
import DriverList from '../components/DriverList'
import { VEHICLES, DRIVERS } from '../mockData'

// we're going to use the hook
import { useVehicles } from '../hooks/useVehicles'

function VehiclesAndDriversPage() {
  // we're going to use our new hook to get that data
  // fetches when we call it immediately.
  const {
    vehicles, // data from the server.
    isLoading,
    isError,
    error
  } = useVehicles()

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-semibold mb-3">Vehicles</h2>
        {/* instead of mock data we're going to use our data here */}
        { isLoading
          ? <span className='loading loading-spinner loading-md'></span>
          : <VehicleList vehicles={vehicles} />
        }
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Drivers</h2>
        <DriverList drivers={DRIVERS} />
      </section>
    </div>
  )
}

export default VehiclesAndDriversPage
