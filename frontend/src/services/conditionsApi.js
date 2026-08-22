import { createResourceApi } from './resourceFactory'

// Assumption: GET /api/conditions -> { data: [{ _id, name, slug, icon }] }
export default createResourceApi('/conditions')
