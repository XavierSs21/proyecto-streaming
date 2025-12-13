import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Award } from 'lucide-react';

export default function CreatorsSection() {
  const creators = [
    {
      id: 1,
      name: "Elena Gómez",
      specialty: "Drama Social",
      avatar: "https://i.pravatar.cc/300?img=1",
      bio: "Directora galardonada enfocada en historias de comunidades marginadas.",
      films: 8,
      awards: 3,
      featured: "Sueños de Papel"
    },
    {
      id: 2,
      name: "Carlos Rivas",
      specialty: "Thriller Psicológico",
      avatar: "https://i.pravatar.cc/300?img=12",
      bio: "Maestro del suspenso con una visión única del cine de autor.",
      films: 12,
      awards: 5,
      featured: "Ecos del Silencio"
    },
    {
      id: 3,
      name: "Isabel Moreno",
      specialty: "Ciencia Ficción",
      avatar: "https://i.pravatar.cc/300?img=5",
      bio: "Pionera del sci-fi latinoamericano con narrativas futuristas profundas.",
      films: 6,
      awards: 4,
      featured: "Horizontes Rojos"
    },
    {
      id: 4,
      name: "Javier Soto",
      specialty: "Documental Experimental",
      avatar: "https://i.pravatar.cc/300?img=13",
      bio: "Documentalista que desafía los límites entre ficción y realidad.",
      films: 15,
      awards: 7,
      featured: "Fronteras Invisibles"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Conoce a los creadores
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Directores independientes que están redefiniendo el cine contemporáneo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <Card 
              key={creator.id}
              className="group bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 ring-2 ring-amber-400/20 group-hover:ring-amber-400/50 transition-all">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold text-white mb-1">
                    {creator.name}
                  </h3>
                  
                  <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-400/30">
                    {creator.specialty}
                  </Badge>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {creator.bio}
                  </p>

                  <div className="flex gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Film className="w-4 h-4" />
                      <span>{creator.films} films</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Award className="w-4 h-4" />
                      <span>{creator.awards} premios</span>
                    </div>
                  </div>

                  <div className="w-full pt-4 border-t border-zinc-800">
                    <p className="text-xs text-gray-500 mb-2">Película destacada:</p>
                    <p className="text-sm text-amber-400 font-medium mb-3">
                      {creator.featured}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-zinc-700 text-white hover:bg-white/5 hover:border-amber-500/50"
                    >
                      Ver filmografía
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}