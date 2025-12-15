import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import AdminPage from "./pages/AdminPage"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./components/ProtectedRoute"
import Movies from "./pages/Movies"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path="/movies" element={<Layout><Movies/></Layout>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/admin-page" 
          element={
            <ProtectedRoute>
              <AdminPage/>
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
  )
}

export default AppRoutes