import { describe, it, expect, vi, beforeEach } from "vitest";
import { employeeService } from "@/services/employeeService";
import { httpClient } from "@/lib/http/httpClient";
import type {
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO,
  APIResultSet,
} from "@/types";

vi.mock("@/lib/http/httpClient");

describe("employeeService", () => {
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
  const detail: EmployeeDetailDTO = { ...employee };
  const dashboard: EmployeeDashboardDTO = {
    username: "johndoe",
    name: "John Doe",
    description: "desc",
    statusLog: { status: { id: 1, name: "Online" }, from: "2024-01-01T00:00:00Z", username: "johndoe" },
    userGroup: employee.userGroup,
    ticketCount: 5,
  };
  const statusLog: StatusLogDTO = { status: { id: 1, name: "Online" }, from: "2024-01-01T00:00:00Z", username: "johndoe" };
  const changePassword: ChangePasswordDTO = { password: "old", newPassword: "new" };
  const resetPassword: ResetPasswordDTO = { username: "johndoe", defaultPassword: "default" };

  const success = <T,>(data: T): APIResultSet<T> => ({ httpCode: 200, message: "OK", data, success: true });
  const error = <T,>(): APIResultSet<T> => ({ httpCode: 500, message: "Error", data: null, success: false });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getUserByUsername success", async () => {
    (httpClient.get as any).mockResolvedValue(success(employee));
    const res = await employeeService.getUserByUsername("johndoe");
    expect(res).toEqual(success(employee));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management", { params: { username: "johndoe" } });
  });

  it("getAllUsers success", async () => {
    (httpClient.get as any).mockResolvedValue(success([employee]));
    const res = await employeeService.getAllUsers();
    expect(res).toEqual(success([employee]));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management/get-all-user");
  });

  it("dashboard success", async () => {
    (httpClient.get as any).mockResolvedValue(success([dashboard]));
    const res = await employeeService.dashboard();
    expect(res).toEqual(success([dashboard]));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management/dashboard");
  });

  it("getUserProfile success", async () => {
    (httpClient.get as any).mockResolvedValue(success(detail));
    const res = await employeeService.getUserProfile();
    expect(res).toEqual(success(detail));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management/me");
  });

  it("getOnlineStatus success", async () => {
    (httpClient.get as any).mockResolvedValue(success(statusLog));
    const res = await employeeService.getOnlineStatus();
    expect(res).toEqual(success(statusLog));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management/me/online-status");
  });

  it("updateCache success", async () => {
    (httpClient.get as any).mockResolvedValue(success(statusLog));
    const res = await employeeService.updateCache();
    expect(res).toEqual(success(statusLog));
    expect(httpClient.get).toHaveBeenCalledWith("/employee-management/me/update-cache");
  });

  it("createUser success", async () => {
    (httpClient.post as any).mockResolvedValue(success(employee));
    const res = await employeeService.createUser(employee);
    expect(res).toEqual(success(employee));
    expect(httpClient.post).toHaveBeenCalledWith("/employee-management", employee);
  });

  it("updateProfile success", async () => {
    (httpClient.put as any).mockResolvedValue(success(detail));
    const res = await employeeService.updateProfile(employee);
    expect(res).toEqual(success(detail));
    expect(httpClient.put).toHaveBeenCalledWith("/employee-management/me", employee);
  });

  it("updateUser success", async () => {
    (httpClient.put as any).mockResolvedValue(success(detail));
    const res = await employeeService.updateUser(employee);
    expect(res).toEqual(success(detail));
    expect(httpClient.put).toHaveBeenCalledWith("/employee-management", employee);
  });

  it("changePassword success", async () => {
    (httpClient.put as any).mockResolvedValue(success(undefined));
    const res = await employeeService.changePassword(changePassword);
    expect(res).toEqual(success(undefined));
    expect(httpClient.put).toHaveBeenCalledWith("/employee-management/me/password", changePassword);
  });

  it("updateOnlineStatus success", async () => {
    (httpClient.put as any).mockResolvedValue(success(undefined));
    const res = await employeeService.updateOnlineStatus(statusLog);
    expect(res).toEqual(success(undefined));
    expect(httpClient.put).toHaveBeenCalledWith("/employee-management/me/online-status", statusLog);
  });

  it("resetPassword success", async () => {
    (httpClient.put as any).mockResolvedValue(success(undefined));
    const res = await employeeService.resetPassword(resetPassword);
    expect(res).toEqual(success(undefined));
    expect(httpClient.put).toHaveBeenCalledWith("/employee-management/reset-password", resetPassword);
  });

  it("deleteUser success", async () => {
    (httpClient.delete as any).mockResolvedValue(success(undefined));
    const res = await employeeService.deleteUser(employee);
    expect(res).toEqual(success(undefined));
    expect(httpClient.delete).toHaveBeenCalledWith("/employee-management", { params: { username: employee.username } });
  });

  // Error paths
  it("getUserByUsername error", async () => {
    (httpClient.get as any).mockResolvedValue(error<EmployeeDTO>());
    const res = await employeeService.getUserByUsername("johndoe");
    expect(res.success).toBe(false);
  });

  it("createUser error", async () => {
    (httpClient.post as any).mockResolvedValue(error<EmployeeDTO>());
    const res = await employeeService.createUser(employee);
    expect(res.success).toBe(false);
  });
});
