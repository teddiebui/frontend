import { describe, it, expect, vi, beforeEach } from "vitest";
import { messageService } from "@/services/messageService";
import { httpClient } from "@/lib/http/httpClient";
import type { MessageDTO, APIResultSet } from "@/types";

vi.mock("@/lib/http/httpClient");

const mockMessage: MessageDTO = {
  id: 1,
  timestamp: "2024-01-01T00:00:00Z",
  text: "Hello",
  senderEmployee: true,
  ticketId: 123,
  senderSystem: false,
  attachments: [],
};

describe("messageService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getMessagesByTicket - success", async () => {
    const apiResult: APIResultSet<MessageDTO[]> = {
      httpCode: 200,
      message: "OK",
      data: [mockMessage],
      success: true,
    };
    (httpClient.get as any).mockResolvedValue(apiResult);
    const res = await messageService.getMessagesByTicket(123);
    expect(res).toEqual(apiResult);
    expect(httpClient.get).toHaveBeenCalledWith("/message", { params: { ticketId: 123 } });
  });

  it("getMessagesByTicket - error", async () => {
    (httpClient.get as any).mockRejectedValue(new Error("Network error"));
    await expect(messageService.getMessagesByTicket(123)).rejects.toThrow("Network error");
  });

  it("addMessage - success", async () => {
    const apiResult: APIResultSet<MessageDTO> = {
      httpCode: 200,
      message: "Created",
      data: mockMessage,
      success: true,
    };
    (httpClient.post as any).mockResolvedValue(apiResult);
    const res = await messageService.addMessage(mockMessage);
    expect(res).toEqual(apiResult);
    expect(httpClient.post).toHaveBeenCalledWith("/message", mockMessage);
  });

  it("addMessage - error", async () => {
    (httpClient.post as any).mockRejectedValue(new Error("Network error"));
    await expect(messageService.addMessage(mockMessage)).rejects.toThrow("Network error");
  });
});
