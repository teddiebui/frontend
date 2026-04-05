// src/services/facebookUserService.ts
// Contains all API calls for FacebookUserController, 1:1 mapping with backend endpoints

import { httpClient } from "@/lib/http/httpClient";
import type {
  FacebookUserListDTO,
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria,
  PaginationResponse
} from "@/types";

const BASE_FACEBOOK_USER_URL = import.meta.env.VITE_BASE_FACEBOOK_USER_PATH || "/facebookuser";

export const facebookUserService = {
  /** Health check */
  ping: () =>
    httpClient.get<string>(`${BASE_FACEBOOK_USER_URL}/ping`),

  /** Get all users */
  getAll: () =>
    httpClient.get<FacebookUserListDTO[]>(`${BASE_FACEBOOK_USER_URL}`),

  /** Get user by id */
  get: (id: string) =>
    httpClient.get<FacebookUserDetailDTO>(`${BASE_FACEBOOK_USER_URL}`, { params: { id } }),

  /** Create user */
  create: (user: FacebookUserDetailDTO) =>
    httpClient.post<FacebookUserDetailDTO>(`${BASE_FACEBOOK_USER_URL}`, user),

  /** Update user */
  update: (user: FacebookUserDetailDTO) =>
    httpClient.put<FacebookUserDetailDTO>(`${BASE_FACEBOOK_USER_URL}`, user),

  /** Search users with pagination */
  search: (criteria: Partial<FacebookUserSearchCriteria>, page = 0, size = 10, sort = "createdAt,desc") =>
    httpClient.get<PaginationResponse<FacebookUserDetailDTO>>(
      `${BASE_FACEBOOK_USER_URL}/search`,
      { params: { ...criteria, page, size, sort } }
    ),

  /** Delete user by id */
  delete: (id: string) =>
    httpClient.delete<void>(`${BASE_FACEBOOK_USER_URL}`, { params: { id } }),

  /** Export search results to Excel */
  exportExcel: (criteria: Partial<FacebookUserSearchCriteria>) =>
    httpClient.get<Blob>(
      `${BASE_FACEBOOK_USER_URL}/export-excel`,
      { params: { ...criteria }, responseType: 'blob' }
    ),

  /** Delete multiple users by ids */
  deleteAll: (ids: string[]) =>
    httpClient.delete<void>(`${BASE_FACEBOOK_USER_URL}/delete-all`, { data: ids }),
};
