import { useQuery } from '@tanstack/react-query'
import { fetchOrganizerEvents } from '../api/events'
import { useAuth } from './useAuth'

export function useOrganizerEvents() {
  const { user } = useAuth()

  return useQuery({
    // The response depends on who is logged in, so the user id is in the key.
    // Otherwise a second organizer in the same tab would see cached data.
    queryKey: ['organizer-events', user.id],
    queryFn: fetchOrganizerEvents,
  })
}
