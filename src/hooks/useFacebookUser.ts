// src/hooks/useFacebookUser.ts
// Hook for managing Facebook user state and side effects


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facebookUserService } from "@/services/facebookUserService";
import type {
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria
} from "@/types";


export function useFacebookUser() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ["facebookUsers"],
    queryFn: facebookUserService.getAll
  });

  const {
    data: userDetail,
    isLoading: isUserDetailLoading,
    error: userDetailError,
    refetch: refetchUserDetail
  } = useQuery({
    queryKey: ["facebookUserDetail"],
    // Provide a default function, must be overridden by passing enabled: false and refetching with id
    queryFn: () => Promise.resolve({ data: null, success: true, message: "", httpCode: 200 }),
    enabled: false
  });

  const {
    data: searchResult,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch
  } = useQuery({
    queryKey: ["facebookUserSearch"],
    // Provide a default function, must be overridden by passing enabled: false and refetching with criteria
    queryFn: () => Promise.resolve({ data: null, success: true, message: "", httpCode: 200 }),
    enabled: false
  });

  // Mutations
  const createUser = useMutation({
    mutationFn: (user: FacebookUserDetailDTO) => facebookUserService.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUsers"] });
    }
  });

  const updateUser = useMutation({
    mutationFn: (user: FacebookUserDetailDTO) => facebookUserService.update(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUsers"] });
    }
  });

  const ping = useMutation({
    mutationFn: () => facebookUserService.ping()
  });

  const searchUsers = useMutation({
    mutationFn: (criteria: FacebookUserSearchCriteria) => facebookUserService.search(criteria),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUserSearch"] });
    }
  });

  const getUserById = useMutation({
    mutationFn: (id: string) => facebookUserService.get(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facebookUserDetail"] });
    }
  });

  return {
    // Queries
    users: users?.data ?? [],
    usersLoading: isUsersLoading,
    usersError,
    refetchUsers,
    userDetail: userDetail?.data ?? null,
    userDetailLoading: isUserDetailLoading,
    userDetailError,
    refetchUserDetail,
    searchResult: searchResult?.data ?? null,
    searchLoading: isSearchLoading,
    searchError,
    refetchSearch,

    // Mutations
    createUser,
    updateUser,
    ping,
    searchUsers,
    getUserById,
  };
}
