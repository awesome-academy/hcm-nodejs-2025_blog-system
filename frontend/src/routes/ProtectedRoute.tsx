import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredRole?: "user" | "author" | "admin";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
