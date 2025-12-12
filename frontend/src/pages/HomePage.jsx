import Header from '@/components/Header';
import Hero from '@/components/Home/Hero'
import FeaturedCarousel from '@/components/Home/FeaturedCarrousel';
import CategorySection from '@/components/Home/CategorySection';
import RecommendedSection from '@/components/Home/RecommendedSection';
import CreatorsSection from '@/components/Home/CreatorsSection';
import Footer from '@/components/Home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <FeaturedCarousel />
      <CategorySection />
      <RecommendedSection />
      <CreatorsSection />
      <Footer />
    </div>
  );
}