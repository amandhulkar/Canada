import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="glass-panel rounded-[1.75rem] px-6 py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-ink">{item.question}</span>
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <FiPlus />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pt-4 leading-8 text-muted">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default FAQItem
