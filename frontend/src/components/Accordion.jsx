import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="divide-y divide-beige">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item._id || item.question} className="py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between text-left gap-4"
            >
              <span className="font-serif text-base sm:text-lg text-textMain">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-gold flex-shrink-0 text-xl"
              >
                <FiPlus />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-textSecondary text-sm sm:text-base pt-3 leading-relaxed pr-8">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
