import { describe, it, expect, vi, beforeEach } from "vitest";
import { performanceService } from "@/services/performanceService";
import { httpClient } from "@/lib/http/httpClient";
import type {
  APIResultSet,
  PerformanceSummaryDTO,
  TicketAssessmentDetailDTO,
  CriteriaDTO,
  CriteriaDetailDTO,
} from "@/types";

vi.mock("@/lib/http/httpClient");

describe("performanceService", () => {
  const summary: PerformanceSummaryDTO = {
    assignee: { username: "user1", name: "User 1" },
    month: 3,
    summary: { chatQuality: {}, firstResponseTime: {}, avgResponseTime: {}, resolutionTime: {}, chatGPTsummary: "summary" },
  };
  const assessment: TicketAssessmentDetailDTO = {
    id: 1,
    ticketId: 1,
    assignee: "user1",
    evaluatedBy: "supervisor",
    evaluatedAt: 1234567890,
    passed: true,
    firstResponseTime: 10,
    avgResponseTime: 5,
    resolutionTime: 15,
    summary: "summary",
    criterias: [],
  };
  const criteria: CriteriaDetailDTO = { id: 1, code: "C1", name: "Criteria 1", description: "desc", active: true };
  const criterias: CriteriaDTO[] = [ { id: 1, code: "C1", name: "Criteria 1", description: "desc" } ];

  const successResult = <T,>(data: T): APIResultSet<T> => ({ httpCode: 200, message: "OK", data, success: true });
  const errorResult = <T,>(): APIResultSet<T> => ({ httpCode: 500, message: "Error", data: null, success: false });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getReportByMonth success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(summary));
    const res = await performanceService.getReportByMonth("user1", 3, "Asia/Ho_Chi_Minh");
    expect(res).toEqual(successResult(summary));
    expect(httpClient.get).toHaveBeenCalledWith("/performance", { params: { username: "user1", month: 3, timezone: "Asia/Ho_Chi_Minh" } });
  });

  it("getChatGPTSummary success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(summary));
    const res = await performanceService.getChatGPTSummary("user1", 3, "Asia/Ho_Chi_Minh");
    expect(res).toEqual(successResult(summary));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/chat-summary", { params: { username: "user1", month: 3, timezone: "Asia/Ho_Chi_Minh" } });
  });

  it("getTicketAssessment success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(assessment));
    const res = await performanceService.getTicketAssessment(1);
    expect(res).toEqual(successResult(assessment));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/ticket-assessment/1");
  });

  it("updateTicketAssessment success", async () => {
    (httpClient.put as any).mockResolvedValue(successResult(assessment));
    const res = await performanceService.updateTicketAssessment(1, assessment);
    expect(res).toEqual(successResult(assessment));
    expect(httpClient.put).toHaveBeenCalledWith("/performance/ticket-assessment/1", assessment);
  });

  it("getCriterias success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(criterias));
    const res = await performanceService.getCriterias();
    expect(res).toEqual(successResult(criterias));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/criteria");
  });

  it("getCriteria success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(criteria));
    const res = await performanceService.getCriteria(1);
    expect(res).toEqual(successResult(criteria));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/criteria/1");
  });

  it("createCriteria success", async () => {
    (httpClient.post as any).mockResolvedValue(successResult(criteria));
    const res = await performanceService.createCriteria(criteria);
    expect(res).toEqual(successResult(criteria));
    expect(httpClient.post).toHaveBeenCalledWith("/performance/criteria", criteria);
  });

  it("updateCriteria success", async () => {
    (httpClient.put as any).mockResolvedValue(successResult(criteria));
    const res = await performanceService.updateCriteria(criteria);
    expect(res).toEqual(successResult(criteria));
    expect(httpClient.put).toHaveBeenCalledWith("/performance/criteria", criteria);
  });

  it("deleteCriteria success", async () => {
    (httpClient.delete as any).mockResolvedValue(successResult(undefined));
    const res = await performanceService.deleteCriteria(1);
    expect(res).toEqual(successResult(undefined));
    expect(httpClient.delete).toHaveBeenCalledWith("/performance/criteria/1");
  });

  it("buildPrompt success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult("prompt"));
    const res = await performanceService.buildPrompt();
    expect(res).toEqual(successResult("prompt"));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/criteria/buildPrompt");
  });

  it("evaluateTickets success", async () => {
    (httpClient.get as any).mockResolvedValue(successResult(undefined));
    const res = await performanceService.evaluateTickets();
    expect(res).toEqual(successResult(undefined));
    expect(httpClient.get).toHaveBeenCalledWith("/performance/evaluateTicket");
  });

  // Error paths
  it("getReportByMonth error", async () => {
    (httpClient.get as any).mockResolvedValue(errorResult<PerformanceSummaryDTO>());
    const res = await performanceService.getReportByMonth("user1", 3, "Asia/Ho_Chi_Minh");
    expect(res.success).toBe(false);
  });

  it("getTicketAssessment error", async () => {
    (httpClient.get as any).mockResolvedValue(errorResult<TicketAssessmentDetailDTO>());
    const res = await performanceService.getTicketAssessment(1);
    expect(res.success).toBe(false);
  });
});
