import { Film, Video, FileText, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function CategorySection() {
  const categories = [
    {
      icon: Film,
      title: "Películas Indie",
      description: "Largometrajes independientes de todo el mundo",
      count: "320+ títulos",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Video,
      title: "Cortometrajes",
      description: "Historias poderosas en formato breve",
      count: "150+ cortos",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "Documentales",
      description: "Realidades capturadas con visión única",
      count: "80+ docs",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Sparkles,
      title: "Nuevo Talento",
      description: "Primeras obras de directores emergentes",
      count: "45+ debuts",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Explora por categoría
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas en nuestra colección curada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="group bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105"
              >
                <div className="p-6 relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {category.description}
                  </p>
                  <p className="text-amber-400 text-sm font-medium">
                    {category.count}
                  </p>
                  
                  {/* Efecto de brillo en hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`}></div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}