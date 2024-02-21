import  { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('accessTokenUser');
      setIsLoggedIn(!!token);
    }, []);
  
    const login = (token) => {
      localStorage.setItem('accessTokenUser', token);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem('accessTokenUser');
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };