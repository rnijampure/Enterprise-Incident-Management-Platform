import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { Incident } from "../../../../types/types";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

type StatusPieChartProps = {
  incidents?: Record<string, Incident>;
};
const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    tooltip: { enabled: true },
  },
  animation: {
    animateRotate: true, // slices rotate into place
    animateScale: true, // slices scale up from center
    duration: 900, // 1.5 seconds by default
    easing: "easeOutCubic", // easing function controlling speed curve
  },
};

const COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
];

const StatusPieChart: React.FC<StatusPieChartProps> = ({ incidents }) => {
  if (!incidents || Object.keys(incidents).length === 0)
    return <div>No data</div>;

  const statusCounts: Record<string, number> = {};
  Object.values(incidents).forEach((incident) => {
    const status = incident.status || "unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (_, i) => COLORS[i % COLORS.length],
        ),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 200, sm: 320, md: 200 },
      }}
    >
      <Pie data={data} options={options} />
    </Box>
  );
};

export default StatusPieChart;
