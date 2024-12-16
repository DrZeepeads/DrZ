import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Footer from './components/Footer';
import { Chat, Sidebar, SignIn, WelcomeScreen } from './components/ClientComponents';
import History from './components/History';
import About from './components/About';
import { AuthProvider } from './contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00796B',
        light: '#26A69A',
        dark: '#004D40',
      },
      background: {
        default: darkMode ? '#121212' : '#F5F5F5',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: theme.palette.background.default,
              }}
            >
              <CircularProgress color="primary" size={60} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header toggleSidebar={toggleSidebar} />
                  <Sidebar 
                    open={sidebarOpen} 
                    onClose={() => setSidebarOpen(false)} 
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                  <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Switch>
                      <Route exact path="/" component={WelcomeScreen} />
                      <Route path="/chat" component={Chat} />
                      <Route path="/history" component={History} />
                      <Route path="/about" component={About} />
                      <Route path="/signin" component={SignIn} />
                    </Switch>
                  </Box>
                  <Footer />
                </Box>
              </Router>
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;