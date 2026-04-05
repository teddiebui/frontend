import { useState, useCallback } from "react";
import { performanceService } from "@/services/performanceService";
import type {
  PerformanceSummaryDTO,
  TicketAssessmentDetailDTO,
  CriteriaDTO,
  CriteriaDetailDTO,
} from "@/types";

export function usePerformance() {
  const [summary, setSummary] = useState<PerformanceSummaryDTO | null>(null);
  const [chatSummary, setChatSummary] = useState<PerformanceSummaryDTO | null>(null);
  const [assessment, setAssessment] = useState<TicketAssessmentDetailDTO | null>(null);
  const [criterias, setCriterias] = useState<CriteriaDTO[]>([]);
  const [criteria, setCriteria] = useState<CriteriaDetailDTO | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReportByMonth = useCallback(async (username: string, month: number, timezone: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.getReportByMonth(username, month, timezone);
      if (res.success && res.data) setSummary(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChatGPTSummary = useCallback(async (username: string, month: number, timezone: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.getChatGPTSummary(username, month, timezone);
      if (res.success && res.data) setChatSummary(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTicketAssessment = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.getTicketAssessment(id);
      if (res.success && res.data) setAssessment(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTicketAssessment = useCallback(async (id: number, dto: TicketAssessmentDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.updateTicketAssessment(id, dto);
      if (res.success && res.data) setAssessment(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCriterias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.getCriterias();
      if (res.success && res.data) setCriterias(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCriteria = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.getCriteria(id);
      if (res.success && res.data) setCriteria(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCriteria = useCallback(async (dto: CriteriaDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.createCriteria(dto);
      if (res.success && res.data) setCriteria(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCriteria = useCallback(async (dto: CriteriaDetailDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.updateCriteria(dto);
      if (res.success && res.data) setCriteria(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCriteria = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await performanceService.deleteCriteria(id);
      setCriteria(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPrompt = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await performanceService.buildPrompt();
      if (res.success && res.data) setPrompt(res.data);
      else setError(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  const evaluateTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await performanceService.evaluateTickets();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    summary,
    chatSummary,
    assessment,
    criterias,
    criteria,
    prompt,
    loading,
    error,
    fetchReportByMonth,
    fetchChatGPTSummary,
    fetchTicketAssessment,
    updateTicketAssessment,
    fetchCriterias,
    fetchCriteria,
    createCriteria,
    updateCriteria,
    deleteCriteria,
    fetchPrompt,
    evaluateTickets,
  };
}
