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
