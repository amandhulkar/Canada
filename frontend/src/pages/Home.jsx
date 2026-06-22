// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import AboutSection from '../sections/AboutSection'
// import ContactSection from '../sections/ContactSection'
// import FAQSection from '../sections/FAQSection'
// import Footer from '../sections/Footer'
// import HeroSection from '../sections/HeroSection'
// // import Navbar from '../sections/Navbar'
// import PortfolioSection from '../sections/PortfolioSection'
// import PricingSection from '../sections/PricingSection'
// import ResultsSection from '../sections/ResultsSection'
// import ServicesSection from '../sections/ServicesSection'
// import TestimonialsSection from '../sections/TestimonialsSection'
// import TrustedBySection from '../sections/TrustedBySection'
// import WhyChooseUsSection from '../sections/WhyChooseUsSection'

// function Home() {
//   const location = useLocation()

//   useEffect(() => {
//     if (location.hash === '#pricing') {
//       const el = document.getElementById('pricing')
//       if (el) {
//         setTimeout(() => {
//           el.scrollIntoView({ behavior: 'smooth' })
//         }, 100)
//       }
//     }
//   }, [location])

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* <Navbar /> */}
//       <main>
//         <HeroSection />
//         <TrustedBySection />
//         <ServicesSection />
//         <AboutSection />
//         <PortfolioSection />
//         <WhyChooseUsSection />
//         <ResultsSection />
//         <TestimonialsSection />
//         <PricingSection />
//         <FAQSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default Home

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import FAQSection from '../sections/FAQSection'
import Footer from '../sections/Footer'
import HeroSection from '../sections/HeroSection'
// import Navbar from '../sections/Navbar'
import PortfolioSection from '../sections/PortfolioSection'
import PricingSection from '../sections/PricingSection'
import ResultsSection from '../sections/ResultsSection'
import ServicesSection from '../sections/ServicesSection'
// import TestimonialsSection from '../sections/TestimonialsSection'
import TrustedBySection from '../sections/TrustedBySection'
import WhyChooseUsSection from '../sections/WhyChooseUsSection'

function Home() {
  const location = useLocation()
  
  useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }
}, [location]);

  return (
    <div className="relative overflow-x-hidden">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <AboutSection />
        {/* <PortfolioSection /> */}
        <WhyChooseUsSection />
        {/* <ResultsSection /> */}
        {/* <TestimonialsSection /> */}
        <PricingSection />
        {/* <FAQSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home