import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Film, Search, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Film className="w-8 h-8 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold text-white">IndieStream</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Inicio
            </a>
            <a href="#peliculas" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Películas
            </a>
            <a href="#categorias" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Categorías
            </a>
            <a href="#creadores" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Creadores
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-300 hover:text-amber-400 hover:bg-white/10"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/login">
              <Button 
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <User className="w-5 h-5 mr-2" />
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Registrarse
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                Inicio
              </a>
              <a href="#peliculas" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                Películas
              </a>
              <a href="#categorias" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                Categorías
              </a>
              <a href="#creadores" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                Creadores
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
                <Link to="/login">
                  <Button variant="outline" className="w-full border-zinc-700 text-white">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}