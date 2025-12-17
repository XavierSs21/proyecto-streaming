import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieById } from '@/api/MovieApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, User, Film } from 'lucide-react';
import { useAddToMyList, useGetMyList } from '@/api/ListApi';
import { toast } from 'sonner';

export default function MoviePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useGetMovieById(id);

  // const { data: myListData = [] } = useGetMyList();
  // const myList = Array.isArray(myListData) ? myListData : myListData?.list || [];
  // const isInMyList = myList.some((m) => (m?._id || m) === movie._id);

  const { data: myListData = [] } = useGetMyList();
const myList = Array.isArray(myListData) ? myListData : myListData?.list || [];

const movieId = movie?._id; // ✅ seguro

const isInMyList =
  !!movieId &&
  myList.some((item) => {
    // tu backend devuelve { movie: {...} } por populate
    const m = item?.movie?._id ? item.movie : item;
    return (m?._id || m) === movieId;
  });

  const { addToMyList, isPending: adding } = useAddToMyList();

  // const handleAdd = async () => {
  //   await addToMyList(movie._id);
  // };

  const handleAdd = async () => {
  if (!movie?._id) return;
  try {
    await addToMyList(movie._id);
  } catch (e) {
    toast.error("No se pudo agregar", { description: e.message });
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-amber-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Cargando película...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Película no encontrada</h2>
          <Button onClick={() => navigate('/')} className="bg-amber-500 hover:bg-amber-600 text-black">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
  
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent p-6">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-white hover:text-amber-400 hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
      </div>

    
      <div className="relative w-full bg-black" style={{ paddingTop: '56.25%' }}>
        <video
          controls
          autoPlay
          className="absolute top-0 left-0 w-full h-full"
          poster={movie.thumbnailUrl}
        >
          <source src={movie.videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          
      
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Button
            onClick={handleAdd}
            disabled={adding || isInMyList}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-60"
          >
            {isInMyList ? "En Mi Lista" : adding ? "Agregando..." : "Agregar a Mi Lista"}
          </Button>

            {Array.isArray(movie.genre) ? (
              movie.genre.map((g, idx) => (
                <Badge key={idx} variant="outline" className="border-amber-400 text-amber-400">
                  {g}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="border-amber-400 text-amber-400">
                {movie.genre}
              </Badge>
            )}
          </div>

   
          <div className="flex items-center gap-6 text-gray-400 mb-8 flex-wrap">
            {movie.year && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
            )}
            {movie.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{movie.duration} min</span>
              </div>
            )}
            {movie.director && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dir. {movie.director}</span>
              </div>
            )}
          </div>

    
          {movie.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}