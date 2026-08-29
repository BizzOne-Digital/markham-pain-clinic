import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiCheckCircle } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import enquiriesApi from '../services/enquiriesApi'
import { CLINIC_INFO } from '../utils/placeholderData'

const SERVICE_OPTIONS = ['Physiotherapy', 'Acupuncture & Dry Needling', 'Chronic Pain Management', 'Sports Injury Rehabilitation', 'Manual Therapy', 'Other']
const CONTACT_METHODS = ['Phone', 'Email']

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  preferredContactMethod: 'Email',
  serviceInterested: '',
  message: '',
  consent: false,
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'A valid email is required.'
    if (!form.phone.trim()) next.phone = 'Phone number is required.'
    if (!form.message.trim()) next.message = 'Please add a short message.'
    if (!form.consent) next.consent = 'Please confirm consent to be contacted.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await enquiriesApi.create(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Markham Pain Clinic to book an appointment or ask a question." />
      <PageBanner title="Contact Us" crumb="Contact" />

      <section className="section-padding bg-white">
        <div className="container-app text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Contact Us</SectionLabel>
          <h1 className="section-heading mb-4">Get in Touch with Our Team</h1>
          <p className="text-textSecondary leading-relaxed">
            Our team of experienced physiotherapists provides personalized care to help you recover
            from injuries and improve your overall physical health.
          </p>
        </div>

        <div className="container-app grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-darkCoffee rounded-2xl p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-10">
                <FiCheckCircle className="text-gold text-4xl mb-4" />
                <h3 className="font-heading font-bold text-xl text-white mb-2">Thank you!</h3>
                <p className="text-beige/80 text-sm">
                  Your message has been received. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-heading font-bold text-xl text-white text-center mb-2">
                  Have a Query? Fill Up the Form.
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="fullName"
                      placeholder="Enter your Full Name"
                      value={form.fullName}
                      onChange={handleChange}
                      className="admin-input"
                    />
                    {errors.fullName && <p className="text-red-300 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      className="admin-input"
                    />
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="admin-input"
                    />
                    {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <select
                    name="preferredContactMethod"
                    value={form.preferredContactMethod}
                    onChange={handleChange}
                    className="admin-input"
                  >
                    {CONTACT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        Prefer {m}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  name="serviceInterested"
                  value={form.serviceInterested}
                  onChange={handleChange}
                  className="admin-input"
                >
                  <option value="">Select Service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <div>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="admin-input resize-none"
                  />
                  {errors.message && <p className="text-red-300 text-xs mt-1">{errors.message}</p>}
                </div>

                <label className="flex items-start gap-3 text-sm text-beige/80">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1" />
                  I consent to Markham Pain Clinic contacting me regarding my enquiry.
                </label>
                {errors.consent && <p className="text-red-300 text-xs -mt-3">{errors.consent}</p>}

                {status === 'error' && (
                  <p className="text-red-300 text-sm">Something went wrong sending your message. Please try again.</p>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center">
                  {status === 'submitting' ? 'Sending...' : 'SUBMIT'}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-3 mt-8">
              <a href={CLINIC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold transition">
                <FiInstagram />
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.address)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-darkCoffee rounded-xl p-5 flex items-center gap-4 text-white hover:bg-gold transition"
            >
              <FiMapPin size={20} />
              <span>{CLINIC_INFO.address}</span>
            </a>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} className="bg-darkCoffee rounded-xl p-5 flex items-center gap-4 text-white hover:bg-gold transition">
                <FiPhone size={20} />
                <span>{CLINIC_INFO.phone}</span>
              </a>
              <a href={`mailto:${CLINIC_INFO.email}`} className="bg-darkCoffee rounded-xl p-5 flex items-center gap-4 text-white hover:bg-gold transition">
                <FiMail size={20} />
                <span className="truncate">{CLINIC_INFO.email}</span>
              </a>
            </div>
            <div className="bg-darkCoffee rounded-xl p-5 flex items-center gap-4 text-white">
              <FiClock size={20} />
              <span>{CLINIC_INFO.hours}</span>
            </div>
            <p className="text-textSecondary italic text-center px-4 mt-2">
              Reach out to us today and let our experienced team help you move better.
            </p>
          </div>
        </div>

        <div className="container-app mt-12">
          <div className="rounded-2xl overflow-hidden border border-beige/70 h-72 bg-lightBeige flex items-center justify-center text-textSecondary text-sm">
            Google Maps embed placeholder — add clinic location map here.
          </div>
        </div>
      </section>
    </>
  )
}
