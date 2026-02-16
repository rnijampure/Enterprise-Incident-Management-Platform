import Paper from "@mui/material/Paper";
import React from "react";
import SummarySection from "./summarysection";

const Layout = () => {
  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: "10px 25px",
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>Summary Layout</h3>
        <p>
          This is the summary layout. You can add your summary components here.
        </p>
        <SummarySection />
      </Paper>
    </div>
  );
};

export default Layout;
