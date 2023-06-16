import React, { useState } from 'react';
import './css/Header.css';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <header>
      <div
        className={`header-container ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>
          <span className="vi">Vi</span>
          <span className="simulate">Simulate:</span>{' '}
          <span>A Visual Impairment Simulator</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
