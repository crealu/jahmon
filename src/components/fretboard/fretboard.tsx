import * as React from 'react';
import Strings from './strings/strings';
import RiffNums from './riffnums/riffnums';
import Snapshot from './snapshot/snapshot';
import Mode from './mode/mode';
import Buttons from './buttons/buttons';
import './fretboard.css';

export const Fretboard: React.FC = () => {
  return (
    <div className="fretboard">
      <div className="fretboard-top">
        <Snapshot />
        <RiffNums />
      </div>
      <Strings />
      <Mode />
      <Buttons />
    </div>
  )
}

export default Fretboard;
