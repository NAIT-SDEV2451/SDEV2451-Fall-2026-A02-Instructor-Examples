// we're goign to pass the entire trip in so that we can make this work.
import TripCard from "./TripCard"

export default function TripInfo({trip}) {
  const {
    vehicle_detail,
    driver_detail,
    start_location,
    end_location,
    start_time,
    distance
  } = trip

  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <TripCard
      label="Vehicle"
      title={vehicle_detail.license_plate}
      subtitle={
        `${vehicle_detail.make} ${vehicle_detail.model} ${vehicle_detail.year}`
      }
    />
    <TripCard
      label="Driver"
      title={driver_detail.name}
      subtitle={`License ${driver_detail.license_number}`}
    />
    <TripCard
      label="Route"
      title={`${start_location} to ${end_location}`}
      subtitle={`${distance ? `${distance} km`: "in Progress"}`}
    />
  </div>

}