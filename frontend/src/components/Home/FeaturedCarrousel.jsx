import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function FeaturedCarousel() {
  const featuredMovies = [
    {
      id: 1,
      title: "El Laberinto del Tiempo",
      director: "Ana García",
      genre: "Drama",
      rating: 4.5,
      year: 2024,
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
      synopsis: "Una exploración íntima sobre la memoria y el paso del tiempo en un pequeño pueblo olvidado."
    },
    {
      id: 2,
      title: "Sombras Urbanas",
      director: "Carlos Rivas",
      genre: "Thriller",
      rating: 4.2,
      year: 2024,
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
      synopsis: "Un detective rastrea las huellas de un misterio que conecta el presente con el pasado."
    },
    {
      id: 3,
      title: "Horizontes Rojos",
      director: "Isabel Moreno",
      genre: "Ciencia Ficción",
      rating: 4.8,
      year: 2023,
      poster: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400",
      synopsis: "En un futuro distópico, una científica busca redimir a la humanidad."
    },
    {
      id: 4,
      title: "Ecos del Silencio",
      director: "Javier Soto",
      genre: "Drama",
      rating: 4.6,
      year: 2024,
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
      synopsis: "La historia de un músico que pierde el oído y encuentra una nueva forma de crear."
    },
    {
      id: 5,
      title: "Frontera Invisible",
      director: "María López",
      genre: "Documental",
      rating: 4.7,
      year: 2024,
      poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400",
      synopsis: "Un viaje visual por las historias no contadas de migrantes contemporáneos."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Destacadas esta semana
          </h2>
          <p className="text-gray-400 text-lg">
            Las películas más aclamadas por nuestra comunidad
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featuredMovies.map((movie) => (
              <CarouselItem key={movie.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="group cursor-pointer">
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-8 h-8 text-black ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white text-sm line-clamp-3">
                            {movie.synopsis}
                          </p>
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/80 text-amber-400 border-amber-400/50">
                        <Star className="w-3 h-3 mr-1 fill-amber-400" />
                        {movie.rating}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Dir. {movie.director}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-zinc-700 text-gray-400">
                          {movie.genre}
                        </Badge>
                        <span className="text-xs text-gray-500">{movie.year}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 -left-4" />
          <CarouselNext className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 -right-4" />
        </Carousel>
      </div>
    </section>
  );
}