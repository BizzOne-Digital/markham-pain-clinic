import { useEffect } from 'react'
import { CLINIC_INFO } from '../utils/placeholderData'

const SITE_URL = 'https://www.markhampain.com'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function SEO({ title, description, path, image, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${CLINIC_INFO.businessName}` : CLINIC_INFO.businessName
    document.title = fullTitle

    const canonical = path ? `${SITE_URL}${path}` : undefined
    const ogImage = image || `${SITE_URL}/hero.png`

    setMeta('name', 'description', description)
    setLink('canonical', canonical)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:site_name', CLINIC_INFO.businessName)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    setJsonLd('page-jsonld', jsonLd || null)
  }, [title, description, path, image, jsonLd])

  return null
}
