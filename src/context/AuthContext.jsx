import React, { createContext, useState, useContext } from 'react';

// Створюємо контекст для авторизації
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Асинхронна функція логіну з імітацією мережевої затримки
  const login = async () => {
    return new Promise((resolve, reject) => {
      // Імітуємо затримку в 1 секунду
      setTimeout(async () => {
        try {
          // Робимо запит для отримання даних користувача
          const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
          
          if (!response.ok) {
            throw new Error(`Помилка отримання даних: ${response.status}`);
          }
          
          const userData = await response.json();
          // Зберігаємо отримані дані в стейт контексту
          setUser(userData);
          resolve(userData);
        } catch (error) {
          reject(error);
        }
      }, 1000); 
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Зручний хук для використання контексту в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
  }
  return context;
};
