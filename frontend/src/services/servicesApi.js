import { createResourceApi } from './resourceFactory'

const base = createResourceApi('/services')

// Normalizes backend Service documents (title, image.secure_url) to the
// shape the frontend components expect (name, image as a plain URL string).
function normalize(doc) {
  if (!doc || typeof doc !== 'object') return doc
  return {
    ...doc,
    name: doc.name || doc.title,
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
