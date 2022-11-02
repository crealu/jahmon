import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq } from '../../slices/sequence-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import './sequence.css';

const SequenceTitle: React.FC = (): React.ReactElement => {
  const title = useAppSelector(currentTitle);

  return (
    <div
      className="section-title"
      data-isnew="new"
      onClick={() => {console.log(seqState)}}
    >
      {title == '' ? 'untitled' : title}
    </div>
  )
}

export const Sequence: React.FC = (): React.ReactElement => {
  return (
    <div className="sequence">
      <div className="sequence-top">
        <SequenceTitle />
        <Buttons />
      </div>
      <Steps />
    </div>
  )
}

export default Sequence;
