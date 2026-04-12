// src/hooks/useSatisfaction.ts
// Hook for managing satisfaction state and API calls

import { useQuery } from "@tanstack/react-query";
import { satisfactionService } from "@/services/satisfactionService";
import type { SatisfactionDTO } from "@/types";

export function useSatisfaction() {

  return useQuery<SatisfactionDTO[], Error>({
    queryKey: ["satisfactions"],
    queryFn: async () => {
      const response = await satisfactionService.getAll();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch satisfactions");
      }
      return response.data || [];
    },
    enabled: false, 
  });
}
