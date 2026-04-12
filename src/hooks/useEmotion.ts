// src/hooks/useEmotion.ts
// Hook quản lý state và side effect cho emotion, UI chỉ gọi hook này

import { useQuery } from "@tanstack/react-query";
import { emotionService } from "@/services/emotionService";
import type { EmotionDTO } from "@/types";
// import type { EmotionDTO } from "@/types";

export function useEmotion() {
  // Queries
  return useQuery<EmotionDTO[], Error>({
    queryKey: ["emotions"],
    queryFn: async () => {
      const response = await emotionService.getAll();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch emotions");
      }
      return response.data || [];
    },
    enabled: false
  });
}
