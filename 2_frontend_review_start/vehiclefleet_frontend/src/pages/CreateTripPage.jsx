// import the mock data
import { VEHICLES, DRIVERS } from '../mockData'
// import the trip form.
import TripForm from '../components/TripForm'

export default function CreateTripPage() {

  // we're going to create a handler and pass it down
  // for the submission event.
  const handleSubmit = (formData) => {
    // this is going to post in the future
    // once we hook it up.
    console.log("handleSubmit called")
    console.log(formData)
  }

  return <div>
    <h2 className="text-xl font-semibold mb-4">
      Create a new Trip
    </h2>
    {/* we're going to use our component */}
    <TripForm
      vehicles={VEHICLES}
      drivers={DRIVERS}
      onSubmit={handleSubmit}
    />
    {/* we're passing the reference to the function
    handleSubmit without calling it because the
    component will call it when the form submits. */}
  </div>
}