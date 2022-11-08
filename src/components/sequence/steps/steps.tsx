import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { currentSeq, theActiveStep, setActiveStep, addLibChord } from '../../../slices/sequence-slice';
import { theMode, setMode } from '../../../slices/fretboard-slice';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { clearFretboard } from '../../../common/handlers';
import '../sequence.css';

export const Steps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const seq = useAppSelector(currentSeq);
  const activeStep = useAppSelector(theActiveStep);
  const mode = useAppSelector(theMode);
  const libraryChord = useAppSelector(libChord);

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

  const dragStartHandler = (event) => {
    const draggedNumber = event.target.cloneNode(true);
    event.dataTransfer.dropEffect = 'copy';
    const chord = {
      title: event.target.textContent,
      noteids: event.target.dataset.noteids
    }
    dispatch(setGrabbed(chord));
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
              onDragStart={(e) => dragStartHandler(e)}
            >
              {step.title}
            </div>
          )
      })}
    </div>
  )
}

export default Steps;
