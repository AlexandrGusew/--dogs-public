import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Picture from './Picture';
import Buttons from './Buttons';
import TypeHere from './TypeHere';
import { addToBlacklist, isInBlacklist } from '../utils/blacklist';
import { pageContainerStyle, errorTextStyle } from '../styles/commonStyles';
import type { RootState } from '../redux/store';

interface AnimalPageProps {
  title: string;
  fetchAction: any;
  stateKey: 'cat' | 'dog';
  maxWidth: number;
  maxHeight: number;
  altText: string;
}

const AnimalPage: React.FC<AnimalPageProps> = ({
  title,
  fetchAction,
  stateKey,
  maxWidth,
  maxHeight,
  altText
}) => {
  const dispatch = useAppDispatch();
  const { imageUrl, loading, error } = useAppSelector(
    (state: RootState) => state[stateKey]
  );
  const [showTypeHere, setShowTypeHere] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchNewImage = async () => {
    const result = await dispatch(fetchAction());
    if (result.payload && typeof result.payload === 'string') {
      if (isInBlacklist(result.payload)) {
        fetchNewImage();
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchNewImage();
    }
  }, []);

  const handleLike = () => {
    setShowTypeHere(true);
  };

  const handleNeutral = () => {
    fetchNewImage();
  };

  const handleDislike = () => {
    if (imageUrl) {
      addToBlacklist(imageUrl);
    }
    fetchNewImage();
  };

  const handleSaveFavorite = async (comment: string) => {
    if (imageUrl) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl, comment })
        });
        setShowTypeHere(false);
        fetchNewImage();
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
        <h1>{title}</h1>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageContainerStyle}>
        <h1>{title}</h1>
        <p style={errorTextStyle}>Ошибка: {error}</p>
        <button onClick={() => dispatch(fetchAction())}>Повторить</button>
      </div>
    );
  }

  return (
    <div style={pageContainerStyle}>
      <h1>{title}</h1>
      {imageUrl && (
        <>
          <Picture
            src={imageUrl}
            alt={altText}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
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

export default AnimalPage;
