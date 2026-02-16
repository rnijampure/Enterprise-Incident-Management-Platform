// src/components/routing/PrivateRoute.tsx
import { type ReactNode } from "react";
import { useSelector } from "react-redux";
//import { selectIsLoggedIn } from "../../features/auth/authSelectors";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  // const isLoggedIn = useSelector(true); // Replace with actual selector
  const isLoggedIn = true;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
