import { createResourceApi } from './resourceFactory'

// Assumption: GET /api/stats -> { data: [{ _id, label, value, suffix }] }
export default createResourceApi('/stats')
