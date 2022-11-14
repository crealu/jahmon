import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { currentSeq, theActiveStep, setActiveStep, addLibChord } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen } from '../../../slices/fretboard-slice';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { clearFretboard, clearRiffs } from '../../../common/handlers';
import './steps.css';
import SeqStep from './seqstep';

export const Steps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const seq = useAppSelector(currentSeq);
  const mode = useAppSelector(theMode);
  const libraryChord = useAppSelector(libChord);

  const dragOverStepHandler = (event) => {
    event.preventDefault();
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'rgba(210, 100, 150, 0.4)';
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'rgba(0, 0, 0, 0.2)';
  }

  const dropHandler = (event) => {
    event.preventDefault();
    if (libraryChord.hasOwnProperty('name')) {
      const newStep = {
        title: libraryChord.name,
        noteids: libraryChord.noteids,
        mode: 'chord',
        fretnums: ''
      }
      dispatch(addLibChord(newStep));
    }
    event.target.style.background = 'rgba(0, 0, 0, 0.2)';
  }

  return (
    <div
      className="steps-wrapper"
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      {seq.map((step, i) => { return <SeqStep step={step} idx={i} /> })}
    </div>
  )
}

export default Steps;
