import { createResourceApi } from './resourceFactory'

// Assumption: GET /api/social-services -> { data: [{ _id, name, slug, description, image }] }
export default createResourceApi('/social-services')
