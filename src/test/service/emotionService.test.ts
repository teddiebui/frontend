import { describe, it, expect, vi, beforeEach } from "vitest";
import { emotionService } from "@/services/emotionService";
import { httpClient } from "@/lib/http/httpClient";
import type { APIResultSet, EmotionDTO } from "@/types";

vi.mock("@/lib/http/httpClient");

describe("emotionService", () => {
  const mockEmotions: EmotionDTO[] = [
    { id: 1, code: "happy", name: "Happy" },
    { id: 2, code: "sad", name: "Sad" },
  ];
  const successResult: APIResultSet<EmotionDTO[]> = {
    httpCode: 200,
    message: "OK",
    data: mockEmotions,
    success: true,
  };
  const errorResult: APIResultSet<EmotionDTO[]> = {
    httpCode: 500,
    message: "Error",
    data: null,
    success: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getAll returns emotions on success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult);
    const res = await emotionService.getAll();
    expect(res).toEqual(successResult);
    expect(httpClient.get).toHaveBeenCalledWith("/emotion");
  });

  it("getAll returns error on failure", async () => {
    (httpClient.get as any).mockResolvedValue(errorResult);
    const res = await emotionService.getAll();
    expect(res).toEqual(errorResult);
    expect(httpClient.get).toHaveBeenCalledWith("/emotion");
  });
});
