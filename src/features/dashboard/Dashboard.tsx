import React from "react";
import Layout from "../summary/layout";

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
