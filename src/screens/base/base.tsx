import * as React from 'react';
import './base.css';
import Sequence from '../../components/sequence/sequence';
import Fretboard from '../../components/fretboard/fretboard';
import Eye from '../../components/fretboard/eye';
import Lyrics from '../../components/lyrics/lyrics';
import Save from '../../components/save/save';
import Settings from '../../components/settings/settings';
import MenuSelect from '../../components/menu/menuselect';
import Menu from '../../components/menu/menu';

export const Base: React.FC = () => {
  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col ui-left">
        <Sequence />
        <Eye />
        <Fretboard />
        <Lyrics />
      </div>
      <div className="jahmon-ui-col ui-right">
        <MenuSelect />
        <Menu />
      </div>
      <Save />
      <Settings />
    </div>
  )
}

export default Base;
