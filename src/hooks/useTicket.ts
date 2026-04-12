// src/hooks/useTicket.ts
// Hook quản lý state và side effect cho ticket, UI chỉ gọi hook này

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import type {
  PaginationResponse,
  TicketDetailDTO,
  TicketDashboardDTO,
  TicketListDTO,
  TicketSearchCriteria,
  NoteDTO,
} from "@/types";

interface UseTicketOptions {
  enableTicketDetail?: boolean;
}

export function useTicket(ticketId?: number, options: UseTicketOptions = {}) {
  const queryClient = useQueryClient();
  const enableTicketDetail = options.enableTicketDetail ?? true;

  // Queries
  const ticketDetailQuery = useQuery<TicketDetailDTO | null, Error>({
    queryKey: ["ticketDetail", ticketId],
    queryFn: async () => {
      if (!ticketId) {
        return null;
      }

      const response = await ticketService.getById(ticketId);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch ticket detail");
      }

      return response.data ?? null;
    },
    enabled: enableTicketDetail && !!ticketId,
  });

  const dashboardQuery = useQuery<TicketDashboardDTO[], Error>({
    queryKey: ["ticketDashboard"],
    queryFn: async () => {
      const response = await ticketService.dashboard();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch ticket dashboard");
      }

      return response.data ?? [];
    },
  });

  // Mutations
  const createTicket = useMutation<TicketDetailDTO | null, Error, TicketDetailDTO>({
    mutationFn: async (dto) => {
      const response = await ticketService.create(dto);

      if (!response.success) {
        throw new Error(response.message || "Failed to create ticket");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDashboard"] });
    },
  });

  const updateTicket = useMutation<
    TicketDetailDTO | null,
    Error,
    { id: number; dto: TicketDetailDTO }
  >({
    mutationFn: async ({ id, dto }) => {
      const response = await ticketService.update(id, dto);

      if (!response.success) {
        throw new Error(response.message || "Failed to update ticket");
      }

      return response.data ?? null;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["ticketDashboard"] });
    },
  });

  const addNote = useMutation<void, Error, { ticketId: number; noteDto: NoteDTO }>({
    mutationFn: async ({ ticketId, noteDto }) => {
      const response = await ticketService.addNote(ticketId, noteDto);

      if (!response.success) {
        throw new Error(response.message || "Failed to add note");
      }

      return response.data ?? undefined;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.ticketId] });
    },
  });

  const removeNote = useMutation<void, Error, { ticketId: number; noteId: number }>({
    mutationFn: async ({ ticketId, noteId }) => {
      const response = await ticketService.removeNote(ticketId, noteId);

      if (!response.success) {
        throw new Error(response.message || "Failed to remove note");
      }

      return response.data ?? undefined;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetail", variables.ticketId] });
    },
  });

  // Search tickets (paginated)
  const searchTickets = useMutation<
    PaginationResponse<TicketListDTO> | null,
    Error,
    { criteria: TicketSearchCriteria; page?: number; size?: number }
  >({
    mutationFn: async ({ criteria, page, size }) => {
      const response = await ticketService.search(criteria, page, size);

      if (!response.success) {
        throw new Error(response.message || "Failed to search tickets");
      }

      return response.data ?? null;
    },
  });

  // Search tickets for report (not paginated)
  const searchReport = useMutation<
    PaginationResponse<TicketListDTO> | null,
    Error,
    TicketSearchCriteria
  >({
    mutationFn: async (criteria) => {
      const response = await ticketService.searchReport(criteria);

      if (!response.success) {
        throw new Error(response.message || "Failed to search ticket report");
      }

      return response.data ?? null;
    },
  });

  return {
    ticketDetailQuery,
    dashboardQuery,
    createTicket,
    updateTicket,
    addNote,
    removeNote,
    searchTickets,
    searchReport,
  };
}
