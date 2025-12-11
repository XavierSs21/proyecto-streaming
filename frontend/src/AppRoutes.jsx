import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"
import Login from "./pages/Login"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
        <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes