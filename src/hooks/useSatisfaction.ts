// src/hooks/useSatisfaction.ts
// Hook for managing satisfaction state and API calls

import { useQuery } from "@tanstack/react-query";
import { satisfactionService } from "@/services/satisfactionService";
import type { SatisfactionDTO, APIResultSet } from "@/types";

export function useSatisfaction() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery<APIResultSet<SatisfactionDTO[]>, Error>({
    queryKey: ["satisfactions"],
    queryFn: satisfactionService.getAll
  });

  return {
    satisfactions: data?.data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
}
