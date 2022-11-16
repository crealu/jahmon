import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import {
  currentTitle,
  setCurrentTitle,
  resetStepName,
  theStepName,
} from '../../slices/sequence-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import './sequence.css';

export const Sequence: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);
  const stepName = useAppSelector(theStepName);

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <Buttons />
        <input
          className="sequence-title"
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="untitled"
        />
      </div>
      <Steps />
      <input
        className="step-name"
        onChange={(e) => updateStepName(e)}
        placeholder={stepName}
      />
    </div>
  )
}

export default Sequence;
