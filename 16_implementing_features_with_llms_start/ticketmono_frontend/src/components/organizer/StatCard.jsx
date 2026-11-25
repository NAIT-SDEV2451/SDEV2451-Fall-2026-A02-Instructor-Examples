function StatCard({ label, value }) {
  return (
    <div className="bg-base-100 border border-base-300 rounded-box p-4">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default StatCard
