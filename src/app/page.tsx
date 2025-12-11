import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import TeamCarousel from '@/components/home/TeamCarousel';
import GallerySection from '@/components/home/GallerySection';
import LoyaltySection from '@/components/home/LoyaltySection';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import CTASection from '@/components/home/CTASection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main className="overflow-x-hidden">
        {/* Hero Section - Full Viewport */}
        <HeroSection />

        {/* Services Premium */}
        <ServicesGrid />

        {/* Team - Nos Maîtres Barbiers */}
        <TeamCarousel />

        {/* Gallery - Transformations Avant/Après */}
        <GallerySection />

        {/* Programme de Fidélité */}
        <LoyaltySection />

        {/* Témoignages Clients */}
        <TestimonialsCarousel />

        {/* CTA Final */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}