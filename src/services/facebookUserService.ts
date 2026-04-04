import { httpClient } from '@/lib/http/httpClient';
import type {
  APIResultSet,
  FacebookUserListDTO,
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria,
  PaginationResponse
} from '@/types';

const BASE_PATH = import.meta.env.VITE_BASE_FACEBOOK_EMPLOYEE_PATH || '/facebookuser';


// Service for FacebookUser API
export const facebookUserService = {
  // GET /api/[BASE_PATH]? (get all)
  getAll: async (): Promise<APIResultSet<FacebookUserListDTO[]>> => {
    return httpClient.get(`${BASE_PATH}`);
  },

  // GET /api/[BASE_PATH]?id= (get by id)
  get: async (id: string): Promise<APIResultSet<FacebookUserDetailDTO>> => {
    return httpClient.get(`${BASE_PATH}`, { id });
  },

  // POST /api/[BASE_PATH] (create)
  create: async (user: FacebookUserDetailDTO): Promise<APIResultSet<FacebookUserDetailDTO>> => {
    return httpClient.post(`${BASE_PATH}`, user);
  },

  // PUT /api/[BASE_PATH] (update)
  update: async (user: FacebookUserDetailDTO): Promise<APIResultSet<FacebookUserDetailDTO>> => {
    return httpClient.put(`${BASE_PATH}`, user);
  },

  // GET /api/[BASE_PATH]/search (search)
  search: async (
    criteria: Partial<FacebookUserSearchCriteria>,
    pageable?: Record<string, unknown>
  ): Promise<APIResultSet<PaginationResponse<FacebookUserDetailDTO>>> => {
    return httpClient.get(`${BASE_PATH}/search`, { ...criteria, ...pageable });
  },

  // DELETE /api/[BASE_PATH]?id= (delete by id)
  delete: async (id: string): Promise<APIResultSet<void>> => {
    return httpClient.delete(`${BASE_PATH}`, { id });
  },

  // GET /api/[BASE_PATH]/export-excel (export)
  exportExcel: async (criteria: Partial<FacebookUserSearchCriteria>): Promise<Blob> => {
    const url = `${BASE_PATH}/export-excel`;
    const params = new URLSearchParams(criteria as Record<string, string>).toString();
    const res = await fetch(`${url}?${params}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to export Excel');
    return await res.blob();
  },

  // DELETE /api/[BASE_PATH]/delete-all (delete all by ids)
  deleteAll: async (ids: string[]): Promise<APIResultSet<void>> => {
    return httpClient.delete(`${BASE_PATH}/delete-all`, ids);
  },
};
