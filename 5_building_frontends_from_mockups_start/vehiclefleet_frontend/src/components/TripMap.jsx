
// right now this is a placeholder but we'll be using react leaflet to integrate
// the maps.
export default function TripMap({ startLocation, endLocation }) {
  return <div className="card bg-base-200 shadow-sm">
    <div className="card-body items-center justify-center min-h-48 text-base-content/40 text-sm">
      route map — {startLocation} → {endLocation}
    </div>
  </div>
}