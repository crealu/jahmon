import * as React from 'react';
import '../fretboard.css';

export const Mode = () => {
  return (
    <div className="mode-wrapper">
      <p className="mode-title mode-toggle">Mode</p>
      <img className="mode-trail mode-toggle" src="img/icons/mode-trail-chord.png"/>
      <div className="mode-type-wrapper mode-toggle">
        <div className="mode-toggle-btn chord-btn" onClick="">Chord</div>
        <div className="mode-toggle-btn riff-btn">Riff</div>
      </div>
    </div>
  )
}

export default Mode;
