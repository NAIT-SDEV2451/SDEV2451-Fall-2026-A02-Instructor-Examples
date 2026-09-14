import { useState } from 'react'

// create an empty form state that's a constant
// because of hte handle we're going to use these key names as the names
// of the inputs/selects.
const EMPTY_FORM = {
  vehicle: '',
  driver: '',
  start_location: '',
  end_location: '',
  start_time: ''
}

// the form that creates new trips
export default function TripForm({
  // normal props where we're passing in a list.
  vehicles,
  drivers,
  // you can pass callback functions to your components.
  onSubmit
}) {
  // some form state.
  const [form, setForm] = useState(EMPTY_FORM)

  // form the variable you'll use for the information
  // setForm, this changes form variable when called with contents.
  // EMPTY_FORM is the orig val of form

  // create some handler which will update the form state.
  // this will be called on change for all of the inputs.
  const handleChange = (event) => {
    setForm({
      ...form, // copies all vals from form into a new object.
      [event.target.name]: event.target.value
    })
  }

  // we're going have some handle submit function
  // which will call our onSubmit callback and clear state.
  const handleSubmit = (event) => {
    event.preventDefault()
    // we're going to pass our form to our callback.
    onSubmit(form)
    // later we'll handle the result
    // reset the form.
    setForm(EMPTY_FORM)
  }

  return <div className="card bg-base-100 shadow-md w-full max-w-xl">
    <div className="card-body gap-5">
      <form  className="flex flex-col gap-5">
        <div className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-medium">Vehicle</span>
          </div>
          {/* the onChange is the js change event  */}
          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className="select select-bordered w-full" required>
            <option value="" disabled>Select a vehicle</option>
            {/* Loop over the options of vehicles */}
            {vehicles.map((vehicle) => {
              return <option key={vehicle.id} value={vehicle.id}>
                {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.license_plate}
              </option>
            })}
          </select>
        </div>
        {/* Adding to this a bit later on. */}
        <div className="card-actions justify-end pt-2">
          <button type="submit" className="btn btn-primary">Create Trip</button>
        </div>
      </form>
    </div>
  </div>
}