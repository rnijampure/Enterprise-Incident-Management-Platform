//incident-management\src\features\dashboard\Dashboard.tsx
import React from "react";
import Layout from "./layout";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Layout />
    </div>
  );
};

export default Dashboard;
