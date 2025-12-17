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
//    COMPONENT
// ========================= */
// const MovieForm = ({ onSubmit, isLoading = false, movie }) => {
//   const form = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       director: "",
//       year: "",
//       duration: "",
//       genre: "",
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

//       if (value.video) {
//         formData.append("video", value.video);
//       }

//       if (value.thumbnail) {
//         formData.append("thumbnail", value.thumbnail);
//       }

//       await onSubmit(formData);
//     },
//   });

//   /* =========================
//      CARGAR DATOS AL EDITAR
//   ========================= */
//   useEffect(() => {
//   if (!movie) return;

//   form.reset({
//     title: movie.title ?? "",
//     description: movie.description ?? "",
//     director: movie.director ?? "",
//     year: movie.year ?? "",
//     duration: movie.duration ?? "",
//     genre: movie.genre ?? undefined,
//     video: null,
//     thumbnail: null,
//   });
// }, [movie]);

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
//         <Label>Video (opcional al editar)</Label>
//         <Input
//           type="file"
//           accept="video/*"
//           onChange={(e) =>
//             form.setFieldValue("video", e.target.files?.[0])
//           }
//         />

//           {movie?.videoUrl && (
//           <video
//             src={movie.videoUrl}
//             controls
//             className="w-full rounded-lg"
//           />
//         )}

        
//         {/* {movie?.videoUrl && (
//           <p className="text-xs text-gray-400">
//             Video actual cargado "sube otro si deseas reemplazarlo"
//           </p>
//         )} */}
//       </div>

//       {/* THUMBNAIL */}
//          <form.Field name="thumbnail">
//          {(field) => (
//           <div className="space-y-2">
//             <Label>Thumbnail</Label>
//             <ThumbnailUploader
//               value={field.state.value}
//               onChange={field.handleChange}
//             />
//           </div>
//         )}
//       </form.Field>
    

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
  genre: z.enum(GENRES),
  video: z.any().optional(),
  thumbnail: z.any().optional(),
});

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
      const formData = new FormData();

      formData.append("title", value.title);
      formData.append("description", value.description || "");
      formData.append("director", value.director || "");
      formData.append("genre", value.genre);

      if (value.year) formData.append("year", value.year);
      if (value.duration) formData.append("duration", value.duration);

      // Solo reemplaza si se sube nuevo archivo
      if (value.video) formData.append("video", value.video);
      if (value.thumbnail) formData.append("thumbnail", value.thumbnail);

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
      thumbnail: movie.thumbnailUrl ?? null,
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
            form.setFieldValue("video", e.target.files?.[0])
          }
        />

        {movie?.videoUrl && (
          <video
            src={movie.videoUrl}
            controls
            className="w-full rounded-lg"
          />
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
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>
    
      {/* <form.Field name="thumbnail">
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
      </form.Field> */}

      {/* SUBMIT */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {movie ? "Guardar cambios" : "Subir Película"}
      </Button>
    </form>
  );
};

export default MovieForm;
