import React from 'react';

interface ButtonsProps {
  onLike?: () => void;
  onNeutral?: () => void;
  onDislike?: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ 
  onLike, 
  onNeutral, 
  onDislike 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '10px',
      marginTop: '10px'
    }}>
      <button 
        onClick={onLike}
        style={{ 
          fontSize: '24px', 
          padding: '10px 20px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent'
        }}
      >
        👍
      </button>
      <button 
        onClick={onNeutral}
        style={{ 
          fontSize: '24px', 
          padding: '10px 20px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent'
        }}
      >
        😐
      </button>
      <button 
        onClick={onDislike}
        style={{ 
          fontSize: '24px', 
          padding: '10px 20px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent'
        }}
      >
        👎
      </button>
    </div>
  );
};

export default Buttons;