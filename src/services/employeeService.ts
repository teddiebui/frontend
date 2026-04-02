// src/services/employeeService.ts
// Chứa toàn bộ API call của employee, map 1:1 với endpoint trong Controller

import { httpClient } from "@/lib/http/httpClient";
import type {
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO,
  APIResultSet
} from "@/types";

export const employeeService = {
  /** Lấy user theo username (hoặc tất cả nếu không truyền) */
  getUserByUsername: (username?: string) =>
    httpClient.get<EmployeeDTO>("/api/employee-management", { params: username ? { username } : undefined }),

  /** Lấy tất cả user */
  getAllUsers: () =>
    httpClient.get<EmployeeDTO[]>("/api/employee-management/get-all-user"),

  /** Lấy dashboard nhân viên */
  dashboard: () =>
    httpClient.get<EmployeeDashboardDTO[]>("/api/employee-management/dashboard"),

  /** Lấy profile user hiện tại */
  getUserProfile: () =>
    httpClient.get<EmployeeDetailDTO>("/api/employee-management/me"),

  /** Lấy online status user hiện tại */
  getOnlineStatus: () =>
    httpClient.get<StatusLogDTO>("/api/employee-management/me/online-status"),

  /** Update cache và trả về online status */
  updateCache: () =>
    httpClient.get<StatusLogDTO>("/api/employee-management/me/update-cache"),

  /** Tạo user mới */
  createUser: (employeeDTO: EmployeeDTO) =>
    httpClient.post<EmployeeDTO>("/api/employee-management", employeeDTO),

  /** Cập nhật profile user hiện tại */
  updateProfile: (employeeDTO: EmployeeDTO) =>
    httpClient.put<EmployeeDetailDTO>("/api/employee-management/me", employeeDTO),

  /** Cập nhật user (SUPERVISOR) */
  updateUser: (employeeDTO: EmployeeDTO) =>
    httpClient.put<EmployeeDetailDTO>("/api/employee-management", employeeDTO),

  /** Đổi mật khẩu user hiện tại */
  changePassword: (changePasswordDTO: ChangePasswordDTO) =>
    httpClient.put<void>("/api/employee-management/me/password", changePasswordDTO),

  /** Cập nhật online status user hiện tại */
  updateOnlineStatus: (logDTO: StatusLogDTO) =>
    httpClient.put<void>("/api/employee-management/me/online-status", logDTO),

  /** Reset mật khẩu user (SUPERVISOR) */
  resetPassword: (resetPasswordDTO: ResetPasswordDTO) =>
    httpClient.put<void>("/api/employee-management/reset-password", resetPasswordDTO),

  /** Xóa user (SUPERVISOR) */
  deleteUser: (employeeDTO: EmployeeDTO) =>
    httpClient.delete<void>(
      "/api/employee-management",
      { params: { username: employeeDTO.username } }
    ),
};
