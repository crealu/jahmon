import * as React from 'react';
import './fretboard.css';
import TheFretboard from './thefretboard';
import Mode from './mode';

export const Fretboard: React.FC = (): React.ReactElement => {
  return (
    <div className="fretboard">
      <div className="fretboard-top">
        <h3 className="section-title">Fretboard</h3>
        <div className="sequence-btn-wrapper">
          <img className="sequence-btn add-btn" src="img/icons/add-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
        </div>
        <Mode />
        <div className="seq-step-name"></div>
      </div>
      <TheFretboard />
    </div>
  )
}

export default Fretboard;
