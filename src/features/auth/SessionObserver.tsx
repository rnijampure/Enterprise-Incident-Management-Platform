// src/features/auth/SessionObserver.tsx
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { updateToken, logOut, refreshAccessToken } from "./slice/authSlice";
import api from "./api/authInterceptor";
import { CircularProgress, Box } from "@mui/material";

export const SessionObserver = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [initializing, setInitializing] = useState(true);
  const { isLoggedIn, accessToken } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      // 👈 Add !isLoading guard
      dispatch(refreshAccessToken());
    }
  }, [isLoggedIn, accessToken, dispatch]);
  useEffect(() => {
    const verifySession = async () => {
      // If we have a user in localStorage but no memory token yet
      if (user) {
        try {
          const response = await api.get("/user/refresh");
          dispatch(updateToken(response.data.accessToken));
        } catch (err) {
          dispatch(logOut());
        }
      }
      setInitializing(false);
    };
    verifySession();
  }, [dispatch, user]);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Even if we don't have an accessToken in memory,
        // the cookie is still in the browser.
        await dispatch(refreshAccessToken()).unwrap();
      } catch (err) {
        console.log("No valid session found.");
      }
    };

    initializeAuth();
  }, []); // Empty dependency array runs ONCE on hard reload
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

  return <>{children}</>;
};
