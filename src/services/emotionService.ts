import { httpClient } from "@/lib/http/httpClient";
import type { APIResultSet, EmotionDTO } from "@/types";

const BASE_URL = "/emotion";

export const emotionService = {
  getAll: (): Promise<APIResultSet<EmotionDTO[]>> =>
    httpClient.get<EmotionDTO[]>(`${BASE_URL}`),
};
