import React, { useMemo, useState } from 'react';
import authAPI from '../http/auth.js';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);

  function saveToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  async function register({ email, password }) {
    try {
      const response = await authAPI.register({ email, password });
      const { accessToken, user } = response;

      saveToken(accessToken);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function login({ email, password }) {
    const { accessToken, user } = await authAPI.login({ email, password });

    saveToken(accessToken);
    setUser(user);
  }

  async function activate(activationToken) {
    const { accessToken, user } = await authAPI.activate(activationToken);

    saveToken(accessToken);
    setUser(user);
  }

  async function logout() {
    try {
      await authAPI.logout();

      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authAPI.refresh();

      saveToken(accessToken);
      setUser(user);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setChecked(true);
    }
  }

  const value = useMemo(() => {
    return { isChecked, user, checkAuth, register, activate, login, logout };
  }, [user, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
