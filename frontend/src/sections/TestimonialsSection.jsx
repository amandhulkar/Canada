import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import TestimonialSlider from '../components/TestimonialSlider'
import { testimonials } from '../assets/siteData'

function TestimonialsSection() {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          kicker="Testimonials"
          title="Loved by teams that want their growth stack to feel simpler and smarter."
          description="The strongest feedback is consistent: the experience feels polished, modern, and immediately useful in day-to-day execution."
        />

        <TestimonialSlider testimonials={testimonials} />
      </Container>
    </section>
  )
}

export default TestimonialsSection
