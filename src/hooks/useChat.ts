import { useState, useCallback } from 'react';
import { sendMessage } from '../api/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendChatMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    try {
      const response = await sendMessage(message);
      setMessages(prevMessages => [...prevMessages, message, response]);
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, sendChatMessage };
};

