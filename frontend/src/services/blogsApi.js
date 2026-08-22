import { createResourceApi } from './resourceFactory'

const base = createResourceApi('/blogs')

// Normalizes backend Blog documents (categories[], featuredImage.secure_url)
// to the shape the frontend components expect (category string, featuredImage URL string).
function normalize(doc) {
  if (!doc || typeof doc !== 'object') return doc
  return {
    ...doc,
    category: doc.category || doc.categories?.[0] || '',
    featuredImage: typeof doc.featuredImage === 'string' ? doc.featuredImage : doc.featuredImage?.secure_url || '',
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
