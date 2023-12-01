import * as React from 'react';
import './base.css';
import Sequence from '../../components/Sequence/Sequence';
import Fretboard from '../../components/Fretboard/Fretboard';
import Lyrics from '../../components/Lyrics/Lyrics';
import Save from '../../components/Save/Save';
import Settings from '../../components/Settings/Settings';
import Menu from '../../components/Menu/Menu';

export const Base: React.FC = () => {
  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col ui-left">
        <Sequence />
        <Fretboard />
        <Lyrics />
      </div>
      <div className="jahmon-ui-col ui-right">
        <Menu />
      </div>
      <Save />
      <Settings />
    </div>
  )
}

export default Base;
