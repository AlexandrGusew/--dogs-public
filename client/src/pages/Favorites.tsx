import React, { useState, useEffect } from 'react';
import Picture from '../components/Picture';
import { pageContainerStyle, errorTextStyle } from '../styles/commonStyles';
import type { FavoriteItem } from '../types/api';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data: FavoriteItem[] = await response.json();
      setFavorites(data);
      setCurrentIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    if (favorites.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % favorites.length);
    }
  };

  if (loading) {
    return (
      <div style={pageContainerStyle}>
        <h1>Избранное</h1>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageContainerStyle}>
        <h1>Избранное</h1>
        <p style={errorTextStyle}>Ошибка: {error}</p>
        <button onClick={fetchFavorites}>Повторить</button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div style={pageContainerStyle}>
        <h1>Избранное</h1>
        <p>Пока нет избранных картинок. Добавьте картинку через кнопку 👍</p>
      </div>
    );
  }

  const currentFavorite = favorites[currentIndex];

  return (
    <div style={pageContainerStyle}>
      <h1>Избранное</h1>
      <Picture
        src={currentFavorite.imageUrl}
        alt="Избранное"
        maxWidth={800}
        maxHeight={600}
      />
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '20px auto'
      }}>
        <p style={{ fontSize: '18px', fontStyle: 'italic' }}>
          {currentFavorite.comment}
        </p>
      </div>
      <button
        onClick={handleNextImage}
        style={{
          padding: '10px 30px',
          fontSize: '18px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Следующая картинка
      </button>
    </div>
  );
};

export default Favorites;
