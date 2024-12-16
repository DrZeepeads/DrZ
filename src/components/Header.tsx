import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#00796B", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: "#fff", textDecoration: 'none' }}>
          NelsonBot
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button color="inherit" component={Link} to="/chat">Chat</Button>
          <Button color="inherit" component={Link} to="/history">History</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

