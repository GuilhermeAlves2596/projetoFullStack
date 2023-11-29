// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

            if (!response.ok) {
                throw new Error('Falha ao autenticar');
            }

            const data = await response.json();

            // Verifica se a resposta da API indica autenticação bem-sucedida
            const isAuthenticated = data.status === true;

            setIsAuthenticated(isAuthenticated);

            return isAuthenticated;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false; // Se ocorrer um erro, consideramos como falha na autenticação
        }
    };

    const logout = () => {
        
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
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
