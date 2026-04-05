// src/test/service/satisfactionService.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { satisfactionService } from "@/services/satisfactionService";
import { httpClient } from "@/lib/http/httpClient";
import type { APIResultSet, SatisfactionDTO } from "@/types";

vi.mock("@/lib/http/httpClient", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe("satisfactionService", () => {
  const mockData: SatisfactionDTO[] = [
    { id: 1, code: "SAT1", name: "Satisfied" },
    { id: 2, code: "SAT2", name: "Neutral" },
  ];
  const successResult: APIResultSet<SatisfactionDTO[]> = {
    httpCode: 200,
    message: "OK",
    data: mockData,
    success: true,
  };
  const errorResult: APIResultSet<SatisfactionDTO[]> = {
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
    const res = await satisfactionService.getAll();
    expect(res).toEqual(successResult);
    expect(httpClient.get).toHaveBeenCalledWith("/satisfaction");
  });

  it("getAll returns error result on failure", async () => {
    (httpClient.get as any).mockResolvedValue(errorResult);
    const res = await satisfactionService.getAll();
    expect(res).toEqual(errorResult);
    expect(httpClient.get).toHaveBeenCalledWith("/satisfaction");
  });

  it("getAll throws on httpClient error", async () => {
    (httpClient.get as any).mockRejectedValue(new Error("Network error"));
    await expect(satisfactionService.getAll()).rejects.toThrow("Network error");
  });
});
