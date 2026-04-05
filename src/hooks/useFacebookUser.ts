// src/hooks/useFacebookUser.ts
// Hook for managing Facebook user state and side effects

import { useState, useCallback } from "react";
import { facebookUserService } from "@/services/facebookUserService";
import type {
  FacebookUserListDTO,
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria,
  PaginationResponse
} from "@/types";

export function useFacebookUser() {
  const [users, setUsers] = useState<FacebookUserListDTO[]>([]);
  const [userDetail, setUserDetail] = useState<FacebookUserDetailDTO | null>(null);
  const [searchResult, setSearchResult] = useState<PaginationResponse<FacebookUserDetailDTO> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Health check
  const ping = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await facebookUserService.ping();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all users
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.getAll();
      if (res.data) setUsers(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user by id
  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.get(id);
      if (res.data) setUserDetail(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create user
  const create = useCallback(async (user: FacebookUserDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.create(user);
      if (res.data) setUserDetail(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user
  const update = useCallback(async (user: FacebookUserDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.update(user);
      if (res.data) setUserDetail(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Search users
  const search = useCallback(async (criteria: Partial<FacebookUserSearchCriteria>, page = 0, size = 10, sort = "createdAt,desc") => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.search(criteria, page, size, sort);
      if (res.data) setSearchResult(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete user by id
  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await facebookUserService.delete(id);
      setUserDetail(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Export to Excel
  const exportExcel = useCallback(async (criteria: Partial<FacebookUserSearchCriteria>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.exportExcel(criteria);
      // handle blob download in UI
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete multiple users
  const removeAll = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await facebookUserService.deleteAll(ids);
      setUserDetail(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    userDetail,
    searchResult,
    loading,
    error,
    ping,
    fetchAll,
    fetchById,
    create,
    update,
    search,
    remove,
    exportExcel,
    removeAll,
  };
}
