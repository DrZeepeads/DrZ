import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage, getCloudinaryData } from '../api/chat';
import { useAuth } from '../contexts/AuthContext';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useClientOnly } from '../utils/client-utils';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { role: 'user' as const, content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
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
    }
  };

  const isClient = useClientOnly(() => true);

  if (!isClient) {
    return null; // or a loading spinner
  }

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5">Please sign in to use the chat.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', padding: '20px' }}>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                    marginRight: msg.role === 'user' ? 2 : 0,
                    marginLeft: msg.role === 'user' ? 0 : 2,
                    order: msg.role === 'user' ? 2 : 0,
                  }}
                >
                  {msg.role === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                <Paper
                  elevation={2}
                  sx={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '20px',
                    backgroundColor: msg.role === 'user' ? 'primary.light' : 'background.paper',
                    color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant="body1">{msg.content}</Typography>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '28px',
          boxShadow: 3,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Ask NelsonBot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          InputProps={{
            disableUnderline: true,
            sx: { px: 2, py: 1 },
          }}
        />
        <Button
          type="submit"
          color="primary"
          disabled={isLoading}
          sx={{
            borderRadius: '50%',
            p: '10px',
            minWidth: 'unset',
          }}
        >
          <SendIcon />
        </Button>
      </Paper>
    </Box>
  );
};

export default Chat;

