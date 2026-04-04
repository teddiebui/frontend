import { httpClient } from '@/lib/http/httpClient';
import type { APIResultSet, TagDTO } from '@/types';

const API_BASE_TAG_URL = '/tag';

export const tagService = {
  search: (keyword: string): Promise<APIResultSet<TagDTO[]>> =>
    httpClient.get<TagDTO[]>(`${API_BASE_TAG_URL}/search`, undefined, { params: { keyword } }),

  getAll: (): Promise<APIResultSet<TagDTO[]>> =>
    httpClient.get<TagDTO[]>(`${API_BASE_TAG_URL}`),

  create: (tag: TagDTO): Promise<APIResultSet<TagDTO>> =>
    httpClient.post<TagDTO>(`${API_BASE_TAG_URL}`, tag),

  update: (id: number, tag: TagDTO): Promise<APIResultSet<TagDTO>> =>
    httpClient.put<TagDTO>(`${API_BASE_TAG_URL}/${id}`, tag),

  delete: (id: number): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${API_BASE_TAG_URL}/${id}`),
};
