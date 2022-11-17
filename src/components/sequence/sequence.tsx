import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { resetStepName, theStepName } from '../../slices/sequence-slice';
import { theMode, theRiffen } from '../../slices/fretboard-slice';
import Steps from './steps/steps';
import Buttons from './buttons/buttons';
import Mode from './mode/mode';
import './sequence.css';

export const Sequence: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  const dropHandler = (event) => {
    event.preventDefault();
    event.target.appendChild(riffen);
    while (event.target.firstChild) {
      event.target.removeChild(event.target.firstChild);
    }
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <Buttons />
        <Mode />
        <div className="fretboard-btn-wrapper">
          <div
            className="fretboard-btn clear-frets-btn"
            onClick={() => { mode == 'chord' ? clearFretboard() : clearRiffs()}}
          >
            Clear
          </div>  
          <img
            className="fretboard-trash-btn fretboard-btn"
            src="img/icons/trash-bin-gray.png"
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            style={{opacity: mode == 'riff' ? '1' : '0'}}
          />

        </div>
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
