import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

export default function AverageDistanceChart({data}) {
  // reshaping of the data
  const chartData = data.map((entry) => {
    return entry
  })

  return <div className="card bg-base-100 shadow-md">
    <div className="card-body">
      <h3 className="card-title text-base">
        Average Distance Per Week
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{top: 5, right:16, left:0, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* let's define the x axis week as the key */}
          <XAxis
            dataKey="week"
            tick={{fontSize: 12, fill: "orange"}}
          />
          <YAxis
            unit=" km"
            width={70}
            tick={{fontSize: 12, fill: "blue"}}
          />
          {/* tool tips or for on hover */}
          <Tooltip
            formatter={(value)=> [`${value} km`, "Avg Distance"]}
          />
          {/* let's add the height of the bars which is the
          avg_distance key */}
          <Bar dataKey="avg_distance"
            fill="red"
            radius={[5,5,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  </div>

}