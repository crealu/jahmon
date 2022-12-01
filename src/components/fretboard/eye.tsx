import * as React from 'react';
import './fretboard.css';

export const Eye: React.FC = () => {
  const toggleView = () => {
    const fretboard = document.getElementsByClassName('fretboard')[0];
    if (fretboard.style.display == 'block') {
      fretboard.style.display = 'none';
    } else {
      fretboard.style.display = 'block';
    }
  }

  return (
    <div className="toggle-view-btn" onClick={() => toggleView()}>
      <div className="center-circle"></div>
    </div>
  )
}

export default Eye;