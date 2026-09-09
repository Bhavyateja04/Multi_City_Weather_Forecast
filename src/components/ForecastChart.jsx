import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ForecastChart({ forecast, unit }) {
  const chartData = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    ),

    high:
      unit === "C"
        ? day.day.maxtemp_c
        : day.day.maxtemp_f,

    low:
      unit === "C"
        ? day.day.mintemp_c
        : day.day.mintemp_f,
  }));

  return (
    <div
      data-testid="forecast-chart"
      className="mt-6 h-64 w-full"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `${Math.round(value)}°${unit}`
            }
          />

          <Line
            type="monotone"
            dataKey="high"
            name="High"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="low"
            name="Low"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;