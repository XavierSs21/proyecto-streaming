// import React, { useMemo, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Clapperboard } from "lucide-react";
// import GenreFilter from "@/components/GenreFilter";
// import AlphabetFilter from "@/components/AlphabetFilter";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const featuredMovies = [
//   { id: 1, title: "El Viaje Silencioso", director: "Ana García", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2022, puntaje: 4.5, genre: "Drama" },
//   { id: 2, title: "Ecos de la Ciudad", director: "Carlos Rivas", imageUrl: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2023, puntaje: 4.8, genre: "Ciencia Ficción" },
//   { id: 3, title: "La Sombra del Ayer", director: "Isabel Moreno", imageUrl: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2021, puntaje: 4.2, genre: "Film-Noir" },
//   { id: 4, title: "Fronteras Invisibles", director: "Javier Soto", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2024, puntaje: 4.9, genre: "Suspenso" },
//   { id: 5, title: "Luces del Norte", director: "Sofía Núñez", imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2022, puntaje: 4.6, genre: "Aventura" },
//   { id: 6, title: "El Último Suspiro", director: "Pedro Almodóvar", imageUrl: "https://images.unsplash.com/photo-1518676590629-aabfc807f201?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2023, puntaje: 4.7, genre: "Romance" },
//   { id: 7, title: "Sueños de Papel", director: "Elena Gómez", imageUrl: "https://images.unsplash.com/photo-1535498730771-e7cbcd9925bb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2021, puntaje: 4.3, genre: "Fantasía" },
// ];

// const Movies = () => {
//   const [selectedAllMoviesGenre, setSelectedAllMoviesGenre] = useState(null);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [sortType, setSortType] = useState("default");
//   const [minRating, setMinRating] = useState(0);

//   const filtered = useMemo(() => {
//     let list = featuredMovies.slice();
//     if (selectedAllMoviesGenre) list = list.filter((m) => m.genre === selectedAllMoviesGenre);
//     if (selectedLetter) list = list.filter((m) => m.title.toUpperCase().startsWith(selectedLetter));

//     if (sortType === "alphabetical") {
//       list.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortType === "year") {
//       list.sort((a, b) => b.year - a.year);
//     }

//     if (minRating > 0) list = list.filter((m) => m.puntaje >= minRating);

//     return list;
//   }, [selectedAllMoviesGenre, selectedLetter, sortType, minRating]);

//   return (
//     <div className="text-white pt-8">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-3">
//             <Clapperboard className="h-8 w-8 md:h-10 md:w-10 text-yellow-400" />
//             <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">Movies</h2>
//           </div>
//           <div className="flex items-center gap-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="bg-gray-800 text-white hover:bg-yellow-500">
//                   Sort By: {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="bg-gray-800 text-white">
//                 <DropdownMenuItem onSelect={() => setSortType('default')}>Default</DropdownMenuItem>
//                 <DropdownMenuItem onSelect={() => setSortType('year')}>Year</DropdownMenuItem>
//                 <DropdownMenuItem onSelect={() => setSortType('alphabetical')}>Alphabetical</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-300">Rating</span>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="range"
//                   min={0}
//                   max={5}
//                   step={0.1}
//                   value={minRating}
//                   onChange={(e) => setMinRating(parseFloat(e.target.value))}
//                   className="h-2 w-36 md:w-44 rounded-full appearance-none"
//                   style={{
//                     background: `linear-gradient(90deg, #f59e0b ${(minRating / 5) * 100}%, #374151 ${(minRating / 5) * 100}%)`,
//                   }}
//                   aria-label="Minimum rating"
//                 />
//                 <span className="text-sm text-yellow-400 font-semibold">{minRating.toFixed(1)}</span>
//               </div>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="bg-gray-800 text-white hover:bg-yellow-500">A-Z</Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="bg-gray-800 text-white p-2">
//                 <AlphabetFilter selectedLetter={selectedLetter} onLetterSelect={setSelectedLetter} />
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <div className="mb-8">
//           <GenreFilter selectedGenre={selectedAllMoviesGenre} onGenreChange={setSelectedAllMoviesGenre} />
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {filtered.map((movie) => (
//             <div key={movie.id} className="p-2">
//               <Card className="cursor-pointer overflow-hidden border-0 bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
//                 <CardContent className="p-0">
//                   <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
//                   <div className="p-2">
//                     <h3 className="font-bold truncate">{movie.title}</h3>
//                     <div className="flex items-center justify-between text-sm text-muted-foreground">
//                       <p className="truncate">Dir. {movie.director}</p>
//                       <div className="flex items-center gap-1">
//                         <Star className="size-3 fill-yellow-400 text-yellow-400" />
//                         <span>{movie.puntaje}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Movies;


// src/pages/Movies.jsx
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import GenreFilter from "@/components/GenreFilter";
import AlphabetFilter from "@/components/AlphabetFilter";
import { useGetAllMovies } from "@/api/MovieApi";

/* =========================
   FALLBACK IMAGE
========================= */
const fallbackThumb =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop";

/* =========================
   COMPONENT
========================= */
const Movies = () => {
  const { data: movies = [], isLoading } = useGetAllMovies();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [sortType, setSortType] = useState("default");

  /* =========================
     FILTROS + SORT
  ========================= */
  const filteredMovies = useMemo(() => {
    let list = [...movies];

    if (selectedGenre) {
      list = list.filter((m) => m.genre === selectedGenre);
    }

    if (selectedLetter) {
      list = list.filter((m) =>
        m.title?.toUpperCase().startsWith(selectedLetter)
      );
    }

    if (sortType === "alphabetical") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "year") {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    return list;
  }, [movies, selectedGenre, selectedLetter, sortType]);

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Cargando películas...
      </div>
    );
  }

  return (
    <div className="text-white pt-8">
      <div className="container mx-auto px-4 py-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Clapperboard className="h-8 w-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
              Movies
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* SORT */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-zinc-900 text-white hover:bg-yellow-500 hover:text-black"
                >
                  Sort: {sortType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 text-white">
                <DropdownMenuItem onSelect={() => setSortType("default")}>
                  Default
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortType("year")}>
                  Year
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSortType("alphabetical")}
                >
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* A–Z */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-zinc-900 text-white hover:bg-yellow-500 hover:text-black"
                >
                  A–Z
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 text-white p-2">
                <AlphabetFilter
                  selectedLetter={selectedLetter}
                  onLetterSelect={setSelectedLetter}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ================= GENRE FILTER ================= */}
        <div className="mb-8">
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </div>

        {/* ================= GRID ================= */}
        {filteredMovies.length === 0 ? (
          <p className="text-gray-400 text-center mt-12">
            No hay películas con los filtros seleccionados
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <Card
                key={movie._id}
                className="cursor-pointer overflow-hidden border-0 bg-transparent transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <img
                    src={movie.thumbnailUrl || fallbackThumb}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-md"
                    loading="lazy"
                  />

                  <div className="p-2">
                    <h3 className="font-bold truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <p className="truncate">
                        {movie.director
                          ? `Dir. ${movie.director}`
                          : " "}
                      </p>

                      {/* rating placeholder */}
                      <div className="flex items-center gap-1 opacity-60">
                        <Star className="size-3" />
                        <span>{movie.year || ""}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
