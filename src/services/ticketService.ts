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
  getById: async (id: number): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.get<TicketDetailDTO>(`${API_BASE_TICKET_URL}`, { params: { id } }),

  /** Tạo mới ticket */
  create: async (dto: TicketDetailDTO): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.post<TicketDetailDTO>(`${API_BASE_TICKET_URL}`, dto),

  /** Cập nhật ticket */
  update: async (id: number, dto: TicketDetailDTO): Promise<APIResultSet<TicketDetailDTO>> =>
    httpClient.put<TicketDetailDTO>(`${API_BASE_TICKET_URL}/${id}`, dto),

  /** Lấy danh sách ticket theo facebookId */
  getByFacebookId: async (id: string): Promise<APIResultSet<TicketListDTO[]>> =>
    httpClient.get<TicketListDTO[]>(`${API_BASE_TICKET_URL}/get-by-facebook-id`, { params: { id } }),

  /** Thêm note vào ticket */
  addNote: async (ticketId: number, noteDto: NoteDTO): Promise<APIResultSet<void>> =>
    httpClient.put<void>(`${API_BASE_TICKET_URL}/${ticketId}/note`, noteDto),

  /** Xóa note khỏi ticket */
  removeNote: async (ticketId: number, noteId: number): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${API_BASE_TICKET_URL}/${ticketId}/note/${noteId}`),

  /** Lấy tất cả note của ticket */
  getAllNotes: async (ticketId: number): Promise<APIResultSet<Set<NoteDTO>>> =>
    httpClient.get<Set<NoteDTO>>(`${API_BASE_TICKET_URL}/${ticketId}/note`),

  /** Tìm kiếm ticket (có phân trang) */
  search: async (criteria: TicketSearchCriteria, page = 0, size = 10): Promise<APIResultSet<PaginationResponse<TicketListDTO>>> =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${API_BASE_TICKET_URL}/search`,
      { params: { ...criteria, page, size } }
    ),

  /** Tìm kiếm ticket report (không phân trang) */
  searchReport: async (criteria: TicketSearchCriteria): Promise<APIResultSet<PaginationResponse<TicketListDTO>>> =>
    httpClient.get<PaginationResponse<TicketListDTO>>(
      `${API_BASE_TICKET_URL}/search-report`,
      { params: { ...criteria } }
    ),

  /** Lấy dashboard metrics ticket */
  dashboard: async (): Promise<APIResultSet<TicketDashboardDTO[]>> =>
    httpClient.get<TicketDashboardDTO[]>(`${API_BASE_TICKET_URL}/dashboard`),

  /** Export excel ticket */
  exportExcel: async (criteria: TicketSearchCriteria): Promise<APIResultSet<Blob>> =>
    httpClient.post<Blob>(`${API_BASE_TICKET_URL}/export-excel`, criteria),

  /** Lấy ticket đã xử lý có message */
  getForEvaluation: async (): Promise<APIResultSet<TicketReportDTO[]>> =>
    httpClient.get<TicketReportDTO[]>(`${API_BASE_TICKET_URL}/findResolvedWithMessages`),
};
