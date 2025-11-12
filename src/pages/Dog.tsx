import React from 'react';
import Picture from '../components/Picture';
import Buttons from '../components/Buttons';

const Dog: React.FC = () => {
  
  const placeholderImage = 'https://vihthttps://www.google.com/url?sa=i&url=https%3A%2F%2Fshedevrum.ai%2Fpost%2F5d2d80e282f611eea6e7429f31467427%2F&psig=AOvVaw1kFvJmnZ7iWP55dmZ55MiV&ust=1763066022400000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIiWhPO67ZADFQAAAAAdAAAAABAEtps://i.pihttps://i.pinimg.com/originals/a8/00/5e/a8005e7771cf2015cd4c0e809281cde0.pngnhttps://i.pinimg.com/originals/a8/00/5e/a8005e7771cf2015cd4c0e809281cde0.pngimg.com/736x/9e/b3/e8/9eb3e8f90a52768102544471b26563ec.jpghttps://i.ytimg.com/vi/SKq8jTgITvY/maxresdefault.jpga.phttps://i.ytimg.com/vi/SKq8jTgITvY/maxresdefault.jpglaceholder.com/800x600?text=Dog';

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Псы</h1>
      <Picture 
        src={placeholderImage}
        alt="Собака"
        maxWidth={800}
        maxHeight={600}
      />
      <Buttons />
    </div>
  );
};

export default Dog;