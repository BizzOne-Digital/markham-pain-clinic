import api from './api'

// Assumption: GET /api/homepage -> { data: { hero: {...}, about: {...}, statistics: [...], features: [...], treatmentSteps: [...], sectionVisibility: {...} } }
// PUT /api/homepage -> { data: {...} }
export default {
  get: () => api.get('/homepage'),
  update: (payload) =>
    api.put('/homepage', payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
}
