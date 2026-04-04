import { useCallback, useState } from 'react';
import { tagService } from '@/services/tagService';
import type { TagDTO } from '@/types';

export function useTag() {
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [searchResult, setSearchResult] = useState<TagDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await tagService.getAll();
      if (res.success && res.data) {
        setTags(res.data);
      } else {
        setError(res.message || 'Lỗi lấy danh sách tag');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tagService.search(keyword);
      if (res.success && res.data) {
        setSearchResult(res.data);
      } else {
        setError(res.message || 'Lỗi tìm kiếm tag');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (tag: TagDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tagService.create(tag);
      if (res.success && res.data) {
        setTags((prev) => [...prev, res.data!]);
      } else {
        setError(res.message || 'Lỗi tạo tag');
      }
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, tag: TagDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tagService.update(id, tag);
      if (res.success && res.data) {
        setTags((prev) => {
          // Only update if tag exists
          const exists = prev.some((t) => t.id === id);
          if (!exists) return prev;
          return prev.map((t) => (t.id === id ? res.data! : t));
        });
      } else {
        setError(res.message || 'Lỗi cập nhật tag');
        // Do not modify tags on fail
      }
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      // Do not modify tags on error
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tagService.delete(id);
      if (res.success) {
        setTags((prev) => prev.filter((t) => t.id !== id));
      } else {
        setError(res.message || 'Lỗi xóa tag');
        // Do not modify tags on fail
      }
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      // Do not modify tags on error
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tags,
    searchResult,
    loading,
    error,
    fetchAll,
    search,
    create,
    update,
    remove,
  };
}
