// src/components/GenreCarouselSection.jsx
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useGetMoviesByGenre } from "@/api/MovieApi";

const fallbackThumb =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop";

export default function GenreCarouselSection({ genre, title }) {
  const { data: movies = [], isLoading, isError } = useGetMoviesByGenre(genre);

  if (isLoading) return <p className="px-6">Cargando...</p>;

  if (!movies.length)
    return (
      <section className="px-6 mt-10">
        <h2 className="text-xl font-bold text-yellow-400">{title}</h2>
        <p className="text-gray-400 mt-2">No hay películas en este género</p>
      </section>
    );

  if (isError) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          {title || genre}
        </h2>
        <p className="text-red-400">Error al cargar películas</p>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        {title || genre}
      </h2>

      <Carousel
        opts={{ align: "start", loop: movies.length > 4 }}
        className="w-full relative"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie._id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2"
            >
              <Card className="cursor-pointer overflow-hidden border-0 bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
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
                      <p className="truncate">{movie.director ? `Dir. ${movie.director}` : " "}</p>
                      {/* Si luego tienes rating real, aquí lo conectas */}
                      <div className="flex items-center gap-1 opacity-60">
                        {/* <Star className="size-3" /> */}
                        <span>{movie.year ?? ""}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-110 transition-all" />
      </Carousel>
    </section>
  );
}
