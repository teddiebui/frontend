

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { performanceService } from "@/services/performanceService";
import type {
  CriteriaDTO,
  TicketAssessmentDetailDTO,
  CriteriaDetailDTO,
  PerformanceSummaryDTO,
} from "@/types";

export function usePerformance() {
  const queryClient = useQueryClient();

  // Queries
  const performanceSummaryQuery = useQuery<PerformanceSummaryDTO | null, Error>({
    queryKey: ["performanceSummary"],
    // params: username, month, timezone
    queryFn: async ({ queryKey }) => {
      const [, username, month, timezone] = queryKey as [string, string, number, string];

      const response = await performanceService.getReportByMonth(username, month, timezone);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch performance summary");
      }

      return response.data ?? null;
    },
    enabled: false
  });

  const performanceChatSummaryQuery = useQuery<PerformanceSummaryDTO | null, Error>({
    queryKey: ["performanceChatSummary"],
    // params: username, month, timezone
    queryFn: async ({ queryKey }) => {
      const [, username, month, timezone] = queryKey as [string, string, number, string];

      const response = await performanceService.getChatGPTSummary(username, month, timezone);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch performance chat summary");
      }

      return response.data ?? null;
    },
    enabled: false
  });

  const ticketAssessmentQuery = useQuery<TicketAssessmentDetailDTO | null, Error>({
    queryKey: ["ticketAssessment"],
    // param: id
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as [string, number];

      const response = await performanceService.getTicketAssessment(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch ticket assessment");
      }

      return response.data ?? null;
    },
    enabled: false
  });

  const criteriasQuery = useQuery<CriteriaDTO[], Error>({
    queryKey: ["criterias"],
    queryFn: async () => {
      const response = await performanceService.getCriterias();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch criterias");
      }

      return response.data ?? [];
    }
  });

  const criteriaDetailQuery = useQuery<CriteriaDetailDTO | null, Error>({
    queryKey: ["criteriaDetail"],
    // param: id
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as [string, number];

      const response = await performanceService.getCriteria(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch criteria detail");
      }

      return response.data ?? null;
    },
    enabled: false
  });

  // Mutations
  const updateTicketAssessment = useMutation<
    TicketAssessmentDetailDTO | null,
    Error,
    { id: number; dto: TicketAssessmentDetailDTO }
  >({
    mutationFn: async ({ id, dto }) => {
      const response = await performanceService.updateTicketAssessment(id, dto);

      if (!response.success) {
        throw new Error(response.message || "Failed to update ticket assessment");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketAssessment"] });
    }
  });

  const createCriteria = useMutation<CriteriaDetailDTO | null, Error, CriteriaDetailDTO>({
    mutationFn: async (dto) => {
      const response = await performanceService.createCriteria(dto);

      if (!response.success) {
        throw new Error(response.message || "Failed to create criteria");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const updateCriteria = useMutation<CriteriaDetailDTO | null, Error, CriteriaDetailDTO>({
    mutationFn: async (dto) => {
      const response = await performanceService.updateCriteria(dto);

      if (!response.success) {
        throw new Error(response.message || "Failed to update criteria");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const deleteCriteria = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const response = await performanceService.deleteCriteria(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete criteria");
      }

      return response.data ?? undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const buildPrompt = useMutation<string | null, Error, void>({
    mutationFn: async () => {
      const response = await performanceService.buildPrompt();

      if (!response.success) {
        throw new Error(response.message || "Failed to build prompt");
      }

      return response.data ?? null;
    }
  });

  const evaluateTickets = useMutation<void, Error, void>({
    mutationFn: async () => {
      const response = await performanceService.evaluateTickets();

      if (!response.success) {
        throw new Error(response.message || "Failed to evaluate tickets");
      }

      return response.data ?? undefined;
    }
  });

  return {
    performanceSummaryQuery,
    performanceChatSummaryQuery,
    ticketAssessmentQuery,
    criteriasQuery,
    criteriaDetailQuery,
    updateTicketAssessment,
    createCriteria,
    updateCriteria,
    deleteCriteria,
    buildPrompt,
    evaluateTickets
  };
}
