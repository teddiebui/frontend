import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '@/services/tagService';
import type { TagDTO } from '@/types';

export function useTag() {
  const queryClient = useQueryClient();

  // Query: fetch all tags
  const tagsQuery = useQuery<TagDTO[], Error>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await tagService.getAll();

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch tags');
      }

      return response.data ?? [];
    }
  });

  // Mutation: create tag
  const createTag = useMutation<TagDTO | null, Error, TagDTO>({
    mutationFn: async (tag) => {
      const response = await tagService.create(tag);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create tag');
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: update tag
  const updateTag = useMutation<TagDTO | null, Error, { id: number; tag: TagDTO }>({
    mutationFn: async ({ id, tag }) => {
      const response = await tagService.update(id, tag);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update tag');
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: delete tag
  const deleteTag = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const response = await tagService.delete(id);

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete tag');
      }

      return response.data ?? undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: search tag
  const searchTag = useMutation<TagDTO[] | null, Error, string>({
    mutationFn: async (keyword) => {
      const response = await tagService.search(keyword);

      if (!response.success) {
        throw new Error(response.message || 'Failed to search tags');
      }

      return response.data ?? null;
    }
  });

  return {
    tagsQuery,
    createTag,
    updateTag,
    deleteTag,
    searchTag,
  };
}
