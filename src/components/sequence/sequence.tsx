import * as React from 'react';
import './sequence.css';
import SequenceTop from './seqtop/seqtop';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';

export const Sequence: React.FC = () => {
  return (
    <div className="sequence">
      <SequenceTop />
      <Steps />
      <Buttons />
    </div>
  )
}

export default Sequence;
