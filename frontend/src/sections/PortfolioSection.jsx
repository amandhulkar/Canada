import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolioItems } from '../assets/siteData'

function PortfolioSection() {
  return (
    <section id="portfolio" className="section-shell">
      <Container>
        <SectionHeading
          kicker="Customers"
          title="How fast-moving teams use to bring clarity and polish to growth execution."
          description="Each customer story reflects the same outcome: less friction, better visibility, and a cleaner system for launching and learning."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <article className="glass-panel card-hover overflow-hidden rounded-[1.9rem]">
                <div className={`h-56 bg-gradient-to-br ${item.gradient}`} />
                <div className="space-y-6 p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted">{item.category}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">{item.name}</h3>
                    </div>
                    <div className="rounded-full border border-line bg-canvas-soft px-4 py-2 text-sm text-ink">
                      {item.outcome}
                    </div>
                  </div>
                  <p className="leading-8 text-muted">{item.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default PortfolioSection
