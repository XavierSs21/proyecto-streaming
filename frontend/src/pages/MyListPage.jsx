import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import { useGetMyList, useRemoveFromMyList } from "@/api/ListApi";
import ListCard from "@/components/ListCard"; 

export default function MyListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetMyList();

  const { removeFromMyList, isPending } = useRemoveFromMyList()

  const items = Array.isArray(data) ? data : data?.list || [];

  const handleRemove = async (movieId) => {
    await removeFromMyList(movieId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-14 h-14 text-amber-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-lg">Cargando mi lista...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h2 className="text-2xl text-white mb-3">No se pudo cargar tu lista</h2>
          <p className="text-gray-400 mb-6">Inicia sesión para ver “Mi Lista”.</p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            Ir a Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 lg:px-12 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Mi Lista</h1>
            <p className="text-gray-400">Tus películas guardadas</p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-300 hover:text-amber-400 hover:bg-white/10"
          >
            Volver
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">Tu lista está vacía</h3>
            <p className="text-gray-500 mb-6">Agrega una película desde el reproductor.</p>

            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              <Link to="/movies">Explorar películas</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <ListCard
                key={item._id}
                item={item}
                removing={isPending}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
