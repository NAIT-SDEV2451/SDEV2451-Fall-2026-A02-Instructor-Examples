import { useQuery } from '@tanstack/react-query'
import { fetchOrder } from '../api/orders'

export function useOrder(id) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => fetchOrder(id)
    // reminder the reason why where using () => fetchOrder(id)
    // is that we're passing a reference to an anonymous function
    // because we want useOrder to call it when appropriate, and not
    // immediately.
  })
}
