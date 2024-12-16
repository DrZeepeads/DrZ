import React, { useState } from 'react';
import { sendMessage, getCloudinaryData } from '../api/chat';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      setIsLoading(true);
      try {
        const chatResponse = await sendMessage(input);
        const cloudinaryData = await getCloudinaryData(input);
        const botResponse = `${chatResponse}\n\nAdditional information from Nelson Textbook: ${cloudinaryData}`;
        setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      } catch (error) {
        console.error('Error in chat:', error);
        setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error processing your request.' }]);
      } finally {
        setIsLoading(false);
      }
      setInput('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>{msg.content}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

