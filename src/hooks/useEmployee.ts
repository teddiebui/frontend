// src/hooks/useEmployee.ts
// Hook quản lý state và side effect cho employee, UI chỉ gọi hook này

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/employeeService";
import type {
  EmployeeDTO,
  StatusLogDTO,
  ChangePasswordDTO,
  ResetPasswordDTO
} from "@/types";

export function useEmployee() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: employees,
    isLoading: isEmployeesLoading,
    error: employeesError,
    refetch: refetchEmployees
  } = useQuery({
    queryKey: ["employees"],
    queryFn: employeeService.getAllUsers
  });

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ["employeeProfile"],
    queryFn: employeeService.getUserProfile
  });

  const {
    data: dashboard,
    isLoading: isDashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard
  } = useQuery({
    queryKey: ["employeeDashboard"],
    queryFn: employeeService.dashboard
  });

  const {
    data: onlineStatus,
    isLoading: isOnlineStatusLoading,
    error: onlineStatusError,
    refetch: refetchOnlineStatus
  } = useQuery({
    queryKey: ["employeeOnlineStatus"],
    queryFn: employeeService.getOnlineStatus
  });


  // Mutations
  const createUser = useMutation({
    mutationFn: (employeeDTO: EmployeeDTO) => employeeService.createUser(employeeDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });

  const updateProfile = useMutation({
    mutationFn: (employeeDTO: EmployeeDTO) => employeeService.updateProfile(employeeDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeProfile"] });
    }
  });

  const updateUser = useMutation({
    mutationFn: (employeeDTO: EmployeeDTO) => employeeService.updateUser(employeeDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeProfile"] });
    }
  });

  const changePassword = useMutation({
    mutationFn: (changePasswordDTO: ChangePasswordDTO) => employeeService.changePassword(changePasswordDTO)
  });

  const updateOnlineStatus = useMutation({
    mutationFn: (logDTO: StatusLogDTO) => employeeService.updateOnlineStatus(logDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeOnlineStatus"] });
    }
  });

  const resetPassword = useMutation({
    mutationFn: (resetPasswordDTO: ResetPasswordDTO) => employeeService.resetPassword(resetPasswordDTO)
  });

  const deleteUser = useMutation({
    mutationFn: (employeeDTO: EmployeeDTO) => employeeService.deleteUser(employeeDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });

  const updateCache = useMutation({
    mutationFn: () => employeeService.updateCache(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeOnlineStatus"] });
    }
  });

  return {
    // Queries
    employees: employees?.data ?? [],
    employeesLoading: isEmployeesLoading,
    employeesError,
    refetchEmployees,
    profile: profile?.data ?? null,
    profileLoading: isProfileLoading,
    profileError,
    refetchProfile,
    dashboard: dashboard?.data ?? [],
    dashboardLoading: isDashboardLoading,
    dashboardError,
    refetchDashboard,
    onlineStatus: onlineStatus?.data ?? null,
    onlineStatusLoading: isOnlineStatusLoading,
    onlineStatusError,
    refetchOnlineStatus,

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
