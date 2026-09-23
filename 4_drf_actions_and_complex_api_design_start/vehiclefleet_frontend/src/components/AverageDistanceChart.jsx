import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

export default function AverageDistanceChart({data}) {


  return <div className="card bg-base-100 shadow-md">
    <div className="card-body">
      <h3 className="card-title text-base">
        Average Distance Per Week
      </h3>
      <ResponsiveContainer width="100%" height={300} />
    </div>
  </div>

}