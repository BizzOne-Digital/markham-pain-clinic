import { useEffect, useState } from 'react'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import settingsApi from '../../services/settingsApi'

const emptyForm = { businessName: '', phone: '', email: '', address: '', instagramUrl: '', openingHours: '', footerText: '' }

export default function SettingsManager() {
  const [form, setForm] = useState(emptyForm)
  const [logo, setLogo] = useState(null)
  const [favicon, setFavicon] = useState(null)
  const [existing, setExisting] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    settingsApi
      .get()
      .then((res) => {
        const data = res?.data?.data
        if (data) {
          setForm({
            businessName: data.businessName || '',
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            instagramUrl: data.instagramUrl || '',
            openingHours: data.openingHours || '',
            footerText: data.footerText || '',
          })
          setExisting({ logo: data.logo, favicon: data.favicon })
        }
      })
      .catch(() => {
        // Fallback: settings API unavailable, keep blank form
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))
    if (logo) payload.append('logo', logo)
    if (favicon) payload.append('favicon', favicon)

    try {
      await settingsApi.update(payload)
      setSaved(true)
    } catch {
      alert('Failed to save settings. Please check the backend connection.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif text-2xl text-textMain">Website Settings</h1>
      <form onSubmit={handleSubmit} className="admin-card space-y-5">
        <FormField label="Business Name" name="businessName" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Phone" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <FormField label="Address" name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <FormField label="Instagram URL" name="instagramUrl" value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} />
        <FormField label="Opening Hours" name="openingHours" value={form.openingHours} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} />
        <FormField label="Footer Text" name="footerText" textarea value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
        <div className="grid sm:grid-cols-2 gap-5">
          <ImageUploader label="Logo" value={existing.logo} onChange={setLogo} />
          <ImageUploader label="Favicon" value={existing.favicon} onChange={setFavicon} />
        </div>
        {saved && <p className="text-green-600 text-sm">Settings saved successfully.</p>}
        <button type="submit" disabled={saving} className="admin-btn-primary">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
