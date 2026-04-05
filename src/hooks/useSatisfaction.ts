// src/hooks/useSatisfaction.ts
// Hook for managing satisfaction state and API calls

import { useState, useCallback } from "react";
import { satisfactionService } from "@/services/satisfactionService";
import type { SatisfactionDTO } from "@/types";

export function useSatisfaction() {
  const [satisfactions, setSatisfactions] = useState<SatisfactionDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await satisfactionService.getAll();
      const { data, success, message } = res;
      if (success && data) setSatisfactions(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    satisfactions,
    loading,
    error,
    fetchAll,
  };
}
