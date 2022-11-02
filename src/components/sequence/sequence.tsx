import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq } from '../../slices/sequence-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import './sequence.css';

export const Sequence: React.FC = (): React.ReactElement => {
  const title = useAppSelector(currentTitle);

  return (
    <div className="sequence">
      <div className="sequence-top">
        <div className="section-title" contentEditable="true">
          {title == '' ? 'untitled' : title}
        </div>
        <Buttons />
      </div>
      <Steps />
    </div>
  )
}

export default Sequence;
