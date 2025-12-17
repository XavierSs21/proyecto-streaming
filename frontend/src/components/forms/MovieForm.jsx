// import { useEffect } from "react";
// import { useForm } from "@tanstack/react-form";
// import { zodValidator } from "@tanstack/zod-form-adapter";
// import * as z from "zod";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import ThumbnailUploader from "./ThumbnailUploader";

// /* =========================
//    GÉNEROS
// ========================= */
// const GENRES = [
//   "Accion",
//   "Drama",
//   "Comedia",
//   "Terror",
//   "Ciencia Ficcion",
//   "Romance",
// ];

// /* =========================
//    VALIDACIÓN
// ========================= */
// const movieSchema = z.object({
//   title: z.string().min(1, "El título es obligatorio"),
//   description: z.string().optional(),
//   director: z.string().optional(),
//   year: z.any().optional(),
//   duration: z.any().optional(),
//   genre: z.enum(GENRES),
//   video: z.any().optional(),
//   thumbnail: z.any().optional(),
// });

// /* =========================
//    COMPONENTE
// ========================= */
// const MovieForm = ({ movie, onSubmit, isLoading = false }) => {
//   const form = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       director: "",
//       year: "",
//       duration: "",
//       genre: undefined,
//       video: null,
//       thumbnail: null,
//     },

//     validatorAdapter: zodValidator(),
//     validators: { onSubmit: movieSchema },

//     onSubmit: async ({ value }) => {
//       const formData = new FormData();

//       formData.append("title", value.title);
//       formData.append("description", value.description || "");
//       formData.append("director", value.director || "");
//       formData.append("genre", value.genre);

//       if (value.year) formData.append("year", value.year);
//       if (value.duration) formData.append("duration", value.duration);

//       // Solo reemplaza si se sube nuevo archivo
//       if (value.video) formData.append("video", value.video);
//       if (value.thumbnail) formData.append("thumbnail", value.thumbnail);

//       await onSubmit(formData);
//     },
//   });

//   /* =========================
//      CARGAR DATOS AL EDITAR
//   ========================= */
//   useEffect(() => {
//     if (!movie) return;

//     form.reset({
//       title: movie.title ?? "",
//       description: movie.description ?? "",
//       director: movie.director ?? "",
//       year: movie.year ?? "",
//       duration: movie.duration ?? "",
//       genre: movie.genre ?? undefined,
//       video: null,
//       thumbnail: movie.thumbnailUrl ?? null,
//     });
//   }, [movie, form]);

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         form.handleSubmit();
//       }}
//       className="space-y-6"
//     >
//       {/* TÍTULO */}
//       <form.Field name="title">
//         {(field) => (
//           <div className="space-y-2">
//             <Label>Título</Label>
//             <Input
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//           </div>
//         )}
//       </form.Field>

//       {/* DESCRIPCIÓN */}
//       <form.Field name="description">
//         {(field) => (
//           <div className="space-y-2">
//             <Label>Descripción</Label>
//             <Input
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//           </div>
//         )}
//       </form.Field>

//       {/* DIRECTOR + AÑO */}
//       <div className="grid grid-cols-2 gap-4">
//         <form.Field name="director">
//           {(field) => (
//             <div className="space-y-2">
//               <Label>Director</Label>
//               <Input
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="year">
//           {(field) => (
//             <div className="space-y-2">
//               <Label>Año</Label>
//               <Input
//                 type="number"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>
//       </div>

//       {/* DURACIÓN + GÉNERO */}
//       <div className="grid grid-cols-2 gap-4">
//         <form.Field name="duration">
//           {(field) => (
//             <div className="space-y-2">
//               <Label>Duración (min)</Label>
//               <Input
//                 type="number"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="genre">
//           {(field) => (
//             <div className="space-y-2">
//               <Label>Género</Label>
//               <Select
//                 value={field.state.value}
//                 onValueChange={field.handleChange}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Selecciona un género" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {GENRES.map((g) => (
//                     <SelectItem key={g} value={g}>
//                       {g}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}
//         </form.Field>
//       </div>

//       {/* VIDEO */}
//       <div className="space-y-2">
//         <Label>Video</Label>

//         <Input
//           type="file"
//           accept="video/*"
//           onChange={(e) =>
//             form.setFieldValue("video", e.target.files?.[0])
//           }
//         />

//         {movie?.videoUrl && (
//           <video
//             src={movie.videoUrl}
//             controls
//             className="w-full rounded-lg"
//           />
//         )}

//         {movie && (
//           <p className="text-xs text-gray-400">
//             Sube un nuevo video solo si deseas reemplazar el actual
//           </p>
//         )}
//       </div>

//       {/* THUMBNAIL */}
//                <form.Field name="thumbnail">
//           {(field) => (
//           <div className="space-y-2">
//             <Label>Thumbnail</Label>
//             <ThumbnailUploader
//               value={field.state.value}
//               onChange={field.handleChange}
//             />
//           </div>
//         )}
//       </form.Field>
    
//       {/* <form.Field name="thumbnail">
//         {(field) => (
//           <div className="space-y-2">
//             <Label>Thumbnail</Label>
//             <ThumbnailUploader
//               value={field.state.value}
//               previewUrl={movie?.thumbnailUrl}
//               onChange={field.handleChange}
//             />
//           </div>
//         )}
//       </form.Field> */}

//       {/* SUBMIT */}
//       <Button type="submit" disabled={isLoading} className="w-full">
//         {movie ? "Guardar cambios" : "Subir Película"}
//       </Button>
//     </form>
//   );
// };

// export default MovieForm;

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ThumbnailUploader from "./ThumbnailUploader";

/* =========================
   GÉNEROS
========================= */
const GENRES = [
  "Accion",
  "Drama",
  "Comedia",
  "Terror",
  "Ciencia Ficcion",
  "Romance",
];

/* =========================
   VALIDACIÓN
========================= */
const movieSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  director: z.string().optional(),
  year: z.any().optional(),
  duration: z.any().optional(),
  genre: z.enum(GENRES).optional(),
  video: z.any().optional(),
  thumbnail: z.any().optional(),
});

/* =========================
   DETECTAR CAMBIOS
========================= */
const hasChanges = (value, movie) => {
  if (!movie) return true;

  return (
    value.title !== movie.title ||
    value.description !== movie.description ||
    value.director !== movie.director ||
    Number(value.year) !== Number(movie.year) ||
    Number(value.duration) !== Number(movie.duration) ||
    value.genre !== movie.genre ||
    value.video instanceof File ||
    value.thumbnail instanceof File
  );
};

/* =========================
   COMPONENTE
========================= */
const MovieForm = ({ movie, onSubmit, isLoading = false }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      director: "",
      year: "",
      duration: "",
      genre: undefined,
      video: null,
      thumbnail: null,
    },

    validatorAdapter: zodValidator(),
    validators: { onSubmit: movieSchema },

    onSubmit: async ({ value }) => {
      if (movie && !hasChanges(value, movie)) {
        toast.info("No hay cambios para guardar");
        return;
      }

      const formData = new FormData();

      if (value.title !== movie?.title)
        formData.append("title", value.title);

      if (value.description !== movie?.description)
        formData.append("description", value.description || "");

      if (value.director !== movie?.director)
        formData.append("director", value.director || "");

      if (value.genre && value.genre !== movie?.genre)
        formData.append("genre", value.genre);

      if (value.year && Number(value.year) !== Number(movie?.year))
        formData.append("year", value.year);

      if (value.duration && Number(value.duration) !== Number(movie?.duration))
        formData.append("duration", value.duration);

      if (value.video instanceof File)
        formData.append("video", value.video);

      if (value.thumbnail instanceof File)
        formData.append("thumbnail", value.thumbnail);

      await onSubmit(formData);
    },
  });

  /* =========================
     CARGAR DATOS AL EDITAR
  ========================= */
  useEffect(() => {
    if (!movie) return;

    form.reset({
      title: movie.title ?? "",
      description: movie.description ?? "",
      director: movie.director ?? "",
      year: movie.year ?? "",
      duration: movie.duration ?? "",
      genre: movie.genre ?? undefined,
      video: null,
      thumbnail: null,
    });
  }, [movie, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* TÍTULO */}
      <form.Field name="title">
        {(field) => (
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* DESCRIPCIÓN */}
      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* DIRECTOR + AÑO */}
      <div className="grid grid-cols-2 gap-4">
        <form.Field name="director">
          {(field) => (
            <div className="space-y-2">
              <Label>Director</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="year">
          {(field) => (
            <div className="space-y-2">
              <Label>Año</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* DURACIÓN + GÉNERO */}
      <div className="grid grid-cols-2 gap-4">
        <form.Field name="duration">
          {(field) => (
            <div className="space-y-2">
              <Label>Duración (min)</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="genre">
          {(field) => (
            <div className="space-y-2">
              <Label>Género</Label>
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </div>

      {/* VIDEO */}
      <div className="space-y-2">
        <Label>Video</Label>
        <Input
          type="file"
          accept="video/*"
          onChange={(e) =>
            form.setFieldValue("video", e.target.files?.[0] ?? null)
          }
        />

        {movie?.videoUrl && (
          <video src={movie.videoUrl} controls className="w-full rounded-lg" />
        )}

        {movie && (
          <p className="text-xs text-gray-400">
            Sube un nuevo video solo si deseas reemplazar el actual
          </p>
        )}
      </div>

      {/* THUMBNAIL */}
      <form.Field name="thumbnail">
        {(field) => (
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <ThumbnailUploader
              value={field.state.value}
              previewUrl={movie?.thumbnailUrl}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      {/* SUBMIT */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {movie ? "Guardar cambios" : "Subir Película"}
      </Button>
    </form>
  );
};

export default MovieForm;

