
import { useAuth } from "@/api/auth";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }else if (isAdmin){
    return <Navigate to="/admin-page" replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;

