import React from 'react';
import { useFetch } from '../../hooks/useFetch';

// Гіпотетичний компонент для відображення картки одного поста
const PostCard = ({ title, body }) => (
  <article 
    className="post-card" 
    style={{ 
      border: '1px solid #e2e8f0', 
      margin: '10px 0', 
      padding: '16px', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}
  >
    <h3 style={{ marginTop: 0, color: '#2d3748' }}>{title}</h3>
    <p style={{ color: '#4a5568', lineHeight: 1.5 }}>{body}</p>
  </article>
);

export const NewsFeed = () => {
  // Використовуємо кастомний хук для отримання даних
  const { data: posts, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  // Реалізація "Тріади станів"
  
  // 1. Стан завантаження
  if (isLoading) {
    return <div className="loader">Завантаження новин...</div>;
  }

  // 2. Стан помилки
  if (error) {
    return <div className="error-message" style={{ color: 'red' }}>Сталася помилка: {error}</div>;
  }

  // 3. Стан успіху (відображення даних)
  return (
    <div className="news-feed" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Останні новини</h2>
      <div className="posts-list">
        {/* Рендеримо перші 10 постів використовуючи метод slice() */}
        {posts && posts.slice(0, 10).map((post) => (
          <PostCard 
            key={post.id} 
            title={post.title} 
            body={post.body} 
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
