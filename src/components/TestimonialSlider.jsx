import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi'

function TestimonialSlider({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const next = () => setActiveIndex((current) => (current + 1) % testimonials.length)
  const previous = () =>
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="glass-panel border-gradient rounded-[2rem] p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-400">
          {[...Array(5)].map((_, index) => (
            <FiStar key={index} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-accent-blue/30 hover:bg-accent-soft/60"
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-accent-blue/30 hover:bg-accent-soft/60"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="relative min-h-[250px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[activeIndex].name}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="max-w-4xl text-xl font-medium leading-9 text-ink sm:text-2xl">
              “{testimonials[activeIndex].quote}”
            </p>
            <div>
              <div className="text-lg font-semibold text-ink">{testimonials[activeIndex].name}</div>
              <div className="text-sm uppercase tracking-[0.24em] text-muted">
                {testimonials[activeIndex].role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition ${
              activeIndex === index ? 'w-10 bg-accent-blue' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider
