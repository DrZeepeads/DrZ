import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const WelcomeScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 120px)',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to NelsonBot
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your AI-powered pediatric assistant
          </Typography>
          <Typography variant="body1" paragraph>
            Get quick and accurate information based on the Nelson Textbook of Pediatrics.
          </Typography>
          <Button
            component={Link}
            to="/chat"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Start Chatting
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
};

