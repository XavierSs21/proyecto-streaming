import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Pencil, Trash } from "lucide-react";

const MovieAdminCard = ({ movie, onEdit, onDelete }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden flex flex-col hover:shadow-xl transition">
        <div className="p-3">
      <AspectRatio ratio={16 / 9}>
        <img
          src={movie.thumbnailUrl || "/placeholder-movie.jpg"}
          alt={movie.title}
          className="object-cover w-full h-full rounded-xl"
        />
      </AspectRatio>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg font-semibold line-clamp-1">
          {movie.title}
        </CardTitle>
        <p className="text-sm text-gray-400">
          {movie.director || "Director desconocido"}
          {movie.year && ` · ${movie.year}`}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <p className="text-sm text-gray-500 line-clamp-3">
          {movie.description || "Sin descripción"}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          {movie.genre && (
            <span className="px-2 py-1 rounded bg-zinc-800 text-gray-300">
              {movie.genre}
            </span>
          )}
          {movie.duration && (
            <span className="px-2 py-1 rounded bg-zinc-800 text-gray-300">
              ⏱ {movie.duration} min
            </span>
          )}
        </div>
      </CardContent>

   
      <CardFooter className="border-t border-zinc-800 p-3">
        <div className="flex gap-2 w-full ">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(movie._id)}
        >
          <Pencil className="w-4 h-4 mr-1" />
          Editar
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(movie._id)}
        >
          <Trash className="w-4 h-4 mr-1" />
          Eliminar
        </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieAdminCard;
