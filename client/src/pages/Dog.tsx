import React from 'react';
import AnimalPage from '../components/AnimalPage';
import { fetchDogImage } from '../redux/dog.slice';

const Dog: React.FC = () => {
  return (
    <AnimalPage
      title="Псы"
      fetchAction={fetchDogImage}
      stateKey="dog"
      maxWidth={800}
      maxHeight={600}
      altText="Собака"
    />
  );
};

export default Dog;
