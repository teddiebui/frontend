

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { performanceService } from "@/services/performanceService";
import type {
  TicketAssessmentDetailDTO,
  CriteriaDetailDTO
} from "@/types";

export function usePerformance() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: performanceSummary,
    isLoading: performanceSummaryLoading,
    error: performanceSummaryError,
    refetch: refetchPerformanceSummary
  } = useQuery({
    queryKey: ["performanceSummary"],
    // params: username, month, timezone
    queryFn: ({ queryKey }) => {
      const [, username, month, timezone] = queryKey as [string, string, number, string];
      return performanceService.getReportByMonth(username, month, timezone);
    },
    enabled: false
  });

  const {
    data: performanceChatSummary,
    isLoading: performanceChatSummaryLoading,
    error: performanceChatSummaryError,
    refetch: refetchPerformanceChatSummary
  } = useQuery({
    queryKey: ["performanceChatSummary"],
    // params: username, month, timezone
    queryFn: ({ queryKey }) => {
      const [, username, month, timezone] = queryKey as [string, string, number, string];
      return performanceService.getChatGPTSummary(username, month, timezone);
    },
    enabled: false
  });

  const {
    data: ticketAssessment,
    isLoading: ticketAssessmentLoading,
    error: ticketAssessmentError,
    refetch: refetchTicketAssessment
  } = useQuery({
    queryKey: ["ticketAssessment"],
    // param: id
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey as [string, number];
      return performanceService.getTicketAssessment(id);
    },
    enabled: false
  });

  const {
    data: criterias,
    isLoading: criteriasLoading,
    error: criteriasError,
    refetch: refetchCriterias
  } = useQuery({
    queryKey: ["criterias"],
    queryFn: performanceService.getCriterias
  });

  const {
    data: criteriaDetail,
    isLoading: criteriaDetailLoading,
    error: criteriaDetailError,
    refetch: refetchCriteriaDetail
  } = useQuery({
    queryKey: ["criteriaDetail"],
    // param: id
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey as [string, number];
      return performanceService.getCriteria(id);
    },
    enabled: false
  });

  // Mutations
  const updateTicketAssessment = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: TicketAssessmentDetailDTO }) =>
      performanceService.updateTicketAssessment(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketAssessment"] });
    }
  });

  const createCriteria = useMutation({
    mutationFn: (dto: CriteriaDetailDTO) => performanceService.createCriteria(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const updateCriteria = useMutation({
    mutationFn: (dto: CriteriaDetailDTO) => performanceService.updateCriteria(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const deleteCriteria = useMutation({
    mutationFn: (id: number) => performanceService.deleteCriteria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criterias"] });
    }
  });

  const buildPrompt = useMutation({
    mutationFn: () => performanceService.buildPrompt()
  });

  const evaluateTickets = useMutation({
    mutationFn: () => performanceService.evaluateTickets()
  });

  return {
    // Queries
    performanceSummary: performanceSummary?.data ?? null,
    performanceSummaryLoading,
    performanceSummaryError,
    refetchPerformanceSummary,

    performanceChatSummary: performanceChatSummary?.data ?? null,
    performanceChatSummaryLoading,
    performanceChatSummaryError,
    refetchPerformanceChatSummary,

    ticketAssessment: ticketAssessment?.data ?? null,
    ticketAssessmentLoading,
    ticketAssessmentError,
    refetchTicketAssessment,

    criterias: criterias?.data ?? [],
    criteriasLoading,
    criteriasError,
    refetchCriterias,

    criteriaDetail: criteriaDetail?.data ?? null,
    criteriaDetailLoading,
    criteriaDetailError,
    refetchCriteriaDetail,

    // Mutations
    updateTicketAssessment,
    createCriteria,
    updateCriteria,
    deleteCriteria,
    buildPrompt,
    evaluateTickets
  };
}
