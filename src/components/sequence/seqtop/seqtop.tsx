import * as React from 'react';
import './seqtop.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { resetStepName, theStepName, currentTitle, setCurrentTitle } from '../../../slices/sequence-slice';

export const SequenceTop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const title = useAppSelector(currentTitle);

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

  return (
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
  )
}

export default SequenceTop;
