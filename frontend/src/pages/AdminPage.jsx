import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Film, Plus, Pencil, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MovieForm from '@/components/forms/MovieForm';
import { toast } from 'sonner';

export default function AdminPage() {
  const [movies, setMovies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar películas al montar
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movie');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error al cargar películas:', error);
    }
  };

  const handleCreateMovie = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        toast.success("¡Película creada exitosamente!");
        setIsDialogOpen(false);
        fetchMovies(); // Recargar lista
      } else {
        const error = await response.json();
        toast.error(error.message || "Error al crear película");
      }
    } catch (error) {
      toast.error("Error de conexión");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta película?")) return;

    try {
      const response = await fetch(`/api/movie/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMovies(movies.filter(m => m._id !== id));
        toast.success("Película eliminada");
      } else {
        toast.error("Error al eliminar película");
      }
    } catch (error) {
      toast.error("Error de conexión");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-amber-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
                <p className="text-gray-400 text-sm">Gestiona las películas de IndieStream</p>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Plus className="w-5 h-5 mr-2" />
                  Nueva Película
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">Nueva Película</DialogTitle>
                </DialogHeader>
                <MovieForm onSubmit={handleCreateMovie} isLoading={isLoading} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Card key={movie._id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
                <div className="relative aspect-[2/3] overflow-hidden">
                  {movie.thumbnailUrl ? (
                    <img 
                      src={movie.thumbnailUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <Film className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}
                  
                  {/* Overlay con botones */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDeleteMovie(movie._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  {/* Duration badge */}
                  {movie.duration && (
                    <Badge className="absolute top-3 right-3 bg-black/80 text-amber-400 border-amber-400/50">
                      <Clock className="w-3 h-3 mr-1" />
                      {movie.duration} min
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                    {movie.title}
                  </h3>
                  {movie.director && (
                    <p className="text-gray-400 text-sm mb-2">
                      Dir. {movie.director}
                    </p>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {movie.genre && movie.genre.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {movie.genre.slice(0, 2).map((g, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs border-zinc-700 text-gray-400"
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {movie.year && (
                      <span className="text-xs text-gray-500">{movie.year}</span>
                    )}
                  </div>
                  {movie.description && (
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                      {movie.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No hay películas todavía</h3>
            <p className="text-gray-500 mb-6">Comienza agregando tu primera película</p>
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