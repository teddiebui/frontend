import { describe, it, expect, vi, beforeEach } from "vitest";
import authService from "@/services/authService";
import { httpClient } from "@/lib/http/httpClient";
import type { APIResultSet, EmployeeDTO, LoginRequestDTO, LoginResponseDTO } from "@/types";

vi.mock("@/lib/http/httpClient");

describe("authService", () => {
  const employee: EmployeeDTO = {
    userGroup: { groupId: 1, name: "Group", code: "G1", permissions: [], description: "desc" },
    name: "John Doe",
    username: "johndoe",
    password: "pass",
    description: "desc",
    email: "john@example.com",
    phone: "123456789",
    createdAt: "2024-01-01T00:00:00Z",
    isActive: true,
    failedLoginCount: 0,
    statusLogs: [],
  };
  const loginRequest: LoginRequestDTO = { username: "johndoe", password: "pass" };
  const loginResponse: LoginResponseDTO = { employeeDTO: employee, validationResult: { fieldErrors: {} } };

  const success = <T,>(data: T): APIResultSet<T> => ({ httpCode: 200, message: "OK", data, success: true });
  const error = <T,>(): APIResultSet<T> => ({ httpCode: 500, message: "Error", data: null, success: false });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("login success", async () => {
    (httpClient.post as any).mockResolvedValue(success(loginResponse));
    const res = await authService.login(loginRequest);
    expect(res).toEqual(success(loginResponse));
    expect(httpClient.post).toHaveBeenCalledWith("/auth/login", loginRequest);
  });

  it("login error", async () => {
    (httpClient.post as any).mockResolvedValue(error<LoginResponseDTO>());
    const res = await authService.login(loginRequest);
    expect(res.success).toBe(false);
  });

  it("logout success", async () => {
    (httpClient.get as any).mockResolvedValue(success(undefined));
    const res = await authService.logout();
    expect(res).toEqual(success(undefined));
    expect(httpClient.get).toHaveBeenCalledWith("/auth/logout");
  });

  it("logout error", async () => {
    (httpClient.get as any).mockResolvedValue(error<void>());
    const res = await authService.logout();
    expect(res.success).toBe(false);
  });

  it("me success", async () => {
    (httpClient.get as any).mockResolvedValue(success(employee));
    const res = await authService.me();
    expect(res).toEqual(success(employee));
    expect(httpClient.get).toHaveBeenCalledWith("/auth/me");
  });

  it("me error", async () => {
    (httpClient.get as any).mockResolvedValue(error<EmployeeDTO>());
    const res = await authService.me();
    expect(res.success).toBe(false);
  });
});
