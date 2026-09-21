export default function StatCard({ label, value, color }) {
  return <div className="card shadow-md">
    <div className="card-body">
      <p className="text-sm font-medium opacity-80">{label}</p>
      <div className="text-4xl font-bold">
        {value}
      </div>
    </div>
  </div>
}