import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Movies from "@/pages/Movies";
import Header from "@/components/Header";
//import Footer from "@/components/layout/Footer";

function App() {
  return (
    <HashRouter>
      <Header />
      <main className="min-h-screen pt-14 px-4 md:px-8 py-8"> {/* Añadimos padding global para dar más espacio a las páginas */}
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
