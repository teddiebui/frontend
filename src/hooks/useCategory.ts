// src/hooks/useCategory.ts
// Hook for managing category state and API calls

import { useState, useCallback } from "react";
import { categoryService } from "@/services/categoryService";
import type { CategoryDTO } from "@/types";

export function useCategory() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getAll();
      const { data, success, message } = res;
      if (data && success) setCategories(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create category
  const createCategory = useCallback(async (category: CategoryDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.create(category);
      if (res.success && res.data) setCategories((prev) => [...prev, res.data!]);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update category
  const updateCategory = useCallback(async (id: number, category: CategoryDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.update(id, category);
      if (res.success && res.data) setCategories((prev) => prev.map((c) => c.id === id ? res.data! : c));
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete category
  const deleteCategory = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.delete(id);
      if (res.success) setCategories((prev) => prev.filter((c) => c.id !== id));
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    fetchAll,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
