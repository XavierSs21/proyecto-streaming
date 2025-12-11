import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Movies from "@/pages/Movies";
import Header from "@/components/Header";
//import Footer from "@/components/layout/Footer";

function App() {
  return (
    <HashRouter>
      <Header />
      <main className="min-h-screen"> {/* Añadimos min-h-screen para asegurar que el main ocupe toda la altura */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {/* Aquí irán tus otras rutas en el futuro */}
        </Routes>
      </main>
    </HashRouter>
  )
}

export default App
