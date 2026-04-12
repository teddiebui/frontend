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
  APIResultSet,
} from "@/types";

const BASE_EMPLOYEE_URL = "/employee-management";

export const employeeService = {
  /** Lấy user theo username (hoặc tất cả nếu không truyền) */
  getUserByUsername: (username?: string) =>
    httpClient.get<EmployeeDTO>(`${BASE_EMPLOYEE_URL}`, { params: username ? { username } : undefined }),

  /** Lấy tất cả user */
  getAllUsers: () =>
    httpClient.get<EmployeeDTO[]>(`${BASE_EMPLOYEE_URL}/get-all-user`),

  /** Lấy dashboard nhân viên */
  dashboard: () =>
    httpClient.get<EmployeeDashboardDTO[]>(`${BASE_EMPLOYEE_URL}/dashboard`),

  /** Lấy profile user hiện tại */
  getUserProfile: () =>
    httpClient.get<EmployeeDetailDTO>(`${BASE_EMPLOYEE_URL}/me`),

  /** Lấy online status user hiện tại */
  getOnlineStatus: () =>
    httpClient.get<StatusLogDTO>(`${BASE_EMPLOYEE_URL}/me/online-status`),

  /** Update cache và trả về online status */
  updateCache: () =>
    httpClient.get<StatusLogDTO>(`${BASE_EMPLOYEE_URL}/me/update-cache`),

  /** Tạo user mới */
  createUser: (employeeDTO: EmployeeDTO) =>
    httpClient.post<EmployeeDTO>(`${BASE_EMPLOYEE_URL}`, employeeDTO),

  /** Cập nhật profile user hiện tại */
  updateProfile: (employeeDTO: EmployeeDTO) =>
    httpClient.put<EmployeeDetailDTO>(`${BASE_EMPLOYEE_URL}/me`, employeeDTO),

  /** Cập nhật user (SUPERVISOR) */
  updateUser: (employeeDTO: EmployeeDTO) =>
    httpClient.put<EmployeeDetailDTO>(`${BASE_EMPLOYEE_URL}`, employeeDTO),

  /** Đổi mật khẩu user hiện tại */
  changePassword: (changePasswordDTO: ChangePasswordDTO) =>
    httpClient.put<void>(`${BASE_EMPLOYEE_URL}/me/password`, changePasswordDTO),

  /** Cập nhật online status user hiện tại */
  updateOnlineStatus: (logDTO: StatusLogDTO) =>
    httpClient.put<StatusLogDTO>(`${BASE_EMPLOYEE_URL}/me/online-status`, logDTO),

  /** Reset mật khẩu user (SUPERVISOR) */
  resetPassword: (resetPasswordDTO: ResetPasswordDTO) =>
    httpClient.put<void>(`${BASE_EMPLOYEE_URL}/reset-password`, resetPasswordDTO),

  /** Xóa user (SUPERVISOR) */
  deleteUser: (employeeDTO: EmployeeDTO) =>
    httpClient.delete<void>(
      `${BASE_EMPLOYEE_URL}`,
      { params: { username: employeeDTO.username } }
    ),
};
