// src/hooks/useProgressStatus.ts
// Hook for ProgressStatus API state and effects

import { useQuery } from "@tanstack/react-query";
import { progressStatusService } from "@/services/progressStatusService";
import type { ProgressStatusDTO } from "@/types";

export function useProgressStatus() {
  return useQuery<ProgressStatusDTO[], Error>({
    queryKey: ["progressStatuses"],
    queryFn: async () => {
      const response = await progressStatusService.getAll();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch progress statuses");
      }
      return response.data || [];
    },
    enabled: false
  });
}
