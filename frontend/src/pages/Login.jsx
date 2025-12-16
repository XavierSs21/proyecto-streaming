import { useState } from 'react';
import { useLoginUser } from '@/api/UserApi';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Film } from 'lucide-react';
import SessionForm from '@/components/forms/SessionForm';

export default function LoginPage() {
  const loginUser = useLoginUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async (values) => {
  //   setIsLoading(true);
  //   try {
  //     await loginUser.mutateAsync(values);
  //     navigate('/home-page'); 
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (values) => {
  setIsLoading(true);
  try {
    const data = await loginUser.mutateAsync(values);

 
    if (data?.user?.rol === "admin") {
      navigate("/admin-page", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};


  const featuredMovies = [
    { title: "El Laberinto" },
    { title: "Sombras" },
    { title: "Luna Roja" },
  ];

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

          {/* Card con SessionForm */}
          <Card className="backdrop-blur-xl bg-zinc-950/80 border-zinc-800/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Login</CardTitle>
              <CardDescription className="text-gray-400">
                Ingresa tus credenciales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionForm mode="login" onSubmit={handleLogin} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lado derecho - Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-zinc-900 to-black items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Descubre cine independiente</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Historias únicas de cineastas emergentes. Tu próxima película favorita te está esperando.
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