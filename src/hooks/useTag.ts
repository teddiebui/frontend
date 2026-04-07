import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '@/services/tagService';
import type { TagDTO, APIResultSet } from '@/types';

export function useTag() {
  const queryClient = useQueryClient();

  // Query: fetch all tags
  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
    refetch: refetchTags
  } = useQuery<APIResultSet<TagDTO[]>, Error>({
    queryKey: ['tags'],
    queryFn: tagService.getAll
  });

  // Mutation: create tag
  const createTag = useMutation({
    mutationFn: (tag: TagDTO) => tagService.create(tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: update tag
  const updateTag = useMutation({
    mutationFn: ({ id, tag }: { id: number; tag: TagDTO }) => tagService.update(id, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: delete tag
  const deleteTag = useMutation({
    mutationFn: (id: number) => tagService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  // Mutation: search tag
  const searchTagResult = useMutation({
    mutationFn: (keyword: string) => tagService.search(keyword)
  });

  return {
    tags: tagsData?.data ?? [],
    tagsLoading,
    tagsError,
    refetchTags,
    createTag,
    updateTag,
    deleteTag,
    searchTag: searchTagResult.mutate,
    searchTagResult,
  };
}
