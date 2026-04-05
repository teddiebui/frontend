// src/hooks/useTicket.ts
// Hook quản lý state và side effect cho ticket, UI chỉ gọi hook này

import { useState, useCallback } from "react";
import { ticketService } from "@/services/ticketService";
import type {
  TicketDetailDTO,
  TicketListDTO,
  TicketDashboardDTO,
  TicketReportDTO,
  TicketSearchCriteria,
  NoteDTO,
} from "@/types";

export function useTicket() {
  const [tickets, setTickets] = useState<TicketListDTO[]>([]);
  const [ticketDetail, setTicketDetail] = useState<TicketDetailDTO | null>(null);
  const [dashboard, setDashboard] = useState<TicketDashboardDTO[]>([]);
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [reports, setReports] = useState<TicketReportDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy ticket theo id
  const fetchById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getById(id);
      const { data, success, message } = res;
      if (data && success) setTicketDetail(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo ticket mới
  const create = useCallback(async (dto: TicketDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.create(dto);
      const { data, success, message } = res;
      if (data && success) setTicketDetail(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật ticket
  const update = useCallback(async (id: number, dto: TicketDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.update(id, dto);
      const { data, success, message } = res;
      if (data && success) setTicketDetail(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy ticket theo Facebook user id
  const fetchByFacebookId = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getByFacebookId(id);
      const { data, success, message } = res;
      if (data && success) setTickets(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy tất cả note của ticket
  const fetchAllNotes = useCallback(async (ticketId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.getAllNotes(ticketId);
      const { data, success, message } = res;
      if (data && success) setNotes(Array.from(data));
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm note vào ticket
  const addNote = useCallback(async (ticketId: number, noteDto: NoteDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.addNote(ticketId, noteDto);
      if (!res.success) setError(res.message);
      else await fetchAllNotes(ticketId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [fetchAllNotes]);

  // Xóa note khỏi ticket
  const removeNote = useCallback(async (ticketId: number, noteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.removeNote(ticketId, noteId);
      if (!res.success) setError(res.message);
      else await fetchAllNotes(ticketId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [fetchAllNotes]);

  // Tìm kiếm ticket (có phân trang)
  const search = useCallback(async (criteria: TicketSearchCriteria, page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.search(criteria, page, size);
      const { data, success, message } = res;
      if (data && success) setTickets(data.content);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tìm kiếm ticket (không phân trang, cho báo cáo)
  const searchReport = useCallback(async (criteria: TicketSearchCriteria) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.searchReport(criteria);
      const { data, success, message } = res;
      if (data && success) setTickets(data.content);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy dashboard ticket cho user hiện tại
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.dashboard();
      const { data, success, message } = res;
      if (data && success) setDashboard(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);


  // Lấy các ticket đã resolved có message (cho đánh giá)
  const findResolvedWithMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ticketService.findResolvedWithMessages();
      const { data, success, message } = res;
      if (data && success) setReports(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tickets,
    ticketDetail,
    dashboard,
    notes,
    reports,
    loading,
    error,
    fetchById,
    create,
    update,
    fetchByFacebookId,
    addNote,
    removeNote,
    fetchAllNotes,
    search,
    searchReport,
    fetchDashboard,
    findResolvedWithMessages,
  };
}
