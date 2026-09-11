import { useState } from 'react'

// create an empty form state that's a constant
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

  return <></>
}