import * as React from 'react';
import './buttons.css';

export const Eye: React.FC = () => {
  const toggleView = () => {
    const fretboard = document.getElementsByClassName('fretboard')[0];
    if (fretboard.style.height == '300px') {
      fretboard.style.height = '0px';
    } else {
      fretboard.style.height = '300px';
    }
  }

  return (
    <div className="toggle-view-btn" onClick={() => toggleView()}>
      <div className="center-circle"></div>
    </div>
  )
}

export default Eye;
