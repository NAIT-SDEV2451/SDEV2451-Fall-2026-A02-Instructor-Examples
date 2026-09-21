import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { fetchVehicles } from '../api/fleet'

// we need value to of search to be passed to the hook
export function useVehicles(search = "") {
  const { data: vehicles = [], isLoading, isError, error } = useQuery({
    // expand key so it includes search
    queryKey: ['vehicles', search],
    // we need to pass it to the queryfn
    queryFn: () => fetchVehicles({
      // left is the search key on fetchVehicles
      // right is the search we'll pass into our hook.
      search: search
    }),
    // below is just so that it doesn't blink.
    placeholderData: keepPreviousData,
    // while it's loading the new request it's keeping
    // the old data.
  })
  return { vehicles, isLoading, isError, error }
}
