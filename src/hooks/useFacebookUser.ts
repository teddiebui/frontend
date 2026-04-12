// src/hooks/useFacebookUser.ts
// Hook for managing Facebook user state and side effects


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facebookUserService } from "@/services/facebookUserService";
import type {
  EmployeeDashboardDTO,
  FacebookUserDetailDTO,
  FacebookUserListDTO,
  FacebookUserSearchCriteria,
  PaginationResponse,
} from "@/types";
import { employeeService } from "@/services/employeeService";


export function useFacebookUser() {
  const queryClient = useQueryClient();

  // load assignees for select component
  const loadAssigneesQuery = useQuery<EmployeeDashboardDTO[], Error>({
    queryKey: ["assignees"],
    queryFn: async () => {
      const response = await employeeService.dashboard();

      if (!response.success) {
        throw new Error(response.message || "Failed to load assignees");
      }

      return response.data ?? [];
    },
    enabled: false
  });

  // Queries
  const usersQuery = useQuery<FacebookUserListDTO[], Error>({
    queryKey: ["facebookUsers"],
    queryFn: async () => {
      const response = await facebookUserService.getAll();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch Facebook users");
      }

      return response.data ?? [];
    }
  });

  const userDetailQuery = useQuery<FacebookUserDetailDTO | null, Error>({
    queryKey: ["facebookUserDetail"],
    queryFn: async () => null,
    enabled: false
  });

  const searchResultQuery = useQuery<PaginationResponse<FacebookUserDetailDTO> | null, Error>({
    queryKey: ["facebookUserSearch"],
    queryFn: async () => null,
    enabled: false
  });

  // Mutations
  const createUser = useMutation<FacebookUserDetailDTO | null, Error, FacebookUserDetailDTO>({
    mutationFn: async (user) => {
      const response = await facebookUserService.create(user);

      if (!response.success) {
        throw new Error(response.message || "Failed to create Facebook user");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUsers"] });
    }
  });

  const updateUser = useMutation<FacebookUserDetailDTO | null, Error, FacebookUserDetailDTO>({
    mutationFn: async (user) => {
      const response = await facebookUserService.update(user);

      if (!response.success) {
        throw new Error(response.message || "Failed to update Facebook user");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUsers"] });
    }
  });

  const ping = useMutation<string | null, Error, void>({
    mutationFn: async () => {
      const response = await facebookUserService.ping();

      if (!response.success) {
        throw new Error(response.message || "Failed to ping Facebook user service");
      }

      return response.data ?? null;
    }
  });

  const searchUsers = useMutation<
    PaginationResponse<FacebookUserDetailDTO> | null,
    Error,
    FacebookUserSearchCriteria
  >({
    mutationFn: async (criteria) => {
      const response = await facebookUserService.search(criteria);

      if (!response.success) {
        throw new Error(response.message || "Failed to search Facebook users");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUserSearch"] });
    }
  });

  const getUserById = useMutation<FacebookUserDetailDTO | null, Error, string>({
    mutationFn: async (id) => {
      const response = await facebookUserService.get(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch Facebook user detail");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUserDetail"] });
    }
  });

  return {
    loadAssigneesQuery,
    usersQuery,
    userDetailQuery,
    searchResultQuery,
    createUser,
    updateUser,
    ping,
    searchUsers,
    getUserById,
  };
}
