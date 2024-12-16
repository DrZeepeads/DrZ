import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#004D40",
        padding: "10px",
        textAlign: "center",
        color: "#FFFFFF",
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
        &copy; 2024 NelsonBot |{' '}
        <Link href="/privacy" sx={{ color: "#80CBC4" }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

