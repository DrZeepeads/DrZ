import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const History: React.FC = () => {
  const { user } = useAuth();

  // Mock history data
  const mockHistory = [
    { id: 1, query: "What are the symptoms of pneumonia in children?", date: "2023-05-01" },
    { id: 2, query: "How to treat diaper rash?", date: "2023-05-03" },
    { id: 3, query: "Recommended vaccines for 1-year-old", date: "2023-05-05" },
  ];

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Please sign in to view your history.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Your Chat History</Typography>
      <Paper elevation={3}>
        <List>
          {mockHistory.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={item.query}
                secondary={`Date: ${item.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default History;

