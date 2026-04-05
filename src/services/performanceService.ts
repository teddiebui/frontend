import { httpClient } from "@/lib/http/httpClient";
import type {
  APIResultSet,
  PerformanceSummaryDTO,
  TicketAssessmentDetailDTO,
  CriteriaDTO,
  CriteriaDetailDTO,
} from "@/types";

const BASE_URL = "/performance";

export const performanceService = {
  getReportByMonth: (username: string, month: number, timezone: string): Promise<APIResultSet<PerformanceSummaryDTO>> =>
    httpClient.get<PerformanceSummaryDTO>(`${BASE_URL}`, { params: { username, month, timezone } }),

  getChatGPTSummary: (username: string, month: number, timezone: string): Promise<APIResultSet<PerformanceSummaryDTO>> =>
    httpClient.get<PerformanceSummaryDTO>(`${BASE_URL}/chat-summary`, { params: { username, month, timezone } }),

  getTicketAssessment: (id: number): Promise<APIResultSet<TicketAssessmentDetailDTO>> =>
    httpClient.get<TicketAssessmentDetailDTO>(`${BASE_URL}/ticket-assessment/${id}`),

  updateTicketAssessment: (id: number, dto: TicketAssessmentDetailDTO): Promise<APIResultSet<TicketAssessmentDetailDTO>> =>
    httpClient.put<TicketAssessmentDetailDTO>(`${BASE_URL}/ticket-assessment/${id}`, dto),

  getCriterias: (): Promise<APIResultSet<CriteriaDTO[]>> =>
    httpClient.get<CriteriaDTO[]>(`${BASE_URL}/criteria`),

  getCriteria: (id: number): Promise<APIResultSet<CriteriaDetailDTO>> =>
    httpClient.get<CriteriaDetailDTO>(`${BASE_URL}/criteria/${id}`),

  createCriteria: (dto: CriteriaDetailDTO): Promise<APIResultSet<CriteriaDetailDTO>> =>
    httpClient.post<CriteriaDetailDTO>(`${BASE_URL}/criteria`, dto),

  updateCriteria: (dto: CriteriaDetailDTO): Promise<APIResultSet<CriteriaDetailDTO>> =>
    httpClient.put<CriteriaDetailDTO>(`${BASE_URL}/criteria`, dto),

  deleteCriteria: (id: number): Promise<APIResultSet<void>> =>
    httpClient.delete<void>(`${BASE_URL}/criteria/${id}`),

  buildPrompt: (): Promise<APIResultSet<string>> =>
    httpClient.get<string>(`${BASE_URL}/criteria/buildPrompt`),

  evaluateTickets: (): Promise<APIResultSet<void>> =>
    httpClient.get<void>(`${BASE_URL}/evaluateTicket`),
};
