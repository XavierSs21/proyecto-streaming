// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Star } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import GenreFilter from "@/components/GenreFilter";
// import AlphabetFilter from "@/components/AlphabetFilter";

// const featuredMovies = [
//   { id: 1, title: "El Viaje Silencioso", director: "Ana García", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2022, puntaje: 4.5, genre: "Drama" },
//   { id: 2, title: "Ecos de la Ciudad", director: "Carlos Rivas", imageUrl: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2023, puntaje: 4.8, genre: "Ciencia Ficción" },
//   { id: 3, title: "La Sombra del Ayer", director: "Isabel Moreno", imageUrl: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2021, puntaje: 4.2, genre: "Film-Noir" },
//   { id: 4, title: "Fronteras Invisibles", director: "Javier Soto", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2024, puntaje: 4.9, genre: "Suspenso" },
//   { id: 5, title: "Luces del Norte", director: "Sofía Núñez", imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2022, puntaje: 4.6, genre: "Aventura" },
//   { id: 6, title: "El Último Suspiro", director: "Pedro Almodóvar", imageUrl: "https://images.unsplash.com/photo-1518676590629-aabfc807f201?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2023, puntaje: 4.7, genre: "Romance" },
//   { id: 7, title: "Sueños de Papel", director: "Elena Gómez", imageUrl: "https://images.unsplash.com/photo-1535498730771-e7cbcd9925bb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", year: 2021, puntaje: 4.3, genre: "Fantasía" },
// ];

// const HomePage = () => {
//   const [selectedNewReleaseGenre, setSelectedNewReleaseGenre] = useState(null);
//   const [selectedPopularGenre, setSelectedPopularGenre] = useState(null);
//   const [selectedAllMoviesGenre, setSelectedAllMoviesGenre] = useState(null);
//   const [sortType, setSortType] = useState('default'); 
//   const [selectedLetter, setSelectedLetter] = useState(null);

//   const filteredNewReleases = selectedNewReleaseGenre
//     ? featuredMovies.filter(movie => movie.genre === selectedNewReleaseGenre)
//     : featuredMovies;

//   const filteredPopularMovies = selectedPopularGenre
//     ? featuredMovies.slice().reverse().filter(movie => movie.genre === selectedPopularGenre)
//     : featuredMovies.slice().reverse();

//   const allMovies = (() => {
//     let movies = [...featuredMovies];

//     if (selectedAllMoviesGenre) {
//       movies = movies.filter(movie => movie.genre === selectedAllMoviesGenre);
//     }

//     if (selectedLetter) {
//       movies = movies.filter(movie => movie.title.startsWith(selectedLetter));
//     }

//     if (sortType === 'year') {
//       movies.sort((a, b) => b.year - a.year);
//     } else if (sortType === 'alphabetical') {
//       movies.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     return movies;
//   })();

//   return (
//     <div className="text-white">
//       <section className="relative h-screen w-full flex items-end p-8 md:p-12 bg-cover bg-center pb-12" style={{ backgroundImage: `url('https://pavlov.psyciencia.com/2013/06/medianoche-en-paris.jpg')` }}>
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//         <div className="relative z-10">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">Medianoche en París</h1>
//           <p className="max-w-xl mb-6">Un escritor nostálgico es transportado mágicamente a la década de 1920 cada noche.</p>
//           <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold">Ver ahora</Button>
//         </div>
//       </section>

//       <div className="w-full container mx-auto px-4 mt-12">
//         <section>
//           <h2 className="text-2xl font-bold mb-4 text-yellow-400">Nuevos Lanzamientos Independientes</h2>
//           <GenreFilter selectedGenre={selectedNewReleaseGenre} onGenreChange={setSelectedNewReleaseGenre} />
//           <Carousel opts={{ align: "start", loop: filteredNewReleases.length > 4 }} className="w-full relative">
//             <CarouselContent>
//               {filteredNewReleases.map((movie) => (
//                 <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
//                   <Card className="cursor-pointer overflow-hidden border-0 bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
//                     <CardContent className="p-0">
//                       <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
//                       <div className="p-2">
//                         <h3 className="font-bold truncate">{movie.title}</h3>
//                         <div className="flex items-center justify-between text-sm text-muted-foreground">
//                           <p className="truncate">Dir. {movie.director}</p>
//                           <div className="flex items-center gap-1">
//                             <Star className="size-3 fill-yellow-400 text-yellow-400" />
//                             <span>{movie.puntaje}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
//             <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
//           </Carousel>
//         </section>

//         <section className="mt-12">
//           <h2 className="text-2xl font-bold mb-4 text-yellow-400">Películas Populares</h2>
//           <GenreFilter selectedGenre={selectedPopularGenre} onGenreChange={setSelectedPopularGenre} />
//           <Carousel opts={{ align: "start", loop: filteredPopularMovies.length > 4 }} className="w-full relative">
//             <CarouselContent>
//               {filteredPopularMovies.map((movie) => (
//                 <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
//                   <Card className="cursor-pointer overflow-hidden border-0 bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
//                     <CardContent className="p-0">
//                       <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
//                       <div className="p-2">
//                         <h3 className="font-bold truncate">{movie.title}</h3>
//                         <div className="flex items-center justify-between text-sm text-muted-foreground">
//                           <p className="truncate">Dir. {movie.director}</p>
//                           <div className="flex items-center gap-1">
//                             <Star className="size-3 fill-yellow-400 text-yellow-400" />
//                             <span>{movie.puntaje}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
//             <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
//           </Carousel>
//         </section>

//         <section className="mt-12">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-yellow-400">Todas las Películas</h2>
//             <div className="flex items-center gap-4">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="bg-gray-800 text-white hover:bg-yellow-500">
//                     Sort By: {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-gray-800 text-white">
//                   <DropdownMenuItem onSelect={() => setSortType('default')}>Default</DropdownMenuItem>
//                   <DropdownMenuItem onSelect={() => setSortType('year')}>Year</DropdownMenuItem>
//                   <DropdownMenuItem onSelect={() => setSortType('alphabetical')}>Alphabetical</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="bg-gray-800 text-white hover:bg-yellow-500">
//                     A-Z
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-gray-800 text-white p-2">
//                   <AlphabetFilter selectedLetter={selectedLetter} onLetterSelect={setSelectedLetter} />
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//           <div className="mb-8">
//             <GenreFilter selectedGenre={selectedAllMoviesGenre} onGenreChange={setSelectedAllMoviesGenre} />
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {allMovies.map((movie) => (
//               <div key={movie.id} className="p-2">
//                 <Card className="cursor-pointer overflow-hidden border-0 bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
//                   <CardContent className="p-0">
//                     <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
//                     <div className="p-2">
//                       <h3 className="font-bold truncate">{movie.title}</h3>
//                       <div className="flex items-center justify-between text-sm text-muted-foreground">
//                         <p className="truncate">Dir. {movie.director}</p>
//                         <div className="flex items-center gap-1">
//                           <Star className="size-3 fill-yellow-400 text-yellow-400" />
//                           <span>{movie.puntaje}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// HomePage.jsx
import { Button } from "@/components/ui/button";
import GenreCarouselSection from "@/components/GenreCarouselSection";

const GENRES = [
  "Accion",
  "Drama",
  "Comedia",
  "Terror",
  "Ciencia Ficcion",
  "Romance",
];

const HomePage = () => {
  return (
    <div className="text-white">
      {/* HERO igual que tu diseño actual */}
      <section
        className="relative h-screen w-full flex items-end p-8 md:p-12 bg-cover bg-center pb-12"
        style={{
          backgroundImage: `url('https://pavlov.psyciencia.com/2013/06/medianoche-en-paris.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Medianoche en París
          </h1>
          <p className="max-w-xl mb-6">
            Un escritor nostálgico es transportado mágicamente a la década de 1920
            cada noche.
          </p>
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold">
            Ver ahora
          </Button>
        </div>
      </section>

      <div className="w-full container mx-auto px-4 mt-12">
        {/* Un carrusel por género */}
        {GENRES.map((g) => (
         
          <GenreCarouselSection key={g} genre={g} title={g} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
