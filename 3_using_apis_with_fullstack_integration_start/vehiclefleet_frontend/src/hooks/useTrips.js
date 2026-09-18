import { useQuery } from "@tanstack/react-query";

import { fetchTrips } from "../api/fleet";

export function useDrivers() {
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