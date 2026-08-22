import { createResourceApi } from './resourceFactory'

// Assumption: GET /api/faqs -> { data: [{ _id, question, answer }] }
export default createResourceApi('/faqs')
