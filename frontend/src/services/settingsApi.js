import api from './api'

// Assumption: GET /api/settings -> { data: { businessName, logo, favicon, phone, email, address, instagramUrl, openingHours, footerText } }
// PUT /api/settings -> { data: {...} }
export default {
  get: () => api.get('/settings'),
  update: (payload) =>
    api.put('/settings', payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
}
