import { describe, it, expect, vi, beforeEach } from "vitest";
import { categoryService } from "@/services/categoryService";
import { httpClient } from "@/lib/http/httpClient";
import type { CategoryDTO, APIResultSet } from "@/types";

vi.mock("@/lib/http/httpClient");

const mockCategory: CategoryDTO = { id: 1, code: "cat1", name: "Category 1" };
const mockResultSet = <T,>(data: T, success = true): APIResultSet<T> => ({
  httpCode: 200,
  message: "",
  data,
  success,
});

describe("categoryService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAll - success", async () => {
    (httpClient.get as any).mockResolvedValueOnce(mockResultSet([mockCategory]));
    const res = await categoryService.getAll();
    expect(res.success).toBe(true);
    expect(res.data).toEqual([mockCategory]);
  });

  it("getAll - error", async () => {
    (httpClient.get as any).mockRejectedValueOnce(new Error("fail"));
    await expect(categoryService.getAll()).rejects.toThrow("fail");
  });

  it("create - success", async () => {
    (httpClient.post as any).mockResolvedValueOnce(mockResultSet(mockCategory));
    const res = await categoryService.create(mockCategory);
    expect(res.success).toBe(true);
    expect(res.data).toEqual(mockCategory);
  });

  it("create - error", async () => {
    (httpClient.post as any).mockRejectedValueOnce(new Error("fail"));
    await expect(categoryService.create(mockCategory)).rejects.toThrow("fail");
  });

  it("update - success", async () => {
    (httpClient.put as any).mockResolvedValueOnce(mockResultSet(mockCategory));
    const res = await categoryService.update(1, mockCategory);
    expect(res.success).toBe(true);
    expect(res.data).toEqual(mockCategory);
  });

  it("update - error", async () => {
    (httpClient.put as any).mockRejectedValueOnce(new Error("fail"));
    await expect(categoryService.update(1, mockCategory)).rejects.toThrow("fail");
  });

  it("delete - success", async () => {
    (httpClient.delete as any).mockResolvedValueOnce(mockResultSet(null));
    const res = await categoryService.delete(1);
    expect(res.success).toBe(true);
    expect(res.data).toBeNull();
  });

  it("delete - error", async () => {
    (httpClient.delete as any).mockRejectedValueOnce(new Error("fail"));
    await expect(categoryService.delete(1)).rejects.toThrow("fail");
  });
});
