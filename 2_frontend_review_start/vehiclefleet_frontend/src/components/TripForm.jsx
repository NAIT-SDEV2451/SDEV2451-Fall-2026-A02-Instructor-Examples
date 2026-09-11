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

  // create some handler which will update the form state.

  // we're going have some handle submit function
  // which will call our onSubmit callback and clear state.

}