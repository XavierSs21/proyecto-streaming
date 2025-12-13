import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Film, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        toast.success("Correo enviado", {
          description: "Revisa tu bandeja de entrada",
        });
      } else {
        toast.error("Error", {
          description: data.message || "No se pudo enviar el correo",
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

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black">
      {/* Fondo  */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <Film className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">IndieStream</span>
          </Link>
        </div>

        <Card className="backdrop-blur-xl bg-zinc-950/80 border-zinc-800/50 shadow-2xl">
          {!emailSent ? (
            <>
              <CardHeader className="space-y-3">
                <CardTitle className="text-white text-2xl">
                  Recuperar contraseña
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-12 pl-11"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-12 text-base transition-colors" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="py-12 px-6">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    ¡Correo enviado!
                  </h3>
                  <p className="text-gray-400 mb-2">
                    Hemos enviado las instrucciones a:
                  </p>
                  <p className="text-amber-400 font-medium text-lg mb-4">
                    {email}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Si no lo ves, revisa tu carpeta de spam
                  </p>
                </div>
                <Link to="/login" className="block">
                  <Button 
                    variant="outline"
                    className="w-full border-zinc-700 text-white hover:bg-white/5"
                  >
                    Volver al inicio de sesión
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Link para volver */}
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio de sesión
          </Link>
        </div>

        {/* Ayuda adicional */}
        <div className="mt-8 p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-gray-400 text-sm text-center">
            ¿Problemas para recuperar tu cuenta?{' '}
            <a href="mailto:soporte@indiestream.com" className="text-amber-400 hover:text-amber-300 font-medium">
              Contáctanos
            </a>
            {/* Cambiar este correo por alguno real si necesitamos el soporte */}
          </p>
        </div>
      </div>
    </div>
  );
}