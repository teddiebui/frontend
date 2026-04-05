import { httpClient } from "@/lib/http/httpClient";
import type {
  TicketDetailDTO,
  TicketListDTO,
  TicketDashboardDTO,
  TicketReportDTO,
  TicketSearchCriteria,
  NoteDTO,
  PaginationResponse,
} from "@/types";

const BASE_TICKET_URL = "/ticket";

export const ticketService = {
  /** Lấy ticket theo id */
  getById: (id: number) =>
    httpClient.get<TicketDetailDTO>(`${BASE_TICKET_URL}`, { params: { id } }),

  /** Tạo ticket mới */
  create: (dto: TicketDetailDTO) =>
    httpClient.post<TicketDetailDTO>(`${BASE_TICKET_URL}`, dto),

  /** Cập nhật ticket */
  update: (id: number, dto: TicketDetailDTO) =>
    httpClient.put<TicketDetailDTO>(`${BASE_TICKET_URL}/${id}`, dto),

  /** Lấy ticket theo Facebook user id */
  getByFacebookId: (id: string) =>
    httpClient.get<TicketListDTO[]>(`${BASE_TICKET_URL}/get-by-facebook-id`, { params: { id } }),

  /** Thêm note vào ticket */
  addNote: (ticketId: number, noteDto: NoteDTO) =>
    httpClient.put<void>(`${BASE_TICKET_URL}/${ticketId}/note`, noteDto),

  /** Xóa note khỏi ticket */
  removeNote: (ticketId: number, noteId: number) =>
    httpClient.delete<void>(`${BASE_TICKET_URL}/${ticketId}/note/${noteId}`),

  /** Lấy tất cả note của ticket */
  getAllNotes: (ticketId: number) =>
    httpClient.get<Set<NoteDTO>>(`${BASE_TICKET_URL}/${ticketId}/note`),

  /** Tìm kiếm ticket (có phân trang) */
  search: (criteria: TicketSearchCriteria, page = 0, size = 10) =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${BASE_TICKET_URL}/search`,
      { params: { ...criteria, page, size } }
    ),

  /** Tìm kiếm ticket (không phân trang, cho báo cáo) */
  searchReport: (criteria: TicketSearchCriteria) =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${BASE_TICKET_URL}/search-report`,
      { params: { ...criteria } }
    ),

  /** Lấy dashboard ticket cho user hiện tại */
  dashboard: () =>
    httpClient.get<TicketDashboardDTO[]>(`${BASE_TICKET_URL}/dashboard`),

  /** Lấy các ticket đã resolved có message (cho đánh giá) */
  findResolvedWithMessages: () =>
    httpClient.get<TicketReportDTO[]>(`${BASE_TICKET_URL}/findResolvedWithMessages`),
};
