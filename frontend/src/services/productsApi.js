import { createResourceApi } from './resourceFactory'

const base = createResourceApi('/products')

// Normalizes the backend Product document's image.secure_url to a plain
// URL string, matching the shape other resource api modules expose.
function normalize(doc) {
  if (!doc || typeof doc !== 'object') return doc
  return {
    ...doc,
    image: doc.image?.secure_url || doc.image || '',
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
