export const useAuth = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAuthenticated = !!token;
  const isAdmin = user?.rol === "admin";

  return {
    user,
    isAuthenticated,
    isAdmin,
  };
};