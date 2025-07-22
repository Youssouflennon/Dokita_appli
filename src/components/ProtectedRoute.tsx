import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

/*   if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  } */

  return <>{children}</>;
};

export default ProtectedRoute;
