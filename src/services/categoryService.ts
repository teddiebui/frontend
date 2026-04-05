// src/services/categoryService.ts
// API service for category endpoints, 1:1 mapping with CategoryController

import { httpClient } from "@/lib/http/httpClient";
import type { CategoryDTO, APIResultSet } from "@/types";

const BASE_CATEGORY_URL = "/category";

export const categoryService = {
  /** Get all categories */
  getAll: (): Promise<APIResultSet<CategoryDTO[]>> =>
    httpClient.get<CategoryDTO[]>(`${BASE_CATEGORY_URL}`),

  /** Create a new category */
  create: (category: CategoryDTO): Promise<APIResultSet<CategoryDTO>> =>
    httpClient.post<CategoryDTO>(`${BASE_CATEGORY_URL}`, category),

  /** Update a category by id */
  update: (id: number, category: CategoryDTO): Promise<APIResultSet<CategoryDTO>> =>
    httpClient.put<CategoryDTO>(`${BASE_CATEGORY_URL}/${id}`, category),

  /** Delete a category by id */
  delete: (id: number): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${BASE_CATEGORY_URL}/${id}`),
};
