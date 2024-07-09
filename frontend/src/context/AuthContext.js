import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { username, password });
      const { token, username: loggedInUsername } = response.data;
      console.log('Login response:', response.data);

      localStorage.setItem('token', token);
      setUser({ username: loggedInUsername, token });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { username, password });
      console.log('Register response:', response.data);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


