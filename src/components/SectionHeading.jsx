import { motion } from 'framer-motion'

function SectionHeading({ kicker, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-12 flex max-w-3xl flex-col gap-4 ${alignment}`}
    >
      <span className="section-kicker">{kicker}</span>
      <div className="space-y-4">
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-ink sm:text-4xl lg:text-[3rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      </div>
    </motion.div>
  )
}

export default SectionHeading
