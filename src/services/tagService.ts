import { httpClient } from '@/lib/http/httpClient';
import type { APIResultSet, TagDTO } from '@/types';

const BASE_URL = '/api/tag';

export const tagService = {
  /** Search tags by keyword */
  search(keyword: string): Promise<APIResultSet<TagDTO[]>> {
    return httpClient.get<TagDTO[]>(`${BASE_URL}/search`, { params: { keyword } });
  },

  /** Get all tags */
  getAll(): Promise<APIResultSet<TagDTO[]>> {
    return httpClient.get<TagDTO[]>(`${BASE_URL}`);
  },

  /** Create a new tag */
  create(tag: TagDTO): Promise<APIResultSet<TagDTO>> {
    return httpClient.post<TagDTO>(`${BASE_URL}`, tag);
  },

  /** Update a tag by id */
  update(id: number, tag: TagDTO): Promise<APIResultSet<TagDTO>> {
    return httpClient.put<TagDTO>(`${BASE_URL}/${id}`, tag);
  },

  /** Delete a tag by id */
  delete(id: number): Promise<APIResultSet<void>> {
    return httpClient.delete<void>(`${BASE_URL}/${id}`);
  },
};
