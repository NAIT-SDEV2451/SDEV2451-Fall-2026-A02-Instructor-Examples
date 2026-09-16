// we're goign to create a hook that will make the request
// but will also give us all the states if it's an error or
// it's loading.

// import useQuery
import { useQuery } from "@tanstack/react-query";

// import our fetching function here.
import { fetchVehicles } from "../api/fleet";

export function useVehicles() {
  // this is doing a try catch and handling the error states.
  const {
    data: vehicles = [], // obj destructuring we're renaming data to vehicles.
    isLoading, // boolean if it's fetching.
    isError, // boolean if an error
    error
  } = useQuery({
    queryKey: ['vehicles'], // how we can refetch (by invalidating this key)
    queryFn: fetchVehicles // explicitly the fetching function
  })

  // return all the information
  return {
    vehicles,
    isLoading,
    isError,
    error
  }
}