import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiCheckCircle } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
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
        <div className="container-app grid lg:grid-cols-2 gap-14">
          <div className="space-y-8">
            <div className="admin-card">
              <h3 className="font-serif text-lg text-textMain mb-4">Get In Touch</h3>
              <ul className="space-y-4 text-sm text-textMain">
                <li className="flex items-center gap-3">
                  <FiPhone className="text-gold" /> {CLINIC_INFO.phone}
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="text-gold" /> {CLINIC_INFO.email}
                </li>
                <li className="flex items-start gap-3">
                  <FiMapPin className="text-gold mt-0.5" /> {CLINIC_INFO.address}
                </li>
                <li className="flex items-start gap-3">
                  <FiClock className="text-gold mt-0.5" /> {CLINIC_INFO.hours}
                </li>
                <li className="flex items-center gap-3">
                  <FiInstagram className="text-gold" />
                  <a href={CLINIC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold transition">
                    {CLINIC_INFO.instagram}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-beige/70 h-64 bg-lightBeige flex items-center justify-center text-textSecondary text-sm">
              Google Maps embed placeholder — add clinic location map here.
            </div>
          </div>

          <div className="admin-card">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-10">
                <FiCheckCircle className="text-gold text-4xl mb-4" />
                <h3 className="font-serif text-xl text-textMain mb-2">Thank you!</h3>
                <p className="text-textSecondary text-sm">
                  Your message has been received. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="admin-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className="admin-input" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="admin-label" htmlFor="email">
                      Email *
                    </label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="admin-input" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="admin-label" htmlFor="phone">
                      Phone *
                    </label>
                    <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="admin-input" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="admin-label" htmlFor="preferredContactMethod">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      value={form.preferredContactMethod}
                      onChange={handleChange}
                      className="admin-input"
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="admin-label" htmlFor="serviceInterested">
                    Service Interested In
                  </label>
                  <select
                    id="serviceInterested"
                    name="serviceInterested"
                    value={form.serviceInterested}
                    onChange={handleChange}
                    className="admin-input"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="admin-label" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="admin-input resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <label className="flex items-start gap-3 text-sm text-textSecondary">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1" />
                  I consent to Markham Pain Clinic contacting me regarding my enquiry.
                </label>
                {errors.consent && <p className="text-red-500 text-xs -mt-3">{errors.consent}</p>}

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong sending your message. Please try again.</p>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center">
                  {status === 'submitting' ? 'Sending...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
