// src/services/progressStatusService.ts
// API service for ProgressStatusController

import { httpClient } from "@/lib/http/httpClient";
import type { ProgressStatusDTO, APIResultSet } from "@/types";

const BASE_URL = "/progress-status";

export const progressStatusService = {
  /**
   * Get all progress statuses
   * GET /api/progress-status
   * Response: APIResultSet<ProgressStatusDTO[]>
   */
  getAll: (): Promise<APIResultSet<ProgressStatusDTO[]>> =>
    httpClient.get<ProgressStatusDTO[]>(`${BASE_URL}`),
};
