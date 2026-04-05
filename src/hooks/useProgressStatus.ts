// src/hooks/useProgressStatus.ts
// Hook for ProgressStatus API state and effects

import { useState, useCallback } from "react";
import { progressStatusService } from "@/services/progressStatusService";
import type { ProgressStatusDTO } from "@/types";

export function useProgressStatus() {
  const [progressStatuses, setProgressStatuses] = useState<ProgressStatusDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await progressStatusService.getAll();
      const { data, success, message } = res;
      if (data && success) setProgressStatuses(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    progressStatuses,
    loading,
    error,
    fetchAll,
  };
}
