import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedCars from '@/components/sections/FeaturedCars'
import BrowseBy from '@/components/sections/BrowseBy'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedCars />
      <BrowseBy />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}
