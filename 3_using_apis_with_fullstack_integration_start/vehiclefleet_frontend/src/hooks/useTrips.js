import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { fetchTrips, createTrip } from "../api/fleet";

export function useTrips() {
    const {
      data: trips = [],
      isLoading,
      isError,
      error
    } = useQuery({
      queryKey: ['trips'],
      queryFn: fetchTrips
    })

    return {
      trips,
      isLoading,
      isError,
      error
    }
}

export function useCreateTrip() {
  // this is kind of a way we can modify the entire
  // state of the react query.
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTrip, // the func we'll call.
    onSuccess: () => {
      // called when the promise (fetch) is successful
      queryClient.invalidateQueries({
        queryKey: ['trips']
      })
    }
  })
}