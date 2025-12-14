import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as z from "zod";

const loginSchema = z.object({
  correo: z.string().email("Correo inválido").min(1, "El correo es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido").min(1, "El correo es obligatorio"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  pais: z.string().min(1, "El país es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const ErrorText = ({ field }) =>
  field.state.meta.errors?.length > 0 ? (
    <p className="text-red-500 text-sm">{field.state.meta.errors[0]?.message}</p>
  ) : null;

const SessionForm = ({ mode, onSubmit, isLoading = false }) => {
  const form = useForm({
    defaultValues:
      mode === "login"
        ? { correo: "", password: "" }
        : { nombre: "", correo: "", telefono: "", pais: "", password: "" },

    validatorAdapter: zodValidator(),

    validators: {
      onSubmit: mode === "login" ? loginSchema : registerSchema,
    },

    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form onSubmit={(e) => {e.preventDefault();
                        form.handleSubmit(); 
      }} className="space-y-5" >
      {mode === "register" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="nombre">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-gray-300">Nombre completo</Label>
                <Input
                  placeholder="Juan López"
                  className="bg-zinc-900/50 border-zinc-800 text-white"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="correo">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-gray-300">Correo electrónico</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-zinc-900/50 border-zinc-800 text-white"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>
        </div>
      )}

      {mode === "login" && (
        <form.Field name="correo">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-gray-300">Correo electrónico</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                className="bg-zinc-900/50 border-zinc-800 text-white"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>
      )}

      {mode === "register" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="telefono">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-gray-300">Teléfono</Label>
                <Input
                  placeholder="+52 123 456 7890"
                  className="bg-zinc-900/50 border-zinc-800 text-white"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="pais">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-gray-300">País</Label>
                <Input
                  placeholder="México"
                  className="bg-zinc-900/50 border-zinc-800 text-white"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>
        </div>
      )}

{mode === "login" && (
  <div className="flex justify-end">
    <a
      href="/forgot-password"
      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
    >
      ¿Olvidaste tu contraseña?
    </a>
  </div>

)}
      <form.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <Label className="text-gray-300">Contraseña</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-zinc-900/50 border-zinc-800 text-white"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

     <Button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            {mode === "login" ? "Iniciando sesión" : "Creando cuenta"} <Spinner className="w-4 h-4" />
          </>
        ) : mode === "login" ? (
          "Entrar"
        ) : (
          "Crear Cuenta"
        )}
      </Button>
      <p className="text-center text-sm text-gray-400">
                ¿No tienes cuenta?{' '}
                <a href="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Regístrate gratis
                </a>
              </p>
    </form>
  );
};

export default SessionForm;
