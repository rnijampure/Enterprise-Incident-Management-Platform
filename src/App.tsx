import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Layout from "./component/layout/layout";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import {
  updateToken,
  logOut,
  refreshAccessToken,
} from "./features/auth/slice/authSlice";
// Lazy load your features to fix that LCP/TBT issue
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));
//const Incidents = lazy(() => import("./features/incidents/IncidentsList"));
import { useGetLookupsQuery } from "./features/lookups/api/lookupApi";
import { useAppDispatch, useAppSelector } from "./app/hooks/hooks";
import api from "./features/auth/api/authInterceptor";
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
  //const { isLoggedIn, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { isLoggedIn, accessToken } = useAppSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      // If we have a user in localStorage (initialized in slice), try to get a fresh token
      if (user) {
        try {
          const response = await api.get("/user/refresh");
          dispatch(updateToken(response.data.accessToken));
        } catch (err) {
          // If the cookie is expired or invalid, clear the stale user data
          //dispatch(logOut());
        }
      }
      setInitializing(false);
    };

    verifySession();
  }, [dispatch, user]);

  useEffect(() => {
    const verifySession = async () => {
      try {
        // This calls your /refresh endpoint
        // It sends the HttpOnly cookie automatically
        await dispatch(refreshAccessToken()).unwrap();
      } catch (err) {
        console.error("Session expired or no refresh token found.");
        dispatch(logOut());
      }
    };

    if (!accessToken) {
      verifySession();
    }
  }, [accessToken, dispatch]);
  // Show a professional loader while checking the session
  if (initializing) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  useGetLookupsQuery();
  return <RouterProvider router={router} />;
}
