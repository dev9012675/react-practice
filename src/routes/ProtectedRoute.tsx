import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/authProvider";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  // Check if the user is authenticated
  if (!user) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
