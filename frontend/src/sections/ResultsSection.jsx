import AnimatedCounter from '../components/AnimatedCounter'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { resultsStats } from '../assets/siteData'

function ResultsSection() {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          kicker="Results"
          title="Metrics that show what a cleaner growth system can unlock."
          description="From faster launches to stronger pipeline quality, the impact shows up across the numbers ambitious teams care about most."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resultsStats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ResultsSection
