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
    queryFn: () => fetchTripMap(id),
    // in case the id is not defined
    enabled: !!id
  })

  // mutation to start the trip
  const startTripMutation = useMutation({
    mutationFn: () => startTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trip-map', id]
      })
    }
  })

  // mutation to end the trip
  const completeTripMutation = useMutation({
    mutationFn: () => completeTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trip-map', id]
      })
    }
  })


  return {
    trip,
    isLoading,
    isError,
    error,
    startTripMutation,
    completeTripMutation,
  }
}