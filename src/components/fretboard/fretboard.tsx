import * as React from 'react';
import './fretboard.css';

import Frets from './frets/frets';
import Mode from './mode/mode';
import Riff from './riff/riff';

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
      <Frets />
      <Riff />
    </div>
  )
}

export default Fretboard;
