import { motion } from 'framer-motion'
import Container from '../components/Container'
import { trustedBrands } from '../assets/siteData'

function TrustedBySection() {
  return (
    <section className="section-shell py-10 sm:py-12">
      <Container>
        <div className="rounded-[2rem] border border-line bg-white/90 px-6 py-8 shadow-soft sm:px-8">
          <div className="mb-6 text-center text-sm uppercase tracking-[0.28em] text-muted">
            Trusted by ambitious teams building the next category leaders
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {trustedBrands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                className="rounded-2xl border border-line bg-canvas-soft px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TrustedBySection
