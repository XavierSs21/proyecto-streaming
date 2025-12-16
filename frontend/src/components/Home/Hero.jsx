import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video/Imagen de fondo */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1574267432644-f65b75dca2d5?w=1920)',
                        filter: 'grayscale(30%)'
                    }}
                ></div>
                {/* Efecto de película */}
                <div className="absolute inset-0 z-10 opacity-10"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.5) 2px, rgba(0,0,0,.5) 4px)'
                    }}
                ></div>
            </div>

            {/* Contenido */}
            <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-6 animate-fade-in">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">
                                Cine Independiente Original
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                            Descubre historias
                            <span className="block text-amber-400">sin filtro</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
                            Explora el mejor cine independiente. Voces auténticas, narrativas
                            arriesgadas y talento emergente en un solo lugar.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 h-14 group"
                            >
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Explorar ahora
                            </Button>
                            <Link to="/register">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 h-14 transition-all duration-300"
                                >
                                    Crear cuenta gratis
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 animate-fade-in-up animation-delay-600">
                            <div>
                                <div className="text-3xl font-bold text-white">500+</div>
                                <div className="text-sm text-gray-400">Películas indie</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">150+</div>
                                <div className="text-sm text-gray-400">Directores</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-sm text-gray-400">Países</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-scroll"></div>
                </div>
            </div>
        </section>
    );
}