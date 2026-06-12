import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { reasons } from '../assets/siteData'

function WhyChooseUsSection() {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          kicker="Why teams choose Velora"
          title="A modern SaaS experience that keeps growth work simple, clear, and beautifully organized."
          description="The product is designed to reduce friction for growing teams while still feeling premium at every touchpoint."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon

            return (
              <Reveal key={reason.title} delay={index * 0.05}>
                <div className="glass-panel card-hover h-full rounded-[1.9rem] p-7">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink">{reason.title}</h3>
                  <p className="mt-4 leading-8 text-muted">{reason.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUsSection
