import * as React from 'react';
import './Fretboard.css';
import Strings from './Strings/Strings';
import RiffNums from './Riffnums/Riffnums';
import Snapshot from './Snapshot/Snapshot';
import Mode from './Mode/Mode';
import Buttons from './Buttons/Buttons';

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
