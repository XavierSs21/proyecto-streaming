import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navRef = useRef(null);
  const location = useLocation();

  const pathname = location.pathname || "/";
  const active = pathname === "/" ? "home" : pathname.startsWith("/movies") ? "movies" : pathname.startsWith("/series") ? "series" : pathname.startsWith("/my-list") ? "mylist" : "";

  return (
    <header className="absolute top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent">
<div className="container px-0 flex h-14 items-center"> 
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 ml-4 md:ml-6 lg:ml-8 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-yellow-400" />
            <span className="hidden font-bold sm:inline-block text-white">
              IndieStream
            </span>
          </Link>
        </div>

        {/* Navegación, Iconos y Perfil a la derecha */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Nav con flechas para desplazarse y selección amarilla */}
          <div className="hidden items-center md:flex md:space-x-2">
            <nav
              ref={navRef}
              className="max-w-xs overflow-x-auto scrollbar-hide items-center space-x-4 text-sm font-medium"
              aria-label="Principal"
            >
              <Link
                to="/"
                className={`inline-block px-3 py-1 rounded transition-colors ${
                  active === "home" ? "bg-yellow-400 text-black" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                Home
              </Link>
              <Link
                to="/movies"
                className={`inline-block px-3 py-1 rounded transition-colors ${
                  active === "movies" ? "bg-yellow-400 text-black" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                Movies
              </Link>
              <Link
                to="/series"
                className={`inline-block px-3 py-1 rounded transition-colors ${
                  active === "series" ? "bg-yellow-400 text-black" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                Series
              </Link>
              <Link
                to="/my-list"
                className={`inline-block px-3 py-1 rounded transition-colors ${
                  active === "mylist" ? "bg-yellow-400 text-black" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                My List
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-amber-500 text-black hover:bg-amber-600">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
