import { useState, useCallback } from "react";
import { ticketService } from "@/services/ticketService";
import type {
  TicketDetailDTO,
  TicketListDTO,
  TicketDashboardDTO,
  TicketReportDTO,
  NoteDTO,
  TicketSearchCriteria,
  PaginationResponse,
  APIResultSet,
} from "@/types";

export function useTicket() {
  const [tickets, setTickets] = useState<TicketListDTO[]>([]);
  const [dashboard, setDashboard] = useState<TicketDashboardDTO[]>([]);
  const [detail, setDetail] = useState<TicketDetailDTO | null>(null);
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [report, setReport] = useState<TicketReportDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationResponse<TicketListDTO> | null>(null);

  // Lấy dashboard metrics
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.dashboard();
      if (res.success && res.data) {
        setDashboard(res.data);
      } else {
        setError(res.message || "Lỗi lấy dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tìm kiếm ticket (có phân trang)
  const search = useCallback(async (criteria: TicketSearchCriteria, page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.search(criteria, page, size);
      if (res.success && res.data) {
        setTickets(res.data.content);
        setPagination(res.data);
      } else {
        setError(res.message || "Lỗi tìm kiếm ticket");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy chi tiết ticket
  const fetchDetail = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getById(id);
      if (res.success && res.data) {
        setDetail(res.data);
      } else {
        setError(res.message || "Lỗi lấy chi tiết ticket");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm note
  const addNote = useCallback(async (ticketId: number, note: NoteDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.addNote(ticketId, note);
      if (res.success) {
        await fetchNotes(ticketId);
      } else {
        setError(res.message || "Lỗi thêm note");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa note
  const removeNote = useCallback(async (ticketId: number, noteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.removeNote(ticketId, noteId);
      if (res.success) {
        await fetchNotes(ticketId);
      } else {
        setError(res.message || "Lỗi xóa note");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy tất cả note
  const fetchNotes = useCallback(async (ticketId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getAllNotes(ticketId);
      if (res.success && res.data) {
        setNotes(Array.from(res.data));
      } else {
        setError(res.message || "Lỗi lấy notes");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy report
  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getForEvaluation();
      if (res.success && res.data) {
        setReport(res.data);
      } else {
        setError(res.message || "Lỗi lấy report");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Export excel
  const exportExcel = useCallback(async (criteria: TicketSearchCriteria) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.exportExcel(criteria);
      if (res.success && res.data) {
        return res.data;
      } else {
        setError(res.message || "Lỗi export excel");
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tickets,
    dashboard,
    detail,
    notes,
    report,
    loading,
    error,
    pagination,
    fetchDashboard,
    search,
    fetchDetail,
    addNote,
    removeNote,
    fetchNotes,
    fetchReport,
    exportExcel,
  };
}
