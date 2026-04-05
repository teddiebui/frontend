// src/services/satisfactionService.ts
// API calls for Satisfaction endpoints, mapped 1:1 with SatisfactionController

import { httpClient } from "@/lib/http/httpClient";
import type { APIResultSet, SatisfactionDTO } from "@/types";

const BASE_URL = "/satisfaction";

export const satisfactionService = {
  /**
   * Get all satisfaction entries
   * GET /api/satisfaction
   * Response: APIResultSet<SatisfactionDTO[]>
   */
  getAll: (): Promise<APIResultSet<SatisfactionDTO[]>> =>
    httpClient.get<SatisfactionDTO[]>(`${BASE_URL}`),
};
