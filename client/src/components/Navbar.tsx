import React from 'react';
import { Link } from 'react-router-dom';

const navStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderBottom: '2px solid #ddd',
  textAlign: 'center'
};

const linkStyle: React.CSSProperties = {
  margin: '0 15px',
  textDecoration: 'none',
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold'
};

const Navbar: React.FC = () => {
  return (
    <nav style={navStyle}>
      <Link to="/cat" style={linkStyle}>
        Кошечки
      </Link>
      <Link to="/dog" style={linkStyle}>
        Собачки
      </Link>
      <Link to="/fox" style={linkStyle}>
        Лисички
      </Link>
      <Link to="/favorites" style={linkStyle}>
        Избранное
      </Link>
    </nav>
  );
};

export default Navbar;
