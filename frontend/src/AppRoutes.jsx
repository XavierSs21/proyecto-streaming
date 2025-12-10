import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"


const AppRoutes = () => {
  return (
    //ahora en cada ruta lo pueden envolver en el layout y ya se va ver el 
    //header y footer sin necesidad de agregarlo manualmente :) hehe soy paloma
    <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
    </Routes>
  )
}

export default AppRoutes