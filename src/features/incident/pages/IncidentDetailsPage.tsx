import { Paper, Grid, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { IncidentDetailsForm } from "../Edit/IncidentDetailsForm";
import { useGetIncidentsQuery } from "../api/incidentApi";
import Box from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import IncidentUpdatesList from "./incidentUpdate";
import IncidentCommentsUpdatesList from "./incidentCommentsUpdate";
const IncidentDetailsPage = () => {
  const { id } = useParams();
  const { data: incidentList, isLoading } = useGetIncidentsQuery({});

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <CircularProgress />
        <p>Loading incident details...</p>
      </Box>
    );
  }

  // Find the selected incident by ID
  const selectedIncident = incidentList?.data.find(
    (item: any) => item._id === id,
  );

  if (!selectedIncident) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <h3>Incident not found</h3>
        </Paper>
      </Box>
    );
  }

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
          <h3 style={{ margin: 0 }}>
            Incident Details:
            {selectedIncident.title}
          </h3>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0px solid",
              borderColor: "divider",
              borderRadius: 1,
              bgcolor: "background.paper",
              fontSize: "12px",
              padding: "0 5px",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
              [`& .${dividerClasses.root}`]: {
                mx: 0.5,
              },
              "& p": {
                padding: "2px 5px ",
              },
            }}
          >
            <p>{selectedIncident?.assignee?.name}</p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p>
              {new Date(selectedIncident.createdAt).toISOString().split("T")[0]}
            </p>

            <Divider orientation="vertical" variant="middle" flexItem />
            <p>{selectedIncident.status}</p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p>{selectedIncident.severity}</p>
          </Box>
        </Box>
      </Paper>

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* Left Column: Incident Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 450,
              overflow: "hidden",
              p: 2,
              // Removed fixed width: "200px" to allow Grid to control width
            }}
          >
            <IncidentDetailsForm {...selectedIncident} />
          </Paper>
        </Grid>

        {/* Right Column: Activity Feed (IncidentUpdatesList) */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 450, // Matched height with the form for symmetry
              p: 2,
              // Removed fixed width: "500px" to allow Grid to control width
            }}
          >
            <Suspense fallback={<div>Loading Activity...</div>}>
              {/* Pass the id string safely */}
              <IncidentUpdatesList updatesId={id as string} />
            </Suspense>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 450, // Matched height with the form for symmetry
              p: 2,
              // Removed fixed width: "500px" to allow Grid to control width
            }}
          >
            <Suspense fallback={<div>Loading Activity...</div>}>
              {/* Pass the id string safely */}
              <IncidentCommentsUpdatesList updatesId={id as string} />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>

      {/* Right Column: Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Suspense fallback={<div>Loading Chart...</div>}></Suspense>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Suspense fallback={<div>Loading Chart...</div>}></Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncidentDetailsPage;
