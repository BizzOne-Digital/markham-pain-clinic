import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import enquiriesApi from '../services/enquiriesApi'

const SERVICE_OPTIONS = ['Physiotherapy', 'Acupuncture & Dry Needling', 'Chronic Pain Management', 'Sports Injury Rehabilitation', 'Manual Therapy', 'Other']

const initialForm = { fullName: '', email: '', phone: '', serviceInterested: '', message: '', consent: true }

export default function QuickQueryForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) return
    setStatus('submitting')
    try {
      await enquiriesApi.create(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
        <FiCheckCircle className="text-gold text-3xl mx-auto mb-3" />
        <h3 className="font-serif text-lg text-textMain mb-1">Thank you!</h3>
        <p className="text-textSecondary text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 space-y-4">
      <h3 className="font-serif text-lg text-textMain text-center mb-2">Have a Query? Fill Up the Form.</h3>
      <input
        name="fullName"
        placeholder="Enter your full name"
        value={form.fullName}
        onChange={handleChange}
        className="admin-input"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={form.email}
        onChange={handleChange}
        className="admin-input"
        required
      />
      <input
        name="phone"
        placeholder="Enter your phone number"
        value={form.phone}
        onChange={handleChange}
        className="admin-input"
      />
      <select name="serviceInterested" value={form.serviceInterested} onChange={handleChange} className="admin-input">
        <option value="">Select Service</option>
        {SERVICE_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        placeholder="Enter your message"
        rows={3}
        value={form.message}
        onChange={handleChange}
        className="admin-input resize-none"
        required
      />
      {status === 'error' && <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center">
        {status === 'submitting' ? 'Sending...' : 'SUBMIT'}
      </button>
    </form>
  )
}
