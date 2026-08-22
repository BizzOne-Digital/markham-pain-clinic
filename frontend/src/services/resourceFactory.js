import api from './api'

// Generic CRUD factory shared by resource-specific api modules.
// Assumption: backend exposes standard REST endpoints returning
// { data: [...] } or { data: {...} } shaped JSON (see per-file notes).
export function createResourceApi(basePath) {
  return {
    getAll: (params) => api.get(basePath, { params }),
    getOne: (idOrSlug) => api.get(`${basePath}/${idOrSlug}`),
    create: (payload) =>
      api.post(basePath, payload, {
        headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
      }),
    update: (id, payload) =>
      api.put(`${basePath}/${id}`, payload, {
        headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
      }),
    remove: (id) => api.delete(`${basePath}/${id}`),
  }
}
