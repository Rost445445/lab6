import { useState, useEffect } from 'react';

/**
 * Кастомний хук для виконання GET-запитів.
 * @param {string} url - URL-адреса для запиту
 * @returns {{ data: any, isLoading: boolean, error: string | null }}
 */
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Створюємо AbortController для можливості відміни запиту
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Ігноруємо помилку, якщо вона викликана відміною запиту при розмонтуванні
        if (err.name !== 'AbortError') {
          setError(err.message || 'Щось пішло не так при завантаженні даних');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    // Cleanup function: відміняє поточний запит, якщо компонент 
    // буде розмонтовано або зміниться залежність url
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
