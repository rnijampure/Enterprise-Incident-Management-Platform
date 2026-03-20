import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/hooks";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();

  // 1. Access the token from your authSlice
  // We use the token as the "Source of Truth" for being logged in
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  // 2. Logic: If no token or no user profile, redirect to login
  if (!token || !user) {
    // We pass the 'from' location so LoginForm can redirect back here after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Authorized: Render the dashboard/incident page
  return <>{children}</>;
}
