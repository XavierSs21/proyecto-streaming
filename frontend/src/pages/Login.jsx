import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const featuredMovies = [
    { title: "El Laberinto" },
    { title: "Sombras" },
    { title: "Luna Roja" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Bienvenido!", {
          description: "Has iniciado sesión correctamente",
        });
      } else {
        toast.error("Error al iniciar sesión", {
          description: data.message || "Credenciales incorrectas",
        });
      }
    } catch (error) {
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Login */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-black p-12">
        <div className="w-full max-w-lg">
          {/* Logo/Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Film className="w-10 h-10 text-amber-400" />
              <h1 className="text-3xl font-bold text-white">IndieStream</h1>
            </div>
            <p className="text-gray-400 text-sm">Cine independiente a tu alcance</p>
          </div>

          {/* Card sin bordes visibles, solo contenido */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
              <p className="text-gray-400">
                Accede a tu colección de películas
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
                    <Link to="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                    ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-12 text-base transition-colors" 
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              <p className="text-center text-sm text-gray-400">
                ¿No tienes cuenta?{' '}
                <a href="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Regístrate gratis
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Lado derecho - Showcase de películas */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-zinc-900 to-black items-center justify-center p-16 relative overflow-hidden">
        {/* Efectos de brillo sutiles con amarillo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Descubre cine independiente
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Historias únicas de cineastas emergentes. 
            Tu próxima película favorita te está esperando.
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            {featuredMovies.map((movie, index) => (
              <div 
                key={index}
                className="aspect-[2/3] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center hover:scale-105 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <Film className="w-16 h-16 text-gray-600 group-hover:text-amber-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}