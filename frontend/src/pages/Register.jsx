import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Film, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SessionForm from "@/components/forms/SessionForm"; 
import { useCreateUser } from "@/api/UserApi";

export default function Register() {
  const createUser = useCreateUser();

  const handleRegister = async (values) => {
    try {
      await createUser.mutateAsync(values);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-neutral-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px)",
            opacity: 0.03,
          }}
        ></div>
      </div>

      <Link
        to="/login"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Volver al inicio</span>
      </Link>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group justify-center">
              <Film className="w-12 h-12 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">IndieStream</span>
          </Link>
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
            <SessionForm
              mode="register"
              onSubmit={handleRegister}
            />

            <p className="text-center text-sm text-gray-400 pt-4">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
