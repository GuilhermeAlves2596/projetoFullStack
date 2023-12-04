// AuthContext.js

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const login = async (usuario, senha) => {
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Código 429 indica muitas tentativas (rate limit)
          const errorMessage = 'Número máximo de tentativas atingido. Tente novamente mais tarde.';
          setError(errorMessage);
          setOpenSnackbar(true);
          console.log(errorMessage);
        } else {
          throw new Error('Falha ao autenticar');
        }
      } else {
        // Verifica se a resposta da API indica autenticação bem-sucedida
        const isAuthenticated = data.status === true;
        localStorage.setItem('token', data.token);
        setIsAuthenticated(isAuthenticated);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Usuario ou senha invalidos.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%', backgroundColor: 'red', color: 'white' }}>
          {error}
        </MuiAlert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
