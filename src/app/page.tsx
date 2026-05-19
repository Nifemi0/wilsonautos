import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedCars from '@/components/sections/FeaturedCars'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedCars />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
