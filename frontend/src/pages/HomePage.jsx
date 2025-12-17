import GenreCarouselSection from "@/components/GenreCarouselSection";

const HomePage = () => {
  const GENRES = [
    { title: "Acción", value: "accion" },
    { title: "Drama", value: "drama" },
    { title: "Comedia", value: "comedia" },
    { title: "Terror", value: "terror" },
    { title: "Ciencia Ficción", value: "ciencia-ficcion" },
    { title: "Romance", value: "romance" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section
        className="relative h-[85vh] w-full flex items-end p-8 md:p-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://pavlov.psyciencia.com/2013/06/medianoche-en-paris.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Medianoche en París
          </h1>
          <p className="mb-6 text-gray-200">
            Un escritor nostálgico es transportado mágicamente a la década de 1920
            cada noche.
          </p>

          <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:bg-yellow-500 transition">
            Ver ahora
          </button>
        </div>
      </section>

      {/* GENRE SECTIONS */}
      <main className="pb-16">
        {GENRES.map((genre) => (
          <GenreCarouselSection
            key={genre.value}
            genre={genre.value}
            title={genre.title}
          />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
