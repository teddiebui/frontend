import { useState, useCallback } from "react";
import { emotionService } from "@/services/emotionService";
import type { EmotionDTO } from "@/types";

export function useEmotion() {
  const [emotions, setEmotions] = useState<EmotionDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await emotionService.getAll();
      if (res.success && res.data) setEmotions(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { emotions, loading, error, fetchAll };
}
