import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Play } from "lucide-react";

const fallbackThumb =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop";

export default function ListCard({ item, onRemove, removing }) {
  const movie = item?.movie; // ✅ la peli viene aquí por populate

  if (!movie) return null;

  return (
    <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
      {/* Imagen izquierda */}
      <Link to={`/movie/${movie._id}`} className="shrink-0 w-36 sm:w-44 md:w-56">
        <img
          src={movie.thumbnailUrl || fallbackThumb}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>

      {/* Info derecha */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {movie.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {movie.director ? `Dir. ${movie.director}` : ""}
                {movie.year ? ` • ${movie.year}` : ""}
                {movie.duration ? ` • ${movie.duration} min` : ""}
              </p>
            </div>

            <Button
              variant="ghost"
              disabled={removing}
              onClick={() => onRemove(movie._id)} // ✅ remove usa movieId
              className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Quitar
            </Button>
          </div>

          {/* Géneros */}
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.isArray(movie.genre) ? (
              movie.genre.map((g, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-amber-400 text-amber-400"
                >
                  {g}
                </Badge>
              ))
            ) : movie.genre ? (
              <Badge variant="outline" className="border-amber-400 text-amber-400">
                {movie.genre}
              </Badge>
            ) : null}
          </div>

          {/* Descripción corta */}
          {movie.description && (
            <p className="text-gray-300 text-sm mt-3 line-clamp-2">
              {movie.description}
            </p>
          )}
        </div>

        {/* CTA */}
        <div>
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            <Link to={`/movie/${movie._id}`}>
              <Play className="w-4 h-4 mr-2" />
              Reproducir
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
