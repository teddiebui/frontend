// src/hooks/useCategory.ts
// Hook quản lý state và side effect cho category, UI chỉ gọi hook này

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import type { CategoryDTO } from "@/types";

export function useCategory() {
  const queryClient = useQueryClient();

  // load Categories for select, dropdown, etc. (non-paginated)
  const loadCategoriesQuery = useQuery<CategoryDTO[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getAll();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data ?? [];
    },
    enabled: false
  });

  // Queries
  const categoriesQuery = useQuery<CategoryDTO[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getAll();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data ?? [];
    }
  });

  // Mutations
  const createCategory = useMutation<CategoryDTO | null, Error, CategoryDTO>({
    mutationFn: async (category) => {
      const response = await categoryService.create(category);

      if (!response.success) {
        throw new Error(response.message || "Failed to create category");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const updateCategory = useMutation<CategoryDTO | null, Error, { id: number; category: CategoryDTO }>({
    mutationFn: async ({ id, category }) => {
      const response = await categoryService.update(id, category);

      if (!response.success) {
        throw new Error(response.message || "Failed to update category");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const deleteCategory = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const response = await categoryService.delete(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete category");
      }

      return response.data ?? undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  return {
    loadCategoriesQuery,
    categoriesQuery,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
