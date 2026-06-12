import { FiCheck } from 'react-icons/fi'
import Container from '../components/Container'
import PrimaryButton from '../components/PrimaryButton'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { pricingPlans } from '../assets/siteData'

function PricingSection() {
  return (
    <section id="pricing" className="section-shell">
      <Container>
        <SectionHeading
          kicker="Pricing"
          title="Simple plans for teams growing into a more mature operating rhythm."
          description="Choose the setup that fits your current stage, then scale into more capability as your team and experimentation needs expand."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06}>
              <article
                className={`glass-panel h-full rounded-[1.9rem] p-7 ${
                  plan.featured ? 'border-gradient bg-white' : ''
                }`}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted">{plan.name}</p>
                    <div className="mt-4 flex items-end gap-2 text-ink">
                      <span className="text-4xl font-semibold tracking-[-0.04em]">{plan.price}</span>
                      {plan.cadence ? <span className="pb-1 text-muted">{plan.cadence}</span> : null}
                    </div>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-purple">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="leading-8 text-muted">{plan.summary}</p>
                <div className="my-7 h-px bg-line" />
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-ink">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FiCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <PrimaryButton
                  href="#contact"
                  variant={plan.featured ? 'primary' : 'ghost'}
                  className="mt-8 w-full"
                >
                  Choose {plan.name}
                </PrimaryButton>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default PricingSection
