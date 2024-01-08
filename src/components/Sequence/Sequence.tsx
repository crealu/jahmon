import * as React from 'react';
import './Sequence.css';
import SequenceTop from './SeqTop/SeqTop';
import Buttons from './Buttons/Buttons';
import SongTitle from './SongTitle/SongTitle';

export const Sequence: React.FC = () => {
  return (
    <div className="sequence">
      <SongTitle />
      <SequenceTop />
      <Buttons />
    </div>
  )
}

export default Sequence;
