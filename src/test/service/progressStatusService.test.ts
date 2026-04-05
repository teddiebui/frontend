// src/test/service/progressStatusService.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { progressStatusService } from "@/services/progressStatusService";
import { httpClient } from "@/lib/http/httpClient";
import type { ProgressStatusDTO, APIResultSet } from "@/types";

vi.mock("@/lib/http/httpClient", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe("progressStatusService", () => {
  const mockData: ProgressStatusDTO[] = [
    { id: 1, name: "In Progress", code: "IN_PROGRESS" },
    { id: 2, name: "Done", code: "DONE" },
  ];
  const successResult: APIResultSet<ProgressStatusDTO[]> = {
    httpCode: 200,
    message: "OK",
    data: mockData,
    success: true,
  };
  const errorResult: APIResultSet<ProgressStatusDTO[]> = {
    httpCode: 500,
    message: "Internal Server Error",
    data: null,
    success: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAll returns data on success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult);
    const res = await progressStatusService.getAll();
    expect(res).toEqual(successResult);
    expect(httpClient.get).toHaveBeenCalledWith("/progress-status");
  });

  it("getAll returns error result on failure", async () => {
    (httpClient.get as any).mockResolvedValue(errorResult);
    const res = await progressStatusService.getAll();
    expect(res).toEqual(errorResult);
    expect(httpClient.get).toHaveBeenCalledWith("/progress-status");
  });

  it("getAll throws on httpClient error", async () => {
    (httpClient.get as any).mockRejectedValue(new Error("Network error"));
    await expect(progressStatusService.getAll()).rejects.toThrow("Network error");
  });
});
