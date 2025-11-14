import React from 'react';
import AnimalPage from '../components/AnimalPage';
import { fetchCatImage } from '../redux/cat.slice';

const Cat: React.FC = () => {
  return (
    <AnimalPage
      title="Кисы"
      fetchAction={fetchCatImage}
      stateKey="cat"
      maxWidth={640}
      maxHeight={480}
      altText="Кот"
    />
  );
};

export default Cat;
