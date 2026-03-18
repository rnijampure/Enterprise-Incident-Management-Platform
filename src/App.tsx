import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./component/layout/layout";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Lazy load your features to fix that LCP/TBT issue
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));
//const Incidents = lazy(() => import("./features/incidents/IncidentsList"));
import { useGetLookupsQuery } from "./features/lookups/api/lookupApi";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // This is your wrapper
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        ),
      },
      /*    { 
        path: "incidents",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Incidents />
          </Suspense>
        ),
      }, */
    ],
  },
]);

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  useGetLookupsQuery();
  return <RouterProvider router={router} />;
}
