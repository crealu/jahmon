import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { resetStepName, theStepName, theAction, currentTitle, setCurrentTitle } from '../../slices/sequence-slice';
import { theMode, theRiffen } from '../../slices/fretboard-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import './sequence.css';

export const Sequence: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);
  const action = useAppSelector(theAction);
  const title = useAppSelector(currentTitle);

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

  const setOpacity = () => {
    return action == '' ? '0' : '1';
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <input
          className="sequence-title"
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="untitled"
        />
        <input
          className="step-name"
          onChange={(e) => updateStepName(e)}
          placeholder={stepName}
        />
      </div>
      <Steps />
      <Buttons />
      <div className="action-text" style={{opacity: setOpacity()}}>{action}</div>
    </div>
  )
}

export default Sequence;
