import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LineGraph({
  dates,
  values,
  label,
  percent,
  width,
  height,
}) {
  // Prepare data array to pass to Recharts
  const data = dates.map((date, index) => ({
    date,
    impressions: values.impressions[index] || 0,
    clicks: values.clicks[index] || 0,
    ctr:
      values.clicks[index] && values.impressions[index]
        ? ((values.clicks[index] / values.impressions[index]) * 100).toFixed(2)
        : 0.0, // Click through rate
  }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        className="legend"
        style={{
          position: "absolute",
          top: "-36px", // Adjust the position to float above the chart
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Centering using transform
          backgroundColor: "#000", // Background color to make it look like a card
          padding: "8px 16px", // Padding for spacing
          borderRadius: "5px", // Rounded corners for a card-like effect
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Light shadow for depth
          zIndex: 1000, // Ensures the legend appears above the chart
          display: "flex", // Aligns items horizontally
          alignItems: "center", // Vertically centers items
          justifyContent: "center", // Centers items within the div
          gap: "62px", // Adds space between legend items
          paddingLeft: "40px",
        }}
      >
        {/* Custom legend items */}
        <span
          className="legend_bullet"
          style={{
            color: "#2196f3",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "var(--font1)",
          }}
        >
          Impressions
        </span>
        <span
          className="legend_bullet"
          style={{
            color: "#f0ca35",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "var(--font1)",
          }}
        >
          Clicks
        </span>
        <span
          className="legend_bullet"
          style={{
            color: "#cd5c5c",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "var(--font1)",
          }}
        >
          Click through rate
        </span>
      </div>
      <ResponsiveContainer width={width || "100%"} height={height || 250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            stroke="#fff" // Change axis text color to white
            style={{ fontSize: 14, fill: "#fff" }} // Ensure text is white
          />
          <YAxis
            yAxisId="left"
            stroke="#fff" // Change axis text color to white
            style={{ fontSize: 14, fill: "#fff" }} // Ensure text is white
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              borderRadius: "5px",
              boxShadow: "0px 0px 12px #1114",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "white",
              padding: "8px 20px",
              minWidth: "100px",
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke=" #2196F3"
            strokeWidth={2}
            dot={{
              stroke: " #2196F3",
              strokeWidth: 2,
              fill: "#555",
              r: 2,
            }}
            activeDot={{ r: 4, stroke: " #2196F3", strokeWidth: 3 }}
            animationDuration={500}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="#f0ca35"
            strokeWidth={2}
            dot={{
              stroke: "#f0ca35",
              strokeWidth: 2,
              fill: "#555",
              r: 2,
            }}
            activeDot={{ r: 4, stroke: "#f0ca35", strokeWidth: 3 }}
            animationDuration={500}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="ctr"
            stroke="#cd5c5c"
            strokeWidth={2}
            dot={{
              stroke: "#cd5c5c",
              strokeWidth: 2,
              fill: "#555",
              r: 2,
            }}
            activeDot={{ r: 4, stroke: "#cd5c5c", strokeWidth: 3 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
