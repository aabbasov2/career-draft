'use client';

import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

// Import components with dynamic loading
const FeaturesSection = dynamic(() => import('../components/FeaturesSection'));

// TODO: Uncomment and implement TestimonialsSection later
// const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'));

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* TODO: Uncomment when TestimonialsSection is ready */}
        {/* <TestimonialsSection /> */}
      </main>
      <Footer />
    </div>
  );
}
