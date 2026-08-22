import { createResourceApi } from './resourceFactory'
import api from './api'

// Assumption: POST /api/enquiries -> { data: {...} }
// GET /api/enquiries -> { data: [{ _id, fullName, email, phone, preferredContact, serviceInterested, message, status, createdAt }] }
const base = createResourceApi('/enquiries')

export default {
  ...base,
  markStatus: (id, status) => api.patch(`/enquiries/${id}/status`, { status }),
}
