import React from 'react';
import { useFetch } from '../../hooks/useFetch';

// Компонент для відображення картки коктейлю
const CocktailCard = ({ title, body, imageUrl }) => (
  <article 
    className="cocktail-card" 
    style={{ 
      border: '1px solid #e2e8f0', 
      margin: '10px 0', 
      padding: '16px', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    }}
  >
    {imageUrl && (
      <img 
        src={imageUrl} 
        alt={title} 
        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} 
      />
    )}
    <div>
      <h3 style={{ marginTop: 0, color: '#2d3748' }}>{title}</h3>
      <p style={{ color: '#4a5568', lineHeight: 1.5, fontSize: '0.9rem' }}>
        {body ? (body.length > 100 ? `${body.substring(0, 100)}...` : body) : 'Немає опису приготування.'}
      </p>
    </div>
  </article>
);

export const CocktailsList = () => {
  // Використовуємо кастомний хук для отримання коктейлів (наприклад, Маргарити)
  const { data, isLoading, error } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

  // Реалізація "Тріади станів"
  
  if (isLoading) {
    return <div className="loader">Завантаження коктейлів...</div>;
  }

  if (error) {
    return <div className="error-message" style={{ color: 'red' }}>Сталася помилка: {error}</div>;
  }

  const cocktails = data?.drinks || [];

  return (
    <div className="cocktails-list-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Каталог коктейлів</h2>
      <div className="cocktails-list">
        {cocktails.length > 0 ? (
          cocktails.slice(0, 10).map((cocktail) => (
            <CocktailCard 
              key={cocktail.idDrink} 
              title={cocktail.strDrink} 
              body={cocktail.strInstructions} 
              imageUrl={cocktail.strDrinkThumb}
            />
          ))
        ) : (
          <p>Коктейлів не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default CocktailsList;
