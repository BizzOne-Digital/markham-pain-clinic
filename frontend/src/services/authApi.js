import api from './api'

// Assumption: POST /api/auth/login -> { data: { token, admin: { name, email } } }
export default {
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
}
