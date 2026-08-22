import { createResourceApi } from './resourceFactory'

const base = createResourceApi('/testimonials')

// Normalizes backend Testimonial documents (message, image.secure_url) to
// the shape the frontend components expect (testimonial, photo as a URL string).
function normalize(doc) {
  if (!doc || typeof doc !== 'object') return doc
  return {
    ...doc,
    testimonial: doc.testimonial || doc.message,
    photo: doc.photo || doc.image?.secure_url || doc.image || '',
  }
}

function mapResponse(promise) {
  return promise.then((res) => {
    const data = res?.data?.data
    if (Array.isArray(data)) res.data.data = data.map(normalize)
    else if (data) res.data.data = normalize(data)
    return res
  })
}

export default {
  ...base,
  getAll: (params) => mapResponse(base.getAll(params)),
  getOne: (idOrSlug) => mapResponse(base.getOne(idOrSlug)),
}
