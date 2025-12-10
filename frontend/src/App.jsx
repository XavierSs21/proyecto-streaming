import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Header from "@/components/Header";
//import Footer from "@/components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen"> {/* Añadimos min-h-screen para asegurar que el main ocupe toda la altura */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Aquí irán tus otras rutas en el futuro */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
