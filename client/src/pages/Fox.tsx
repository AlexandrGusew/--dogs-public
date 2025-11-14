import React, { useState, useEffect, useRef } from 'react';
import Picture from '../components/Picture';
import Buttons from '../components/Buttons';
import TypeHere from '../components/TypeHere';
import { addToBlacklist, isInBlacklist } from '../utils/blacklist';
import { pageContainerStyle, errorTextStyle } from '../styles/commonStyles';
import type { FoxApiResponse } from '../types/api';

const Fox: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTypeHere, setShowTypeHere] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchFoxImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://randomfox.ca/floof/');
      if (!response.ok) {
        throw new Error('Failed to fetch fox image');
      }
      const data: FoxApiResponse = await response.json();

      if (isInBlacklist(data.image)) {
        fetchFoxImage();
        return;
      }

      setImageUrl(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchFoxImage();
    }
  }, []);

  const handleLike = () => {
    setShowTypeHere(true);
  };

  const handleNeutral = () => {
    fetchFoxImage();
  };

  const handleDislike = () => {
    if (imageUrl) {
      addToBlacklist(imageUrl);
    }
    fetchFoxImage();
  };

  const handleSaveFavorite = async (comment: string) => {
    if (imageUrl) {
      try {
        await fetch('http://localhost:3001/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl, comment })
        });
        setShowTypeHere(false);
        fetchFoxImage();
      } catch (err) {
        console.error('Failed to save favorite:', err);
      }
    }
  };

  const handleCancel = () => {
    setShowTypeHere(false);
  };

  if (loading) {
    return (
      <div style={pageContainerStyle}>
        <h1>Лисички</h1>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageContainerStyle}>
        <h1>Лисички</h1>
        <p style={errorTextStyle}>Ошибка: {error}</p>
        <button onClick={fetchFoxImage}>Повторить</button>
      </div>
    );
  }

  return (
    <div style={pageContainerStyle}>
      <h1>Лисички</h1>
      {imageUrl && (
        <>
          <Picture
            src={imageUrl}
            alt="Лиса"
            maxWidth={800}
            maxHeight={600}
          />
          {!showTypeHere ? (
            <Buttons
              onLike={handleLike}
              onNeutral={handleNeutral}
              onDislike={handleDislike}
            />
          ) : (
            <TypeHere
              onSave={handleSaveFavorite}
              onCancel={handleCancel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Fox;
