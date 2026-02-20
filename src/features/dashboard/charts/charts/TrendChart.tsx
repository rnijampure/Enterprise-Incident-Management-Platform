// src/features/dashboard/charts/TrendChart.tsx
import React from "react";
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
import { Line } from "react-chartjs-2";
import type { Incident } from "../../../../types/types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

type TrendChartProps = {
  incidents?: Incident[];
};

type Granularity = "daily" | "weekly" | "fortnightly";

const TrendChart: React.FC<TrendChartProps> = ({ incidents }) => {
  const theme = useTheme();
  const [granularity, setGranularity] = React.useState<Granularity>("weekly");

  const handleGranularityChange = (
    _: React.MouseEvent<HTMLElement>,
    value: Granularity | null,
  ) => {
    if (value) setGranularity(value);
  };

  const controlStyles = {
    backgroundColor: "background.paper", // Uses your #ffffff or #2c2c3e
    borderRadius: "2px",
    border: "1px solid",
    borderColor: "divider",
    // Use a function to access your customShadows correctly
    boxShadow: (theme: any) => theme.customShadows?.button,

    "& .MuiToggleButton-root.custom-toggle-btn": {
      border: "none",
      borderRadius: "8px",
      margin: "0 2px",
      padding: "6px 16px",
      textTransform: "capitalize",
      fontWeight: 500,
      color: "text.secondary",
      transition: "all 0.2s ease-in-out",

      // The "Magic" fix for CSS Variable Themes
      "&.Mui-selected.custom-toggle-btn": {
        backgroundColor: "primary.main", // MUI maps this to your #5e60ce automatically
        color: "#fff",
        "&:hover": {
          backgroundColor: "primary.dark", // MUI calculates the darker version automatically
        },
      },

      "&:hover": {
        backgroundColor: "action.hover",
      },
    },
  };

  // ---------------- Aggregation Functions ----------------
  const aggregateDaily = (data: Incident[]) => {
    const counts: Record<string, number> = {};
    const labels: string[] = [];

    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      console.log("key", key.split("-")[1] + "" + key.split("-")[2]);
      counts[key] = 0;
      labels.push(key);
    }

    data.forEach((inc) => {
      const key = new Date(inc.createdAt).toISOString().split("T")[0];
      if (counts[key] !== undefined) counts[key]++;
    });

    return { labels, counts: labels.map((l) => counts[l]) };
  };

  const aggregateWeekly = (data: Incident[]) => {
    const counts: Record<string, number> = {};
    const labelsSet = new Set<string>();

    data.forEach((inc) => {
      const d = new Date(inc.createdAt);
      const year = d.getFullYear();
      const week = Math.ceil(
        ((d.getTime() - new Date(year, 0, 1).getTime()) /
          (1000 * 60 * 60 * 24) +
          new Date(year, 0, 1).getDay() +
          1) /
          7,
      );
      const key = `W${week}-${year}`;
      counts[key] = (counts[key] || 0) + 1;
      labelsSet.add(key);
    });

    const labels = Array.from(labelsSet).sort();
    return { labels, counts: labels.map((l) => counts[l]) };
  };

  const aggregateFortnightly = (data: Incident[]) => {
    const counts: Record<string, number> = {};
    const labelsSet = new Set<string>();

    data.forEach((inc) => {
      const d = new Date(inc.createdAt);
      const year = d.getFullYear();
      const start = new Date(year, 0, 1);
      const dayOfYear =
        Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const fortnight = Math.ceil(dayOfYear / 14);
      const key = `F${fortnight}-${year}`;
      counts[key] = (counts[key] || 0) + 1;
      labelsSet.add(key);
    });

    const labels = Array.from(labelsSet).sort();
    return { labels, counts: labels.map((l) => counts[l]) };
  };

  // ---------------- Memoized chart data ----------------
  const chartData = React.useMemo(() => {
    if (!incidents || incidents.length === 0) return { labels: [], counts: [] };

    switch (granularity) {
      case "daily":
        return aggregateDaily(incidents);
      case "fortnightly":
        return aggregateFortnightly(incidents);
      default:
        return aggregateWeekly(incidents);
    }
  }, [granularity, incidents]);

  // ---------------- Chart.js options ----------------
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 500,
      easing: "easeOutCubic",
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Incidents",
        data: chartData.counts,
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78,121,167,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: 230 }}>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <ToggleButtonGroup
          value={granularity}
          exclusive
          onChange={handleGranularityChange}
          size="small"
          sx={controlStyles}
        >
          <ToggleButton value="daily" className="custom-toggle-btn">
            Daily
          </ToggleButton>
          <ToggleButton value="weekly" className="custom-toggle-btn">
            Weekly
          </ToggleButton>
          <ToggleButton value="fortnightly" className="custom-toggle-btn">
            Fortnightly
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Line data={data} options={options} />
    </div>
  );
};

export default TrendChart;
