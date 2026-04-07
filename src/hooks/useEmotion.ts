// src/hooks/useEmotion.ts
// Hook quản lý state và side effect cho emotion, UI chỉ gọi hook này

import { useQuery } from "@tanstack/react-query";
import { emotionService } from "@/services/emotionService";
// import type { EmotionDTO } from "@/types";

export function useEmotion() {
  // Queries
  const {
    data: emotions,
    isLoading: isEmotionsLoading,
    error: emotionsError,
    refetch: refetchEmotions
  } = useQuery({
    queryKey: ["emotions"],
    queryFn: emotionService.getAll
  });

  return {
    emotions: emotions?.data ?? [],
    emotionsLoading: isEmotionsLoading,
    emotionsError,
    refetchEmotions,
  };
}
