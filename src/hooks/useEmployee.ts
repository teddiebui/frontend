// src/hooks/useEmployee.ts
// Hook quản lý state và side effect cho employee, UI chỉ gọi hook này

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/employeeService";
import type {
  EmployeeDTO,
  EmployeeDetailDTO,
  EmployeeDashboardDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO,
  APIResultSet
} from "@/types";

export function useEmployee() {
  const queryClient = useQueryClient();

  // Queries
  const getAllUsers = useQuery<EmployeeDTO[], Error>({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await employeeService.getAllUsers();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch employees");
      }

      return response.data ?? [];
    }
  });

  const employeeProfile = useQuery<EmployeeDetailDTO | null, Error>({
    queryKey: ["employeeProfile"],
    queryFn: async () => {
      const response = await employeeService.getUserProfile();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch employee profile");
      }

      return response.data ?? null;
    }
  });

  const employeeDashboard = useQuery<EmployeeDashboardDTO[], Error>({
    queryKey: ["employeeDashboard"],
    queryFn: async () => {
      const response = await employeeService.dashboard();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch employee dashboard");
      }

      return response.data ?? [];
    }
  });

  const employeeOnlineStatus = useQuery<StatusLogDTO | null, Error>({
    queryKey: ["employeeOnlineStatus"],
    queryFn: async () => {
      const response = await employeeService.getOnlineStatus();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch employee online status");
      }

      return response.data ?? null;
    }
  });


  // Mutations
  const createUser = useMutation<EmployeeDTO | null, Error, EmployeeDTO>({
    mutationFn: async (employeeDTO) => {
      const response = await employeeService.createUser(employeeDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to create employee");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });

  const updateProfile = useMutation<EmployeeDetailDTO | null, Error, EmployeeDTO>({
    mutationFn: async (employeeDTO) => {
      const response = await employeeService.updateProfile(employeeDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to update employee profile");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeProfile"] });
    }
  });

  const updateUser = useMutation<EmployeeDetailDTO | null, Error, EmployeeDTO>({
    mutationFn: async (employeeDTO) => {
      const response = await employeeService.updateUser(employeeDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to update employee");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeProfile"] });
    }
  });

  const changePassword = useMutation<void, Error, ChangePasswordDTO>({
    mutationFn: async (changePasswordDTO) => {
      const response = await employeeService.changePassword(changePasswordDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to change password");
      }

      return response.data ?? undefined;
    }
  });

  const updateOnlineStatus = useMutation<APIResultSet<StatusLogDTO>, Error, StatusLogDTO>({
    mutationFn: async (logDTO) => {
      const response = await employeeService.updateOnlineStatus(logDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to update online status");
      }

      return response || undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeOnlineStatus"] });
    }
  });

  const resetPassword = useMutation<void, Error, ResetPasswordDTO>({
    mutationFn: async (resetPasswordDTO) => {
      const response = await employeeService.resetPassword(resetPasswordDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to reset password");
      }

      return response.data ?? undefined;
    }
  });

  const deleteUser = useMutation<void, Error, EmployeeDTO>({
    mutationFn: async (employeeDTO) => {
      const response = await employeeService.deleteUser(employeeDTO);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete employee");
      }

      return response.data ?? undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });

  const updateCache = useMutation<StatusLogDTO | null, Error, void>({
    mutationFn: async () => {
      const response = await employeeService.updateCache();

      if (!response.success) {
        throw new Error(response.message || "Failed to update employee cache");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeOnlineStatus"] });
    }
  });

  return {
    // Queries
    getAllUsers,
    employeeProfile,
    employeeDashboard,
    employeeOnlineStatus,

    // Mutations
    createUser,
    updateProfile,
    updateUser,
    changePassword,
    updateOnlineStatus,
    resetPassword,
    deleteUser,
    updateCache,
  };
}
