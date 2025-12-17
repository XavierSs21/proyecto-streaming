import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUser } from "@/api/UserApi";

const ProtectedRoute = ({ allowedRoles }) => {
  const { data: user, isLoading, isError } = useGetCurrentUser();

  if (isLoading) return <p>Cargando...</p>;

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/home-page" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
