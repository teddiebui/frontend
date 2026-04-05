// Message service: API calls for /api/message endpoints
import { httpClient } from "@/lib/http/httpClient";
import type { MessageDTO, APIResultSet } from "@/types";

const BASE_URL = "/message";

export const messageService = {
  /** Get all messages for a ticket */
  getMessagesByTicket(ticketId: number): Promise<APIResultSet<MessageDTO[]>> {
    return httpClient.get<MessageDTO[]>(`${BASE_URL}`, { params: { ticketId } });
  },

  /** Add a message to a ticket */
  addMessage(message: MessageDTO): Promise<APIResultSet<MessageDTO>> {
    return httpClient.post<MessageDTO>(`${BASE_URL}`, message);
  },
};
