import Paper from "@mui/material/Paper";
import { lazy, Suspense } from "react";
import { useGetIncidentsQuery } from "../incident/api/incidentApi";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Lazy load components
const SummarySection = lazy(
  () => import("../dashboard/summary/summarysection"),
);
const IncidentDataGrid = lazy(
  () => import("../dashboard/IncidentDataGrid/IncidentDataGrid"),
);
const StatusPieChart = lazy(() => import("./charts/charts/StatusPieChart"));
const DepartmentBarChart = lazy(
  () => import("./charts/charts/DepartmentBarChart"),
);
const TrendChart = lazy(() => import("./charts/charts/TrendChart"));

// Fallback loader
const loader = (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: 5,
    }}
  >
    ...Loading
  </Box>
);

const Layout = () => {
  const { data } = useGetIncidentsQuery({});
  const incidents = data?.data ?? [];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Summary Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Monthly Incidents Quick Summary</h3>
          <Suspense fallback={loader}>
            <SummarySection />
          </Suspense>
        </Box>
        <p style={{ marginTop: 5 }}>Quick view of this month’s incidents</p>
      </Paper>

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* LEFT COLUMN: DataGrid + Trend */}
        <Grid
          size={{ xs: 12, md: 12 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* DataGrid */}
          <Paper sx={{ flex: 1, minHeight: 450, overflow: "hidden" }}>
            <Suspense fallback={<div>Loading Grid...</div>}>
              <IncidentDataGrid incidents={incidents} />
            </Suspense>
          </Paper>

          {/* Trend Chart */}
          <Paper sx={{ height: 300 }}>
            <Suspense fallback={loader}>
              <TrendChart incidents={incidents} />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
      {/* RIGHT COLUMN: Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Suspense fallback={loader}>
              <StatusPieChart incidents={incidents} />
            </Suspense>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Suspense fallback={loader}>
              <DepartmentBarChart incidents={incidents} />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
