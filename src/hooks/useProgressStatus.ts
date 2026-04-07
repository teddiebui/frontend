// src/hooks/useProgressStatus.ts
// Hook for ProgressStatus API state and effects

import { useQuery } from "@tanstack/react-query";
import { progressStatusService } from "@/services/progressStatusService";
import type { ProgressStatusDTO, APIResultSet } from "@/types";

export function useProgressStatus() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery<APIResultSet<ProgressStatusDTO[]>, Error>({
    queryKey: ["progressStatuses"],
    queryFn: progressStatusService.getAll
  });

  return {
    progressStatuses: data?.data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
}
