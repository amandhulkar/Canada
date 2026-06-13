import { FiArrowRight } from 'react-icons/fi'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { services } from '../assets/siteData'

function ServicesSection() {
  return (
    <section id="features" className="section-shell">
      <Container>
        <SectionHeading
          kicker="Features"
          title="Powerful tools to launch pages, manage campaigns, and keep growth work moving."
          description="Everything is structured to help your team build faster, collaborate better, and understand performance without adding operational noise."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <article className="glass-panel card-hover h-full rounded-[1.75rem] p-7">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink">{service.title}</h3>
                  <p className="mt-4 leading-8 text-muted">{service.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="text-sm text-muted">{service.outcome}</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft">
                      <FiArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ServicesSection
