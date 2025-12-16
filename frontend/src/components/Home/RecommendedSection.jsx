import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

export default function RecommendedSection() {
  const recommendations = [
    {
      id: 1,
      title: "Bajo el Sol Negro",
      director: "Patricia Vega",
      genre: "Drama",
      rating: 4.3,
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
      reason: "Porque te gustó 'El Laberinto del Tiempo'"
    },
    {
      id: 2,
      title: "Reflejos",
      director: "Marco Silva",
      genre: "Thriller",
      rating: 4.1,
      poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400",
      reason: "Basado en tus preferencias"
    },
    {
      id: 3,
      title: "Viento del Norte",
      director: "Ana Torres",
      genre: "Drama",
      rating: 4.6,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400",
      reason: "Tendencia en tu región"
    },
    {
      id: 4,
      title: "Ciudad de Cristal",
      director: "Roberto Méndez",
      genre: "Sci-Fi",
      rating: 4.4,
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
      reason: "Nuevos lanzamientos"
    }
  ];

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-12">
          <TrendingUp className="w-8 h-8 text-amber-400" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Recomendado para ti
          </h2>
        </div>
        
        <p className="text-gray-400 text-lg mb-12">
          Películas seleccionadas basadas en tus gustos y tendencias
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-black/80 text-amber-400 border-amber-400/50">
                    <Star className="w-3 h-3 mr-1 fill-amber-400" />
                    {movie.rating}
                  </Badge>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-amber-400 text-xs font-medium mb-1">
                      {movie.reason}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Dir. {movie.director}
                  </p>
                  <Badge variant="outline" className="text-xs border-zinc-700 text-gray-400">
                    {movie.genre}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}