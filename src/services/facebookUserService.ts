import { httpClient } from '../lib/http/httpClient';
import type {
  APIResultSet,
  FacebookUserDetailDTO,
  FacebookUserListDTO,
  FacebookUserSearchCriteria,
  PaginationResponse
} from '../types';

const API_BASE_FACEBOOK_USER_URL = '/facebookuser';

export const facebookUserService = {
  ping: () => httpClient.get<string>(`${API_BASE_FACEBOOK_USER_URL}/ping`),

  getAll: (): Promise<APIResultSet<FacebookUserListDTO[]>> =>
    httpClient.get<FacebookUserListDTO[]>(`${API_BASE_FACEBOOK_USER_URL}`),

  getById: (id: string): Promise<APIResultSet<FacebookUserDetailDTO>> =>
    httpClient.get<FacebookUserDetailDTO>(`${API_BASE_FACEBOOK_USER_URL}`, { params: { id } }),

  create: (user: FacebookUserDetailDTO): Promise<APIResultSet<FacebookUserDetailDTO>> =>
    httpClient.post<FacebookUserDetailDTO>(`${API_BASE_FACEBOOK_USER_URL}`, user),

  update: (user: FacebookUserDetailDTO): Promise<APIResultSet<FacebookUserDetailDTO>> =>
    httpClient.put<FacebookUserDetailDTO>(`${API_BASE_FACEBOOK_USER_URL}`, user),

  search: (
    criteria: Partial<FacebookUserSearchCriteria>,
    page: number = 0,
    size: number = 10
  ): Promise<APIResultSet<PaginationResponse<FacebookUserDetailDTO>>> =>
    httpClient.get<PaginationResponse<FacebookUserDetailDTO>>(
      `${API_BASE_FACEBOOK_USER_URL}/search`,
      { params: { ...criteria, page, size } }
    ),

  delete: (id: string): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${API_BASE_FACEBOOK_USER_URL}`, { params: { id } }),

  exportExcel: (criteria: Partial<FacebookUserSearchCriteria>) =>
    httpClient.get<Blob>(`${API_BASE_FACEBOOK_USER_URL}/export-excel`, { params: { ...criteria } }),

  deleteAll: (ids: string[]): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${API_BASE_FACEBOOK_USER_URL}/delete-all`, { data: ids }),
};
