import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { aboutStats } from '../assets/siteData'

function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal>
          <SectionHeading
            kicker="About"
            title="A product-led operating layer for teams that want premium execution without extra complexity."
            description="Velora helps modern teams keep strategy, creative, pages, and performance aligned inside a workflow that feels calm, structured, and fast to use."
          />
          <div className="rounded-[2rem] border border-line bg-white p-7 leading-8 text-muted shadow-soft">
            <p>
              Instead of juggling scattered tools and disconnected reporting, teams get a more unified experience for moving campaigns forward, shipping polished landing pages, and making better decisions from the same source of truth.
            </p>
            <div className="mt-6 rounded-[1.5rem] border border-line bg-canvas-soft p-5 text-sm leading-7 text-muted">
              <p className="font-semibold text-ink">Legal Entity Name: 17219296 Canada Inc.</p>
              <p className="mt-2">Registered under: Canada Business Corporations Act (CBCA)</p>
              <p>Incorporation Date: August 6, 2025</p>
              <p>Province of Incorporation: Ontario, Canada</p>
              <p>Corporation Number: 1721929-6</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {aboutStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="glass-panel card-hover rounded-[1.9rem] p-7">
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
