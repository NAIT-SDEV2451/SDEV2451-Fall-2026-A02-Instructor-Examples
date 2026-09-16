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
      {/* handle the submit on the form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* Vehicle select */}
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
        {/* driver Select */}
        <div className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-medium">Driver</span>
          </div>
          {/* the onChange is the js change event  */}
          <select
            name="driver"
            value={form.driver}
            onChange={handleChange}
            className="select select-bordered w-full" required>
            <option value="" disabled>Select a driver</option>
            {/* Loop over the options of drivers */}
            {drivers.map((driver) => {
              return <option key={driver.id} value={driver.id}>
                {driver.name} - {driver.license_number}
              </option>
            })}
          </select>
        </div>
        {/* Title divider */}
        <div className="divider divider-start text-xs mt-0 mb-0 text-base-content/50">
          Route Locations
        </div>
        {/* Input for our locations */}
        <div className="grid grid-cols-1 gap-4">
          {/* is going to be the control for the input */}
          {/* Start location input */}
          <div className="form-control w-full">
            {/* the label */}
            <div className="label pb-1">
              <label className="label-text font-medium">Start Location</label>
            </div>
            {/* the input that will handle */}
            <input
              type="text"
              name="start_location"
              value={form.start_location}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. Warehouse a"
              required
            />
          </div>
          {/* end location input */}
          <div className="form-control w-full">
            {/* the label */}
            <div className="label pb-1">
              <label className="label-text font-medium">End Location</label>
            </div>
            {/* the input that will handle */}
            <input
              type="text"
              name="end_location"
              value={form.end_location}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. Warehouse a"
              required
            />
          </div>
        </div>
        {/* Scheduling title  */}
        <div className="divider divider-start text-xs mt-0 mb-0 text-base-content/50">
          Scheduling
        </div>
        {/* Start time input
        make this input controlled with state.
        */}
        <div className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-medium">Start Time</span>
          </div>
          <input
            type="datetime-local"
            name="start_time"
            value={form.value}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="card-actions justify-end pt-2">
          <button type="submit" className="btn btn-primary">Create Trip</button>
        </div>
      </form>
    </div>
  </div>
}