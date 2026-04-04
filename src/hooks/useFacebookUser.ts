import { useCallback, useState } from 'react';
import { facebookUserService } from '../services/facebookUserService';
import type {
  FacebookUserListDTO,
  FacebookUserDetailDTO,
  FacebookUserSearchCriteria,
  PaginationResponse
} from '../types';

export function useFacebookUser() {
  const [users, setUsers] = useState<FacebookUserListDTO[]>([]);
  const [detail, setDetail] = useState<FacebookUserDetailDTO | null>(null);
  const [pagination, setPagination] = useState<PaginationResponse<FacebookUserDetailDTO> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.getAll();
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        setError(res.message || 'Lỗi lấy danh sách Facebook users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.getById(id);
      if (res.success && res.data) {
        setDetail(res.data);
      } else {
        setError(res.message || 'Lỗi lấy chi tiết Facebook user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (
    criteria: Partial<FacebookUserSearchCriteria>,
    page = 0,
    size = 10
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.search(criteria, page, size);
      if (res.success && res.data) {
        setPagination(res.data);
      } else {
        setError(res.message || 'Lỗi tìm kiếm Facebook users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (user: FacebookUserDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.create(user);
      if (res.success && res.data) {
        setDetail(res.data);
      } else {
        setError(res.message || 'Lỗi tạo Facebook user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (user: FacebookUserDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.update(user);
      if (res.success && res.data) {
        setDetail(res.data);
      } else {
        setError(res.message || 'Lỗi cập nhật Facebook user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.delete(id);
      if (!res.success) {
        setError(res.message || 'Lỗi xóa Facebook user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAll = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await facebookUserService.deleteAll(ids);
      if (!res.success) {
        setError(res.message || 'Lỗi xóa nhiều Facebook users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    detail,
    pagination,
    loading,
    error,
    fetchAll,
    fetchById,
    search,
    create,
    update,
    remove,
    removeAll,
  };
}
