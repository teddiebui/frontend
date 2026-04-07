// Hook for messageService: manage state and side effects for messages

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services/messageService";
import type { MessageDTO } from "@/types";

export function useMessage(ticketId?: number) {
  const queryClient = useQueryClient();

  // Query: fetch messages by ticketId
  const {
    data: messages,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages
  } = useQuery({
    queryKey: ["messages", ticketId],
    queryFn: () =>
      ticketId !== undefined
        ? messageService.getMessagesByTicket(ticketId)
        : Promise.resolve({ data: [], success: true, message: "", httpCode: 200 }),
    enabled: ticketId !== undefined,
  });

  // Mutation: send a message
  const sendMessage = useMutation({
    mutationFn: (message: MessageDTO) => messageService.addMessage(message),
    onSuccess: () => {
      if (ticketId !== undefined) {
        queryClient.invalidateQueries({ queryKey: ["messages", ticketId] });
      }
    },
  });

  return {
    messages: messages?.data ?? [],
    messagesLoading,
    messagesError,
    refetchMessages,
    sendMessage,
  };
}
