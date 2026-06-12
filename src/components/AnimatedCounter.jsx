import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedCounter({ value, suffix = '', decimals = 0, compact = false, label }) {
  const ref = useRef(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (compact) {
      return new Intl.NumberFormat('en-IN', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(latest)
    }

    return Number(latest).toFixed(decimals)
  })
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return undefined

    const controls = animate(count, value, {
      duration: 1.8,
      ease: 'easeOut',
    })

    return () => controls.stop()
  }, [count, isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-panel card-hover rounded-[1.75rem] p-6"
    >
      <div className="mb-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
    </motion.div>
  )
}

export default AnimatedCounter
