import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"
import Login from "./pages/Login"

const AppRoutes = () => {
  return (
    //ahora en cada ruta lo pueden envolver en el layout y ya se va ver el 
    //header y footer sin necesidad de agregarlo manualmente :) hehe soy paloma
    <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
        <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes