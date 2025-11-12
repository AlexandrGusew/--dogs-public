import React from 'react';
import Picture from '../components/Picture';
import Buttons from '../components/Buttons';

const Cat: React.FC = () => {
 
  const placeholderImage = 'https://masterpiecer-images.s3.yandex.net/713c9d57662511eeac7c96e999421984:upscaled';

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Кисы</h1>
      <Picture 
        src={placeholderImage}
        alt="Кот"
        maxWidth={640}
        maxHeight={480}
      />
      <Buttons />
    </div>
  );
};

export default Cat;
