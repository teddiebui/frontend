// src/hooks/useEmployee.ts
// Hook quản lý state và side effect cho employee, UI chỉ gọi hook này

import { useState, useCallback } from "react";
import { employeeService } from "@/services/employeeService";
import type {
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO
} from "@/types";

export function useEmployee() {
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const [profile, setProfile] = useState<EmployeeDetailDTO | null>(null);
  const [dashboard, setDashboard] = useState<EmployeeDashboardDTO[]>([]);
  const [onlineStatus, setOnlineStatus] = useState<StatusLogDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy tất cả user
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.getAllUsers();
        const { data, success, message } = res;
        if (data && success) setEmployees(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Lấy profile user hiện tại
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.getUserProfile();
        const { data, success, message } = res;
        if (data && success) setProfile(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Lấy dashboard
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.dashboard();
        const { data, success, message } = res;
        if (data && success) setDashboard(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Lấy online status
  const fetchOnlineStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.getOnlineStatus();
        const { data, success, message } = res;
        if (data && success) setOnlineStatus(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Update cache
  const updateCache = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.updateCache();
        const { data, success, message } = res;
        if (data && success) setOnlineStatus(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Tạo user mới
  const createUser = useCallback(async (employeeDTO: EmployeeDTO) => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.createUser(employeeDTO);
        const { data, success, message } = res;
        if (data && success) setEmployees((prev) => [...prev, data]);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Cập nhật profile user hiện tại
  const updateProfile = useCallback(async (employeeDTO: EmployeeDTO) => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.updateProfile(employeeDTO);
        const { data, success, message } = res;
        if (data && success) setProfile(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Cập nhật user (SUPERVISOR)
  const updateUser = useCallback(async (employeeDTO: EmployeeDTO) => {
    setLoading(true);
    setError(null);
      try {
        const res = await employeeService.updateUser(employeeDTO);
        const { data, success, message } = res;
        if (data && success) setProfile(data);
        else setError(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
  }, []);

  // Đổi mật khẩu user hiện tại
  const changePassword = useCallback(async (changePasswordDTO: ChangePasswordDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.changePassword(changePasswordDTO);
      if (!res.success) setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật online status user hiện tại
  const updateOnlineStatus = useCallback(async (logDTO: StatusLogDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.updateOnlineStatus(logDTO);
      if (!res.success) setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset mật khẩu user (SUPERVISOR)
  const resetPassword = useCallback(async (resetPasswordDTO: ResetPasswordDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.resetPassword(resetPasswordDTO);
      if (!res.success) setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa user (SUPERVISOR)
  const deleteUser = useCallback(async (employeeDTO: EmployeeDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.deleteUser(employeeDTO);
      if (res.success) setEmployees((prev) => prev.filter(e => e.username !== employeeDTO.username));
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    employees,
    profile,
    dashboard,
    onlineStatus,
    loading,
    error,
    fetchAll,
    fetchProfile,
    fetchDashboard,
    fetchOnlineStatus,
    updateCache,
    createUser,
    updateProfile,
    updateUser,
    changePassword,
    updateOnlineStatus,
    resetPassword,
    deleteUser,
  };
}
