// src/features/dashboard/charts/MonthlyTrendChart.tsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { Incident } from "../../../../types/types";
import Box from "@mui/material/Box";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

type Props = {
  incidents?: Incident[];
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthlyTrendChart: React.FC<Props> = ({ incidents }) => {
  if (!incidents || incidents.length === 0) return <div>No data</div>;

  const now = new Date();

  // ✅ Generate last 12 months in correct order
  const last12Months: { label: string; year: number; month: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last12Months.push({
      label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }

  // ✅ Count incidents per month-year
  const monthlyCounts = incidents.reduce<Record<string, number>>(
    (acc, incident) => {
      const d = new Date(incident.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {},
  );

  const data = {
    labels: last12Months.map((m) => m.label),
    datasets: [
      {
        label: "Incidents Created",
        data: last12Months.map(
          (m) => monthlyCounts[`${m.year}-${m.month}`] || 0,
        ),
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78,121,167,0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 600,
      easing: "easeOutCubic",
    },
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <Box sx={{ width: "100%", height: { xs: 280, md: 350 } }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default MonthlyTrendChart;
