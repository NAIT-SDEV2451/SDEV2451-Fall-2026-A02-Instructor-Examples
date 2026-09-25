// import our react query.
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

// import our fetching functions
import {
  startTrip,
  completeTrip,
  fetchTripMap
} from '../api/fleet'

export function useTripDetails(id) {
  const queryClient = useQueryClient()

  // query for the trip map data.
  const {
    data: trip = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['trip-map', id],
    queryFn: () => fetchTripMap(id)
  })

  // mutation to start the trip

  // mutation to end the trip

  return {
    trip,
    isLoading,
    isError,
    error,
  }
}