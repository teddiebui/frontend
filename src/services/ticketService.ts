import { httpClient } from "@/lib/http/httpClient";
import type {
  TicketDetailDTO,
  TicketListDTO,
  TicketReportDTO,
  TicketDashboardDTO,
  NoteDTO,
  TicketSearchCriteria,
  PaginationResponse,
  APIResultSet,
} from "@/types";

const API_BASE_TICKET_URL = "/ticket";
/**
 * Service cho toàn bộ API ticket, map 1:1 với TicketController
 */
export const ticketService = {
  /** Lấy chi tiết ticket theo id */
  getById: (id: number): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.get<TicketDetailDTO>(`${API_BASE_TICKET_URL}`, { params: { id } }),

  /** Tạo mới ticket */
  create: (dto: TicketDetailDTO): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.post<TicketDetailDTO>(`${API_BASE_TICKET_URL}`, dto),

  /** Cập nhật ticket */
  update: (id: number, dto: TicketDetailDTO): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.put<TicketDetailDTO>(`${API_BASE_TICKET_URL}/${id}`, dto),

  /** Lấy danh sách ticket theo facebookId */
  getByFacebookId: (id: string): Promise<APIResultSet<TicketListDTO[]>> =>
    httpClient.get<TicketListDTO[]>(`${API_BASE_TICKET_URL}/get-by-facebook-id`, { params: { id } }),

  /** Thêm note vào ticket */
  addNote: (ticketId: number, noteDto: NoteDTO): Promise<APIResultSet<void>> =>
    httpClient.put<void>(`${API_BASE_TICKET_URL}/${ticketId}/note`, noteDto),

  /** Xóa note khỏi ticket */
  removeNote: (ticketId: number, noteId: number): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${API_BASE_TICKET_URL}/${ticketId}/note/${noteId}`),

  /** Lấy tất cả note của ticket */
  getAllNotes: (ticketId: number): Promise<APIResultSet<NoteDTO[]>> =>
    httpClient.get<NoteDTO[]>(`${API_BASE_TICKET_URL}/${ticketId}/note`),

  /** Tìm kiếm ticket (có phân trang) */
  search: (criteria: TicketSearchCriteria, page = 0, size = 10): Promise<APIResultSet<PaginationResponse<TicketListDTO>>> =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${API_BASE_TICKET_URL}/search`,
      { params: { ...criteria, page, size } }
    ),

  /** Tìm kiếm ticket report (không phân trang) */
  searchReport: (criteria: TicketSearchCriteria): Promise<APIResultSet<PaginationResponse<TicketListDTO>>> =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${API_BASE_TICKET_URL}/search-report`,
      { params: { ...criteria } }
    ),

  /** Lấy dashboard metrics ticket */
  dashboard: (): Promise<APIResultSet<TicketDashboardDTO[]>> =>
    httpClient.get<TicketDashboardDTO[]>(`${API_BASE_TICKET_URL}/dashboard`),

  /** Export excel ticket */
  exportExcel: (criteria: TicketSearchCriteria): Promise<APIResultSet<Blob>> =>
    httpClient.post<Blob>(`${API_BASE_TICKET_URL}/export-excel`, criteria),

  /** Lấy ticket đã xử lý có message */
  getForEvaluation: (): Promise<APIResultSet<TicketReportDTO[]>> =>
    httpClient.get<TicketReportDTO[]>(`${API_BASE_TICKET_URL}/findResolvedWithMessages`),
};
