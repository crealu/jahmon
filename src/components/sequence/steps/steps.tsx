import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { currentSeq, theActiveStep, setActiveStep } from '../../../slices/sequence-slice';
import { theMode, setMode } from '../../../slices/fretboard-slice';
import { clearFretboard } from '../../../common/handlers';
import '../sequence.css';

export const Steps: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const seq = useAppSelector(currentSeq);
  const activeStep = useAppSelector(theActiveStep);
  const mode = useAppSelector(theMode);

  const updateActiveStep = (event) => {
    const step = event.target;
    restyleSteps(step);
    clearFretboard();
    dispatch(setMode(step.dataset.mode));
    dispatch(setActiveStep(parseInt(step.dataset.stepnum)));
    showFretNotes(step);
  }

  function restyleSteps(step) {
    const steps = document.getElementsByClassName('seq-step');
    for (let s = 0; s < steps.length; s++) {
      steps[s].classList.remove('active-step');
    }
    step.classList.add('active-step');
  }

  function showFretNotes(step) {
    const noteIds = step.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          fretNotes[fn].style.display = 'block';
          if (mode == 'riff') {
            const fretnums = step.dataset.fretnums.split(',');
            const trueFretnums = fretnums.filter((fretnum) => fretnum != '');
          }
        }
      }
    }
  }

  return (
    <div className="steps-wrapper">
      {seq.map((step, i) => {
        return (
            <div
              className="seq-step"
              data-stepnum={i}
              data-noteids={step.noteids}
              data-mode={step.mode}
              data-fretnums={step.fretnums}
              draggable="true"
              onClick={(e) => { updateActiveStep(e)}}
            >
              {step.title}
            </div>
          )
      })}
    </div>
  )
}

export default Steps;
