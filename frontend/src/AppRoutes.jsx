import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/home-page" element={<Layout><HomePage/></Layout>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes