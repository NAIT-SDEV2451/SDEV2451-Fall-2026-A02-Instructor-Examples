import { useQuery } from "@tanstack/react-query";

import { fetchTrips } from "../api/fleet";

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