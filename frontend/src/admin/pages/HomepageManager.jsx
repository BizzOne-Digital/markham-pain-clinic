import { useEffect, useState } from 'react'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import homepageApi from '../../services/homepageApi'

const emptyForm = {
  heroHeadline: '',
  heroSubheading: '',
  ctaText: '',
  ctaUrl: '',
  welcomeText: '',
  aboutText: '',
}

export default function HomepageManager() {
  const [form, setForm] = useState(emptyForm)
  const [heroImage, setHeroImage] = useState(null)
  const [aboutImage, setAboutImage] = useState(null)
  const [existing, setExisting] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    homepageApi
      .get()
      .then((res) => {
        const data = res?.data?.data
        if (data) {
          setForm({
            heroHeadline: data.hero?.headline || '',
            heroSubheading: data.hero?.subheading || '',
            ctaText: data.hero?.ctaText || '',
            ctaUrl: data.hero?.ctaUrl || '',
            welcomeText: data.hero?.welcomeText || '',
            aboutText: data.about?.text || '',
          })
          setExisting({ heroImage: data.hero?.image, aboutImage: data.about?.image })
        }
      })
      .catch(() => {
        // Fallback: homepage API unavailable, keep blank form
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))
    if (heroImage) payload.append('heroImage', heroImage)
    if (aboutImage) payload.append('aboutImage', aboutImage)

    try {
      await homepageApi.update(payload)
      setSaved(true)
    } catch {
      alert('Failed to save homepage content. Please check the backend connection.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif text-2xl text-textMain">Homepage Content</h1>
      <form onSubmit={handleSubmit} className="admin-card space-y-5">
        <h2 className="font-serif text-lg text-textMain">Hero Section</h2>
        <FormField label="Headline" name="heroHeadline" value={form.heroHeadline} onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })} />
        <FormField label="Subheading" name="heroSubheading" textarea value={form.heroSubheading} onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })} />
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="CTA Text" name="ctaText" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} />
          <FormField label="CTA URL" name="ctaUrl" value={form.ctaUrl} onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })} />
        </div>
        <ImageUploader label="Hero Image" value={existing.heroImage} onChange={setHeroImage} />

        <h2 className="font-serif text-lg text-textMain pt-4 border-t border-beige">About Section</h2>
        <FormField label="Welcome Text" name="welcomeText" textarea value={form.welcomeText} onChange={(e) => setForm({ ...form, welcomeText: e.target.value })} />
        <FormField label="About Text" name="aboutText" textarea value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })} />
        <ImageUploader label="About Image" value={existing.aboutImage} onChange={setAboutImage} />

        {saved && <p className="text-green-600 text-sm">Homepage content saved successfully.</p>}
        <button type="submit" disabled={saving} className="admin-btn-primary">
          {saving ? 'Saving...' : 'Save Homepage'}
        </button>
      </form>
    </div>
  )
}
