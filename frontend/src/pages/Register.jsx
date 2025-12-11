import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Film, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    pais: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Cuenta creada!", {
          description: "Ahora puedes iniciar sesión",
        });
      } else {
        toast.error("Error al registrarse", {
          description: data.message || "Intenta de nuevo",
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
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Fondo cinematográfico con overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-neutral-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px)',
          opacity: 0.03
        }}></div>
      </div>

      {/* Botón volver */}
      <Link 
        to="/login" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Volver al inicio</span>
      </Link>

      {/* Card de registro */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="text-center mb-8">
          <Film className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Únete a IndieStream</h1>
          <p className="text-gray-400">Crea tu cuenta y comienza a explorar</p>
        </div>

        <Card className="backdrop-blur-xl bg-zinc-950/80 border-zinc-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Crear cuenta</CardTitle>
            <CardDescription className="text-gray-400">
              Completa tus datos para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Fila 1: Nombre y Correo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-gray-300">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-gray-300">Correo electrónico</Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>
              </div>

              {/* Fila 2: Teléfono y País */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-gray-300">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+52 123 456 7890"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pais" className="text-gray-300">País</Label>
                  <Input
                    id="pais"
                    name="pais"
                    type="text"
                    placeholder="México"
                    value={formData.pais}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>
              </div>

              {/* Fila 3: Contraseñas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-11"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11 text-base transition-colors mt-6" 
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>

              <p className="text-center text-sm text-gray-400 pt-4">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}