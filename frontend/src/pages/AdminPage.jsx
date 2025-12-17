// // import { useState } from "react";
// // //import { useNavigate } from "react-router-dom";
// // import { Film, Plus } from "lucide-react";

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";

// // import MovieForm from "@/components/forms/MovieForm";
// // import MovieAdminCard from "@/components/MovieAdminCard";

// // import {
// //   useGetAllMovies,
// //   useCreateMovie,
// //   useDeleteMovie,
// // } from "@/api/MovieApi";

// // export default function AdminPage() {
// //  // const navigate = useNavigate();
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);


// //   const { data: movies = [], isLoading } = useGetAllMovies();
// //   const { mutateAsync: createMovie, isPending } = useCreateMovie();
// //   const { mutateAsync: deleteMovie } = useDeleteMovie();

 
// //   const handleCreateMovie = async (formData) => {
// //     await createMovie(formData);
// //     setIsDialogOpen(false);
// //   };

// //    const handleUpdateMovie = async (formData) => {
// //     await createMovie(formData);
// //     setIsDialogOpen(false);
// //   };

// //   const handleDeleteMovie = async (id) => {
// //     if (!confirm("¿Eliminar esta película?")) return;
// //     await deleteMovie(id);
// //   };




// //   return (
// //     <div className="min-h-screen bg-black">
// //       {/* ================= HEADER ================= */}
// //       <div className="border-b border-zinc-800 bg-zinc-950">
// //         <div className="container mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
// //           <div className="flex items-center gap-3">
// //             <Film className="w-8 h-8 text-amber-400" />
// //             <div>
// //               <h1 className="text-2xl font-bold text-white">
// //                 Panel de Administración
// //               </h1>
// //               <p className="text-gray-400 text-sm">
// //                 Gestiona las películas
// //               </p>
// //             </div>
// //           </div>

// //           {/* NUEVA PELÍCULA */}
// //           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //             <DialogTrigger asChild>
// //               <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
// //                 <Plus className="w-5 h-5 mr-2" />
// //                 Nueva Película
// //               </Button>
// //             </DialogTrigger>

// //             <DialogContent
// //               className="
// //                 bg-zinc-950
// //                 border-zinc-800
// //                 text-white
// //                 max-w-2xl
// //                 h-[85vh]
// //                 flex
// //                 flex-col
// //               "
// //             >
// //               <DialogHeader className="shrink-0">
// //                 <DialogTitle>Nueva Película</DialogTitle>
// //               </DialogHeader>

// //               <div className="flex-1 overflow-y-auto pr-2">
// //                 <MovieForm
// //                   onSubmit={handleCreateMovie}
// //                   isLoading={isPending}
// //                 />
// //               </div>
// //             </DialogContent>
// //           </Dialog>
// //         </div>
// //       </div>

   
// //       <div className="container mx-auto py-12">
// //         {isLoading ? (
// //           <p className="text-gray-400">Cargando películas...</p>
// //         ) : movies.length > 0 ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
// //             {movies.map((movie) => (
// //               <MovieAdminCard
// //                 key={movie._id}
// //                 movie={movie}
// //                 onDelete={handleDeleteMovie}
// //                 onEdit={handleUpdateMovie}
// //               />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center py-20">
// //             <Film className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
// //             <h3 className="text-xl font-bold text-gray-400 mb-2">
// //               No hay películas
// //             </h3>
// //             <p className="text-gray-500 mb-6">
// //               Comienza agregando tu primera película
// //             </p>
// //             <Button
// //               className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
// //               onClick={() => setIsDialogOpen(true)}
// //             >
// //               <Plus className="w-5 h-5 mr-2" />
// //               Agregar primera película
// //             </Button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { Film, Plus } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// import MovieForm from "@/components/forms/MovieForm";
// import MovieAdminCard from "@/components/MovieAdminCard";

// import {
//   useGetAllMovies,
//   useCreateMovie,
//   useUpdateMovie,
//   useDeleteMovie,
// } from "@/api/MovieApi";

// export default function AdminPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingMovie, setEditingMovie] = useState(null);

//   const { data: movies = [], isLoading } = useGetAllMovies();
//   const { mutateAsync: createMovie, isPending } = useCreateMovie();
//   const { mutateAsync: updateMovie } = useUpdateMovie();
//   const { mutateAsync: deleteMovie } = useDeleteMovie();

//   const handleCreateMovie = async (formData) => {
//     await createMovie(formData);
//     setIsDialogOpen(false);
//   };

//   const handleUpdateMovie = async (formData) => {
//     await updateMovie({
//       id: editingMovie._id,
//       formData,
//     });
//     setIsDialogOpen(false);
//     setEditingMovie(null);
//   };

//   const handleEditMovie = (movie) => {
//     setEditingMovie(movie);
//     setIsDialogOpen(true);
//   };

//   const handleDeleteMovie = async (id) => {
//     if (!confirm("¿Eliminar esta película?")) return;
//     await deleteMovie(id);
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* HEADER */}
//       <div className="border-b border-zinc-800 bg-zinc-950">
//         <div className="container mx-auto px-6 py-6 flex justify-between">
//           <div className="flex items-center gap-3">
//             <Film className="w-8 h-8 text-amber-400" />
//             <div>
//               <h1 className="text-2xl font-bold text-white">
//                 Panel de Administración
//               </h1>
//               <p className="text-gray-400 text-sm">
//                 Gestiona las películas
//               </p>
//             </div>
//           </div>

//           <Dialog
//             open={isDialogOpen}
//             onOpenChange={(open) => {
//               setIsDialogOpen(open);
//               if (!open) setEditingMovie(null);
//             }}
//           >
//             <DialogTrigger asChild>
//               <Button className="bg-amber-500 text-black font-semibold">
//                 <Plus className="w-5 h-5 mr-2" />
//                 Nueva Película
//               </Button>
//             </DialogTrigger>

//             <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl h-[85vh] flex flex-col">
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingMovie ? "Editar Película" : "Nueva Película"}
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="flex-1 overflow-y-auto pr-2">
//                 <MovieForm
//                   movie={editingMovie}
//                   onSubmit={
//                     editingMovie
//                       ? handleUpdateMovie
//                       : handleCreateMovie
//                   }
//                   isLoading={isPending}
//                 />
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="container mx-auto py-12">
//         {isLoading ? (
//           <p className="text-gray-400">Cargando películas...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {movies.map((movie) => (
//               <MovieAdminCard
//                 key={movie._id}
//                 movie={movie}
//                 onEdit={handleEditMovie}
//                 onDelete={handleDeleteMovie}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Film, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import MovieForm from "@/components/forms/MovieForm";
import MovieAdminCard from "@/components/MovieAdminCard";

import {
  useGetAllMovies,
  useCreateMovie,
  useUpdateMovie,
  useDeleteMovie,
} from "@/api/MovieApi";

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const { data: movies = [], isLoading } = useGetAllMovies();
  const { mutateAsync: createMovie, isPending } = useCreateMovie();
  const { mutateAsync: updateMovie, isPending: isUpdating } =
    useUpdateMovie();
  const { mutateAsync: deleteMovie } = useDeleteMovie();

  /* =========================
     CREATE
  ========================= */
  const handleCreateMovie = async (formData) => {
    await createMovie(formData);
    setIsDialogOpen(false);
  };

  /* =========================
     UPDATE
  ========================= */
  const handleUpdateMovie = async (formData) => {
    if (!editingMovie) return;

    await updateMovie({
      id: editingMovie._id,
      formData,
    });

    setIsDialogOpen(false);
    setEditingMovie(null);
  };

  /* =========================
     OPEN EDIT
  ========================= */
  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setIsDialogOpen(true);
  };

  /* =========================
     DELETE
  ========================= */
  const handleDeleteMovie = async (id) => {
    if (!confirm("¿Eliminar esta película?")) return;
    await deleteMovie(id);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* ================= HEADER ================= */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Film className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Panel de Administración
              </h1>
              <p className="text-gray-400 text-sm">
                Gestiona las películas
              </p>
            </div>
          </div>

          {/* ================= DIALOG ================= */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setEditingMovie(null);
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Nueva Película
              </Button>
            </DialogTrigger>

            <DialogContent
              className="
                bg-zinc-950
                border-zinc-800
                text-white
                max-w-2xl
                h-[85vh]
                flex
                flex-col
              "
            >
              <DialogHeader className="shrink-0">
                <DialogTitle>
                  {editingMovie
                    ? "Editar Película"
                    : "Nueva Película"}
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto pr-2">
                <MovieForm
                  key={editingMovie?._id || "create"}
                  movie={editingMovie}
                  onSubmit={
                    editingMovie
                      ? handleUpdateMovie
                      : handleCreateMovie
                  }
                  isLoading={isPending || isUpdating}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="container mx-auto py-12 px-6 lg:px-12">
        {isLoading ? (
          <p className="text-gray-400">Cargando películas...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieAdminCard
                key={movie._id}
                movie={movie}
                onEdit={() => handleEditMovie(movie)}
                onDelete={() => handleDeleteMovie(movie._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No hay películas
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza agregando tu primera película
            </p>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar primera película
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
