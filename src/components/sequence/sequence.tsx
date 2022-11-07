import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, setCurrentTitle } from '../../slices/sequence-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import './sequence.css';

export const Sequence: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value));
    console.log(event.target.value);
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <input
          className="section-title"
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="untitled"
        />
        <Buttons />
      </div>
      <Steps />
    </div>
  )
}

export default Sequence;
