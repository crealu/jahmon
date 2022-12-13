import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { currentSeq, theActiveStep, setActiveStep, addStep, seqIsFretsnap } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen } from '../../../slices/fretboard-slice';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { clearFretboard, clearRiffs } from '../../../common/helpers';
import './steps.css';
import SeqStep from '../seqstep/seqstep';
import FretSnap from '../../fretsnap/fretsnap';

export const Steps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const seq = useAppSelector(currentSeq);
  const mode = useAppSelector(theMode);
  const libraryChord = useAppSelector(libChord);
  const fretsnap = useAppSelector(seqIsFretsnap);

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'steps-wrapper') {
      event.target.style.background = 'rgba(210, 100, 150, 0.4)';
    } else {
      event.target.style.border = '1px solid pink';
    }
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'steps-wrapper') {
      event.target.style.background = 'none';
    } else {
      event.target.style.border = '1px solid var(--skel_text_color)';
    }
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
      dispatch(addStep(newStep));
    }
    event.target.style.background = 'none';
  }

  const scrollSteps = (event) => {
    if (event.deltaY > 0) {
      event.target.parentNode.parentNode.scrollLeft += 40;
    } else {
      event.target.parentNode.parentNode.scrollLeft -= 40;
    }
  }

  const returnSeqStep = () => {
    return seq.map((step, i) => { return <SeqStep step={step} idx={i} /> })
  }

  const returnFretSnap = () => {
    return seq.map((step, i) => { return <FretSnap step={step} idx={i} /> })
  }

  return (
    <div
      className="steps"
      onWheel={(e) => scrollSteps(e)}
      style={{
        height: `${fretsnap ? '150px' : '80px'}`,
      }}
    >
      <div
        className="steps-wrapper"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        style={{
          height: `${fretsnap ? '150px' : '80px'}`,
          width: `${seq.length > 8 ? seq.length * 100 + 'px' : '100%'}`
        }}
      >
        {fretsnap ? returnFretSnap() : returnSeqStep()}
      </div>
    </div>
  )
}

export default Steps;
