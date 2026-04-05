// Hook for messageService: manage state and side effects for messages
import { useState, useCallback } from "react";
import { messageService } from "@/services/messageService";
import type { MessageDTO } from "@/types";

export function useMessage() {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<MessageDTO | null>(null);

  // Fetch messages by ticketId
  const fetchMessagesByTicket = useCallback(async (ticketId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await messageService.getMessagesByTicket(ticketId);
      const { data, success, message } = res;
      if (data && success) setMessages(data);
      else setError(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (message: MessageDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await messageService.addMessage(message);
      const { data, success, message: msg } = res;
      if (data && success) setSentMessage(data);
      else setError(msg);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    sentMessage,
    loading,
    error,
    fetchMessagesByTicket,
    sendMessage,
  };
}
