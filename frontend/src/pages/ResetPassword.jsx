import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Film, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Enlace inválido o expirado");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formData.password }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al cambiar contraseña");

      toast.success("¡Contraseña actualizada!", {
        description: "Ya puedes iniciar sesión con tu nueva contraseña",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error("Error al cambiar contraseña", {
        description: err.message || "El enlace puede haber expirado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Si no hay token en la URL
  if (!token) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <Film className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold text-white">IndieStream</span>
            </Link>
          </div>

          <Card className="backdrop-blur-xl bg-zinc-950/80 border-zinc-800/50 shadow-2xl">
            <CardContent className="py-12 px-6">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Enlace inválido</h3>
                  <p className="text-gray-400 mb-6">
                    El enlace para restablecer la contraseña es inválido o ha expirado.
                  </p>
                  <Link to="/forgot-password">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                      Solicitar nuevo enlace
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <Film className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold text-white">IndieStream</span>
          </Link>
        </div>

        <Card className="backdrop-blur-xl bg-zinc-950/80 border-zinc-800/50 shadow-2xl">
          <CardHeader className="space-y-3">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <CardTitle className="text-white text-2xl text-center">Nueva contraseña</CardTitle>
            <CardDescription className="text-gray-400 text-base text-center">
              Ingresa tu nueva contraseña para tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-amber-500 h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-12 text-base transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Actualizando..." : "Cambiar contraseña"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}