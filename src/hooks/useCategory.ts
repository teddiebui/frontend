// src/hooks/useCategory.ts
// Hook quản lý state và side effect cho category, UI chỉ gọi hook này

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import type { CategoryDTO } from "@/types";

export function useCategory() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll
  });

  // Mutations
  const createCategory = useMutation({
    mutationFn: (category: CategoryDTO) => categoryService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, category }: { id: number; category: CategoryDTO }) => categoryService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  return {
    categories: categories?.data ?? [],
    categoriesLoading: isCategoriesLoading,
    categoriesError,
    refetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
