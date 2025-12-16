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
//    GÉNEROS (ENUM BACKEND)
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
//   year: z
//     .number()
//     .min(1800, "Año inválido")
//     .max(new Date().getFullYear() + 5, "Año inválido")
//     .optional(),
//   duration: z.number().min(1, "Duración inválida").optional(),
//   genre: z.enum(GENRES, {
//     errorMap: () => ({ message: "Selecciona un género" }),
//   }),
//   videoUrl: z.string().url("URL del video inválida"),
//   thumbnailUrl: z.string().url("URL de imagen inválida").optional(),
// });

// /* =========================
//    ERROR TEXT
// ========================= */
// const ErrorText = ({ field }) =>
//   field.state.meta.errors?.length > 0 ? (
//     <p className="text-red-500 text-sm">
//       {field.state.meta.errors[0]?.message}
//     </p>
//   ) : null;

// /* =========================
//    COMPONENT
// ========================= */
// const MovieForm = ({ onSubmit, isLoading = false }) => {
//   const form = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       director: "",
//       year: "",
//       duration: "",
//       genre: "",
//       videoUrl: "",
//       thumbnailUrl: "",
//     },

//     validatorAdapter: zodValidator(),

//     validators: {
//       onSubmit: movieSchema,
//     },

//     onSubmit: async ({ value }) => {
//       const payload = {
//         ...value,
//         year: value.year ? Number(value.year) : undefined,
//         duration: value.duration ? Number(value.duration) : undefined,
//       };

//       await onSubmit(payload);
//     },
//   });

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         form.handleSubmit();
//       }}
//       className="space-y-5"
//     >
//       {/* TÍTULO */}
//       <form.Field name="title">
//         {(field) => (
//           <div className="space-y-2">
//             <Label className="text-gray-300">Título</Label>
//             <Input
//               placeholder="Inception"
//               className="bg-zinc-900/50 border-zinc-800 text-white"
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//             <ErrorText field={field} />
//           </div>
//         )}
//       </form.Field>

//       {/* DESCRIPCIÓN */}
//       <form.Field name="description">
//         {(field) => (
//           <div className="space-y-2">
//             <Label className="text-gray-300">Descripción</Label>
//             <Input
//               placeholder="Breve descripción"
//               className="bg-zinc-900/50 border-zinc-800 text-white"
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//           </div>
//         )}
//       </form.Field>

//       {/* DIRECTOR + AÑO */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <form.Field name="director">
//           {(field) => (
//             <div className="space-y-2">
//               <Label className="text-gray-300">Director</Label>
//               <Input
//                 placeholder="Christopher Nolan"
//                 className="bg-zinc-900/50 border-zinc-800 text-white"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="year">
//           {(field) => (
//             <div className="space-y-2">
//               <Label className="text-gray-300">Año</Label>
//               <Input
//                 type="number"
//                 placeholder="2010"
//                 className="bg-zinc-900/50 border-zinc-800 text-white"
//                 value={field.state.value}
//                 onChange={(e) =>
//                   field.handleChange(
//                     e.target.value ? Number(e.target.value) : ""
//                   )
//                 }
//               />
//               <ErrorText field={field} />
//             </div>
//           )}
//         </form.Field>
//       </div>

//       {/* DURACIÓN + GÉNERO */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <form.Field name="duration">
//           {(field) => (
//             <div className="space-y-2">
//               <Label className="text-gray-300">Duración (min)</Label>
//               <Input
//                 type="number"
//                 placeholder="148"
//                 className="bg-zinc-900/50 border-zinc-800 text-white"
//                 value={field.state.value}
//                 onChange={(e) =>
//                   field.handleChange(
//                     e.target.value ? Number(e.target.value) : ""
//                   )
//                 }
//               />
//               <ErrorText field={field} />
//             </div>
//           )}
//         </form.Field>

//         {/* SELECT SHADCN */}
//         <form.Field name="genre">
//           {(field) => (
//             <div className="space-y-2">
//               <Label className="text-gray-300">Género</Label>
//               <Select
//                 value={field.state.value}
//                 onValueChange={field.handleChange}
//               >
//                 <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-white">
//                   <SelectValue placeholder="Selecciona un género" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
//                   {GENRES.map((genre) => (
//                     <SelectItem key={genre} value={genre}>
//                       {genre}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <ErrorText field={field} />
//             </div>
//           )}
//         </form.Field>
//       </div>

//       {/* URL VIDEO */}
//       <form.Field name="videoUrl">
//         {(field) => (
//           <div className="space-y-2">
//             <Label className="text-gray-300">URL del video</Label>
//             <Input
//               placeholder="https://video.mp4"
//               className="bg-zinc-900/50 border-zinc-800 text-white"
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//             <ErrorText field={field} />
//           </div>
//         )}
//       </form.Field>

//       {/* THUMBNAIL */}
//       {/* <form.Field name="thumbnailUrl">
//         {(field) => (
//           <div className="space-y-2">
//             <Label className="text-gray-300">Thumbnail (opcional)</Label>
//             <Input
//               placeholder="https://imagen.jpg"
//               className="bg-zinc-900/50 border-zinc-800 text-white"
//               value={field.state.value}
//               onChange={(e) => field.handleChange(e.target.value)}
//             />
//           </div>
//         )}
//       </form.Field> */}
//       <form.Field name="thumbnail">
//   {(field) => (
//     <div className="space-y-2">
//       <Label className="text-gray-300">Thumbnail</Label>

//       {/* <ThumbnailUploader
//         value={field.state.value}
//         onChange={field.handleChange}
//       /> */}
//       <ThumbnailUploader value={field.state.value}
//         onChange={field.handleChange} />
//     </div>
//   )}
// </form.Field>




//       {/* SUBMIT */}
//       <Button
//         type="submit"
//         className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-11"
//         disabled={isLoading}
//       >
//         {isLoading ? "Subiendo película..." : "Subir película"}
//       </Button>
//     </form>
//   );
// };

// export default MovieForm;

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
   GÉNEROS (BACKEND)
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
  video: z.any(),
  thumbnail: z.any().optional(),
});

/* =========================
   ERROR TEXT
========================= */
const ErrorText = ({ field }) =>
  field.state.meta.errors?.length > 0 ? (
    <p className="text-red-500 text-sm">
      {field.state.meta.errors[0]?.message}
    </p>
  ) : null;

/* =========================
   COMPONENT
========================= */
const MovieForm = ({ onSubmit, isLoading = false }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      director: "",
      year: "",
      duration: "",
      genre: "",
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

      // ARCHIVOS
      formData.append("video", value.video);
      if (value.thumbnail) {
        formData.append("thumbnail", value.thumbnail);
      }

      await onSubmit(formData);
    },
  });

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
              placeholder="Inception"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

      {/* DESCRIPCIÓN */}
      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Input
              placeholder="Breve descripción"
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
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {/* VIDEO */}
      <form.Field name="video">
        {(field) => (
          <div className="space-y-2">
            <Label>Video (MP4)</Label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => field.handleChange(e.target.files?.[0])}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

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

      {/* SUBMIT */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Subiendo..." : "Subir Película"}
      </Button>
    </form>
  );
};

export default MovieForm;
