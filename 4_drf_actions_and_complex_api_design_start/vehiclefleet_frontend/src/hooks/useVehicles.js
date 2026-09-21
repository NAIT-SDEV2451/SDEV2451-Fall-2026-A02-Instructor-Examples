import { useQuery } from '@tanstack/react-query'
import { fetchVehicles } from '../api/fleet'

// we need value to of search to be passed to the hook
export function useVehicles(search = "") {
  const { data: vehicles = [], isLoading, isError, error } = useQuery({
    queryKey: ['vehicles'],
    // we need to pass it to the queryfn
    queryFn: () => fetchVehicles({
      // left is the search key on fetchVehicles
      // right is the search we'll pass into our hook.
      search: search
    }),
  })
  return { vehicles, isLoading, isError, error }
}
