import * as React from 'react';
import './fretboard.css';

import Frets from './frets/frets';
import Mode from './mode/mode';
import Riff from './riff/riff';
import Buttons from './buttons/buttons';

export const Fretboard: React.FC = (): React.ReactElement => {
  return (
    <div className="fretboard">
      <div className="fretboard-top">
        <h3 className="section-title">Fretboard</h3>
        <Buttons />
        <Mode />
        <div className="seq-step-name"></div>
      </div>
      <Frets />
      <Riff />
    </div>
  )
}

export default Fretboard;
