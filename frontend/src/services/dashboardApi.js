import api from './api'

// Assumption: GET /api/dashboard -> { data: { totals: { services, team, testimonials, blogs, enquiries }, recentEnquiries: [...] } }
export default {
  getOverview: () => api.get('/dashboard'),
}
