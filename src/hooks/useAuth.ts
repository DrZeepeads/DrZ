import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | { username: string }>(null);

  const login = useCallback((username: string, password: string) => {
    // Implement actual authentication logic here
    if (username && password) {
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return { isAuthenticated, user, login, logout };
};

