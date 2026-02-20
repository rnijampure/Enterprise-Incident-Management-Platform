// src/features/dashboard/charts/DepartmentBarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { Incident } from "../../../../types/types";
import Box from "@mui/material/Box";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type DepartmentBarChartProps = {
  incidents?: Record<string, Incident>;
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

const DepartmentBarChart: React.FC<DepartmentBarChartProps> = ({
  incidents,
}) => {
  if (!incidents || Object.keys(incidents).length === 0)
    return <div>No data</div>;

  // Aggregate incidents by department
  const deptCounts: Record<string, number> = {};
  Object.values(incidents).forEach((incident) => {
    const dept = incident.department || "Unknown";
    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
  });

  const data = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        label: "Incidents per Department",
        data: Object.values(deptCounts),
        backgroundColor: Object.keys(deptCounts).map(
          (_, i) => COLORS[i % COLORS.length],
        ),
        borderRadius: 6, // rounded bars
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
      },
    },
    animation: {
      duration: 800, // snappy load
      easing: "easeOutCubic", // smooth & fast
    },
    hover: {
      mode: "nearest",
    },
    scales: {
      x: {
        title: { display: true, text: "Departments" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Incidents" },
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <Box
      sx={{
        width: "90%",
        height: { xs: 280, sm: 320, md: 200 },
      }}
    >
      <Bar data={data} options={options} />
    </Box>
  );
};

export default DepartmentBarChart;
