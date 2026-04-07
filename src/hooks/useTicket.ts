// src/hooks/useTicket.ts
// Hook quản lý state và side effect cho ticket, UI chỉ gọi hook này

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import type {
  TicketDetailDTO,
  TicketSearchCriteria,
  NoteDTO,
} from "@/types";

export function useTicket(ticketId?: number) {
  const queryClient = useQueryClient();

  // Queries
  const ticketDetailQuery = useQuery({
    queryKey: ["ticketDetail", ticketId],
    queryFn: () =>
      ticketId
        ? ticketService.getById(ticketId)
        : Promise.resolve({ data: null, success: true, message: "", httpCode: 200 }),
    enabled: !!ticketId,
  });

  const dashboardQuery = useQuery({
    queryKey: ["ticketDashboard"],
    queryFn: ticketService.dashboard,
  });

  // Mutations
  const createTicket = useMutation({
    mutationFn: (dto: TicketDetailDTO) => ticketService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDashboard"] });
    },
  });

  const updateTicket = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: TicketDetailDTO }) => ticketService.update(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.id] });
    },
  });

  const addNote = useMutation({
    mutationFn: ({ ticketId, noteDto }: { ticketId: number; noteDto: NoteDTO }) => ticketService.addNote(ticketId, noteDto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.ticketId] });
    },
  });

  const removeNote = useMutation({
    mutationFn: ({ ticketId, noteId }: { ticketId: number; noteId: number }) => ticketService.removeNote(ticketId, noteId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.ticketId] });
    },
  });

  // Search tickets (paginated)
  const searchTickets = useMutation({
    mutationFn: (params: { criteria: TicketSearchCriteria; page?: number; size?: number }) =>
      ticketService.search(params.criteria, params.page, params.size),
  });

  // Search tickets for report (not paginated)
  const searchReport = useMutation({
    mutationFn: (criteria: TicketSearchCriteria) => ticketService.searchReport(criteria),
  });

  return {
    ticketDetail: ticketDetailQuery.data && 'data' in ticketDetailQuery.data ? ticketDetailQuery.data.data : null,
    ticketDetailLoading: ticketDetailQuery.isLoading,
    ticketDetailError: ticketDetailQuery.error,
    refetchTicketDetail: ticketDetailQuery.refetch,
    dashboard: dashboardQuery.data && 'data' in dashboardQuery.data ? dashboardQuery.data.data : [],
    dashboardLoading: dashboardQuery.isLoading,
    dashboardError: dashboardQuery.error,
    refetchDashboard: dashboardQuery.refetch,
    createTicket,
    updateTicket,
    addNote,
    removeNote,
    searchTickets,
    searchReport,
  };
}
