import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { aboutStats } from '../assets/siteData'

function AboutSection() {
  return (
    <section id="about" className="section-shell bg-canvas-soft/60">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeading
            kicker="About"
            title="Launch professional websites and manage client work from one clean dashboard."
            description="FindTemplates helps teams create client projects, assign developers, manage invoices, and deliver polished websites without scattered manual work."
          />
          <div className="rounded-[2rem] border border-line bg-white p-7 leading-8 text-muted shadow-soft">
            <p>
              We built FindTemplates for agencies, freelancers, and growing businesses that need a faster way to turn templates into real client websites. From project setup to developer assignment and billing, everything stays organized in one place.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-canvas-soft p-4">
                <p className="text-sm font-semibold text-ink">Company</p>
                <p className="mt-1 text-sm text-muted">17219296 Canada Inc.</p>
              </div>
              <div className="rounded-2xl bg-canvas-soft p-4">
                <p className="text-sm font-semibold text-ink">Registered in</p>
                <p className="mt-1 text-sm text-muted">Ontario, Canada</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {aboutStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="glass-panel card-hover h-full rounded-[1.9rem] p-7">
                <div className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">{stat.value}</div>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default AboutSection
