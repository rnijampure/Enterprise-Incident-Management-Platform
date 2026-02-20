import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "react-chartjs-2";
import type { Incident } from "../../../../types/types";

type DepartmentBarChartProps = {
  incidents?: Incident[];
};

const DepartmentBarChart: React.FC<DepartmentBarChartProps> = ({
  incidents,
}) => {
  if (!incidents || incidents.length === 0) return <div>No data</div>;

  const countsByDept = incidents.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.department] = (acc[cur.department] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(countsByDept).map(([department, value]) => ({
    department,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentBarChart;
