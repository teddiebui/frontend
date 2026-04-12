// Hook for messageService: manage state and side effects for messages

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services/messageService";
import type { MessageDTO } from "@/types";

export function useMessage(ticketId?: number) {
  const queryClient = useQueryClient();

  // Query: fetch messages by ticketId
  const messagesQuery = useQuery<MessageDTO[], Error>({
    queryKey: ["messages", ticketId],
    queryFn: async () => {
      if (ticketId === undefined) {
        return [];
      }

      const response = await messageService.getMessagesByTicket(ticketId);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch messages");
      }

      return response.data ?? [];
    },
    enabled: ticketId !== undefined,
  });

  // Mutation: send a message
  const sendMessage = useMutation<MessageDTO | null, Error, MessageDTO>({
    mutationFn: async (message) => {
      const response = await messageService.addMessage(message);

      if (!response.success) {
        throw new Error(response.message || "Failed to send message");
      }

      return response.data ?? null;
    },
    onSuccess: () => {
      if (ticketId !== undefined) {
        queryClient.invalidateQueries({ queryKey: ["messages", ticketId] });
      }
    },
  });

  return {
    messagesQuery,
    sendMessage,
  };
}
