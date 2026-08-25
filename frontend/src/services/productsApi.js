import { createResourceApi } from './resourceFactory'

// Assumption: GET /api/products -> { data: [{ _id, name, slug, description, price, image }] }
export default createResourceApi('/products')
