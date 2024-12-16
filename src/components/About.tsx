import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const About: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>About NelsonBot</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography paragraph>
          NelsonBot is an AI-powered pediatric assistant based on the Nelson Textbook of Pediatrics. 
          Our mission is to provide quick and accurate information to healthcare professionals and students 
          in the field of pediatrics.
        </Typography>
        <Typography paragraph>
          Using advanced natural language processing and machine learning techniques, NelsonBot can answer 
          questions, provide explanations, and offer insights on a wide range of pediatric topics.
        </Typography>
        <Typography paragraph>
          Please note that while NelsonBot is a powerful tool, it should not replace professional medical 
          advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;

