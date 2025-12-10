import { Link } from "react-router-dom";
import { Clapperboard, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="absolute top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent">
      <div className="container flex h-14 items-center">
        {/* Logo y Navegación Principal */}
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-yellow-400" />
            <span className="hidden font-bold sm:inline-block text-white">
              IndieStream
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link to="/" className="transition-colors text-gray-300 hover:text-yellow-400">
              Home
            </Link>
            <Link to="/movies" className="transition-colors text-gray-300 hover:text-yellow-400">
              Movies
            </Link>
            <Link to="/series" className="transition-colors text-gray-300 hover:text-yellow-400">
              Series
            </Link>
            <Link to="/my-list" className="transition-colors text-gray-300 hover:text-yellow-400">
              My List
            </Link>
          </nav>
        </div>

        {/* Iconos y Perfil a la derecha */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificaciones</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">Memo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Ajustes</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;