import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as z from "zod";

const movieSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  director: z.string().optional(),
  year: z
    .number()
    .min(1800, "Año inválido")
    .max(new Date().getFullYear() + 5, "Año inválido")
    .optional(),
  duration: z
    .number()
    .min(1, "La duración debe ser mayor a 0")
    .optional(),
  genre: z.string().min(1, "Agrega al menos un género"),
  videoUrl: z.string().url("URL del video inválida"),
  thumbnailUrl: z.string().url("URL de imagen inválida").optional(),
});


const ErrorText = ({ field }) =>
  field.state.meta.errors?.length > 0 ? (
    <p className="text-red-500 text-sm">
      {field.state.meta.errors[0]?.message}
    </p>
  ) : null;

const MovieForm = ({ onSubmit, isLoading = false }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      director: "",
      year: "",
      duration: "",
      genre: "",
      videoUrl: "",
      thumbnailUrl: "",
    },

    validatorAdapter: zodValidator(),

    validators: {
      onSubmit: movieSchema,
    },

    onSubmit: async ({ value }) => {

      const payload = {
        ...value,
        genre: value.genre.split(",").map((g) => g.trim()),
        year: value.year ? Number(value.year) : undefined,
        duration: value.duration ? Number(value.duration) : undefined,
      };

      await onSubmit(payload);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Título */}
      <form.Field name="title">
        {(field) => (
          <div className="space-y-2">
            <Label className="text-gray-300">Título</Label>
            <Input
              placeholder="Inception"
              className="bg-zinc-900/50 border-zinc-800 text-white"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

      {/* Descripción */}
      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label className="text-gray-300">Descripción</Label>
            <Input
              placeholder="Breve descripción de la película"
              className="bg-zinc-900/50 border-zinc-800 text-white"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Director + Año */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="director">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-gray-300">Director</Label>
              <Input
                placeholder="Christopher Nolan"
                className="bg-zinc-900/50 border-zinc-800 text-white"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="year">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-gray-300">Año</Label>
              <Input
                type="number"
                placeholder="2010"
                className="bg-zinc-900/50 border-zinc-800 text-white"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {/* Duración + Género */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="duration">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-gray-300">Duración (min)</Label>
              <Input
                type="number"
                placeholder="148"
                className="bg-zinc-900/50 border-zinc-800 text-white"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="genre">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-gray-300">
                Géneros (separados por coma)
              </Label>
              <Input
                placeholder="Acción, Ciencia ficción"
                className="bg-zinc-900/50 border-zinc-800 text-white"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {/* URLs */}
      <form.Field name="videoUrl">
        {(field) => (
          <div className="space-y-2">
            <Label className="text-gray-300">URL del video</Label>
            <Input
              placeholder="https://..."
              className="bg-zinc-900/50 border-zinc-800 text-white"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

      <form.Field name="thumbnailUrl">
        {(field) => (
          <div className="space-y-2">
            <Label className="text-gray-300">Thumbnail (opcional)</Label>
            <Input
              placeholder="https://imagen.jpg"
              className="bg-zinc-900/50 border-zinc-800 text-white"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Botón */}
      <Button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
        disabled={isLoading}
      >
        {isLoading ? "Subiendo película..." : "Subir película"}
      </Button>
    </form>
  );
};

export default MovieForm;
