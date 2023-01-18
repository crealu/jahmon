import * as React from 'react';
import './Sequence.css';
import SequenceTop from './SeqTop/SeqTop';
import Buttons from './Buttons/Buttons';

export const Sequence: React.FC = () => {
  return (
    <div className="sequence">
      <SequenceTop />
      <Buttons />
    </div>
  )
}

export default Sequence;
