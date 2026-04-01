import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  // Отримуємо значення з контексту авторизації
  const { user, login, logout } = useAuth();
  
  // Локальні стани компонента
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Обробник відправки форми
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login();
    } catch (err) {
      setError(err.message || 'Не вдалося авторизуватися');
    } finally {
      // Знімаємо індикатор завантаження у будь-якому випадку
      setIsLoading(false);
    }
  };

  // Якщо користувач вже авторизований - показуємо його дані
  if (user) {
    return (
      <div className="profile-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Вітаємо в системі!</h2>
        <p><strong>Ім'я:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button 
          onClick={logout}
          style={{ padding: '10px 15px', cursor: 'pointer', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Вийти
        </button>
      </div>
    );
  }

  // Форма входу
  return (
    <div className="login-container" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', maxWidth: '300px' }}>
      <h2>Вхід до системи</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Для простоти лише кнопка авторизації (обхід реальних інпутів за умовами завдання) */}
        
        {error && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '10px', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            background: isLoading ? '#a0aec0' : '#3182ce', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          {isLoading ? 'Завантаження...' : 'Увійти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
