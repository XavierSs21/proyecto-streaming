import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const genres = [
  "Accion", "Aventura", "Animación", "Biografía", "Comedia", "Crimen", 
  "Documental", "Drama", "Familiar", "Fantasía", "Film-Noir", "Historia", 
  "Terror", "Musical", "Misterio", "Romance", "Ciencia Ficción", 
  "Corto", "Deporte", "Superhéroes", "Suspenso", "Bélico", "Western"
];

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });

  const handleGenreClick = (genre) => {
    onGenreChange(selectedGenre === genre ? null : genre);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const atStart = scrollLeft < 10;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setScrollState({ atStart, atEnd });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkScrollPosition(); // Check initial position
      scrollContainer.addEventListener('scroll', checkScrollPosition);
    }
    
    // Also check on window resize
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [genres]); // Re-run if genres change

  return (
    <div className="relative mb-6 -mx-4">
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide px-4"
      >
        <div className="flex space-x-3">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant="outline"
              onClick={() => handleGenreClick(genre)}
              className={`border-gray-600 text-gray-300 bg-black/20 whitespace-nowrap transition-colors
                ${selectedGenre === genre 
                  ? 'bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600' 
                  : 'hover:text-yellow-400 hover:border-gray-500'}
              `}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Gradientes y botones condicionales */}
      {!scrollState.atStart && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <div className="w-12 h-full bg-gradient-to-r from-black/80 to-transparent"></div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 flex items-center">
            <Button onClick={() => scroll('left')} variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-white/20">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
      
      {!scrollState.atEnd && (
        <>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <div className="w-12 h-full bg-gradient-to-l from-black/80 to-transparent"></div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 flex items-center">
.
            <Button onClick={() => scroll('right')} variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-white/20">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GenreFilter;
