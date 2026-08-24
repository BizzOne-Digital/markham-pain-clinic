import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import QuickQueryForm from '../components/QuickQueryForm.jsx'

const POINTS = ['Evidence-based treatments', 'One-on-one personalized care', 'Focused on long-term results']

export default function AboutPreview() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-app grid lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="section-heading mb-5">
            Compassionate Care. <span className="gold-italic">Proven Results.</span>
          </h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            At Markham Pain Clinic, we believe recovery is more than treating symptoms — it&apos;s
            about understanding the whole person. Our multidisciplinary team combines evidence-based
            techniques with genuine, one-on-one attention to help you move better, feel stronger and
            live pain-free.
          </p>
          <ul className="space-y-3 mb-8">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-textMain font-medium">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                  <FiCheck size={14} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Button to="/about" variant="secondary">
            LEARN MORE ABOUT US
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden shadow-soft aspect-[4/5] flex items-end"
        >
          <img
            src="/about.png"
            alt="Warm, modern clinic reception interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="relative w-full p-5 sm:p-6">
            <QuickQueryForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
