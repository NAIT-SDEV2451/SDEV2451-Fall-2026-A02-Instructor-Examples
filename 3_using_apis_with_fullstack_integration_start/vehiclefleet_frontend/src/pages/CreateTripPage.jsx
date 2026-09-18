import { useNavigate } from 'react-router-dom'
import TripForm from '../components/TripForm'
import { VEHICLES, DRIVERS } from '../mockData'

import { useCreateTrip } from '../hooks/useTrips'
import { useVehicles } from '../hooks/useVehicles'
import { useDrivers } from '../hooks/useDrivers'

function CreateTripPage() {
  const navigate = useNavigate()

  const {
    mutate: createTripMutation,
    // mutate/createTripMutation is a function
    // that will execute the mutation
    isPending // like loading
  } = useCreateTrip()
  // the data.
  const { vehicles } = useVehicles()
  const { drivers } = useDrivers()

  function handleSubmit(formData) {
    // In a real app: POST to /api/v1/trips/ then navigate
    console.log('New trip submitted:', formData)
    navigate('/trips')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create a New Trip</h2>
      <TripForm
        vehicles={vehicles}
        drivers={drivers}
        onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateTripPage
