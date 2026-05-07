import React from 'react';
import '../styles/AuroraBackground.css';

export const AuroraBackground = ({ children, className }) => {
  return (
    <>
      <div className={`aurora-bg-container ${className || ''}`}>
        <div className="aurora-bg-wrapper">
          <div className="aurora-bg-gradient"></div>
        </div>
      </div>
      {children}
    </>
  );
};
