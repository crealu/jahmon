import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theActiveStep, setActiveStep, setStepName, theStepName } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen, setSnapshotName } from '../../../slices/fretboard-slice';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { clearFretboard, clearRiffs, restyleSteps, unstyleActive } from '../../../common/helpers';
import './seqstep.css';

type SeqStepProps = {
  step: object;
  idx: number;
}

export const SeqStep: React.FC<SeqStepProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const active = useAppSelector(theActiveStep);
  const { step, idx } = props;

  const updateActiveStep = (event) => {
    const step = event.target;
    if (step.tabIndex == active) {
      unstyleActive();
      dispatch(setActiveStep(null));
      dispatch(setStepName(''));
      dispatch(setSnapshotName(''));
      clearFretboard();
      return;
    }
    console.log(step);
    restyleSteps(step);

    dispatch(setMode(step.dataset.mode));
    dispatch(setStepName(step.textContent));
    dispatch(setSnapshotName(step.textContent));
    dispatch(setActiveStep(parseInt(step.tabIndex)));
    showFretNotes(step);
  }

  const dragStartHandler = (event) => {
    const draggedNumber = event.target.cloneNode(true);
    event.dataTransfer.dropEffect = 'copy';
    const chord = {
      title: event.target.textContent,
      noteids: event.target.dataset.noteids
    }
    dispatch(setGrabbed(chord));
    event.target.classList.add('moved-step');
  }

  const dragOverStepHandler = (event) => {
    event.preventDefault();
    const dropPoint = Math.round((event.nativeEvent.x - 30) / 70);
    if (event.target.tabIndex == dropPoint) {
      event.target.borderLeft = '1px solid pink';
    } else if (event.target.tabIndex < dropPoint) {
      event.target.borderRight = '1px solid pink';
    }
  }

  const resetStepNumbers = () => {
    const steps = document.getElementsByClassName('seq-step');
     for (let s = 1; s < steps.length; s++) {
       steps[s].setAttribute('data-stepnum', s);
       steps[s].addEventListener('dragstart', dragStartHandler);
     }
  }

  const dropStepHandler = (event) => {
    event.preventDefault();
    const movedStep = document.getElementsByClassName('moved-step')[0];
    if (event.target.classList[0] == 'seq-step') {
      const dropPoint = Math.round((event.nativeEvent.x - 30) / 70);
      if (event.target.tabIndex == dropPoint) {
        event.target.parentNode.insertBefore(movedStep, event.target);
      } else if (event.target.tabIndex < dropPoint) {
        event.target.insertAdjacentElement('afterend', movedStep);
      }
    } else if (event.target.classList[0] == 'step-wrapper') {
      event.target.appendChild(movedStep);
    }
    resetStepNumbers();
  }

  const resetFretNotes = () => {
    const riffFretNotes = document.getElementsByClassName('riff-note');
    for (let n = 0; n < riffFretNotes.length; n++) {
      riffFretNotes[n].addEventListener('dragstart', (event) => {
        dispatch(setRiffen(event.target));
      });
    }
  }

  const addRiffFromStep = (parent, noteid, fretnum) => {
    const riffNote = document.createElement('div');
    riffNote.classList.add('riff-note');
    riffNote.textContent = fretnum;
    riffNote.draggable = true;
    riffNote.setAttribute('data-noteid', noteid);
    riffNote.addEventListener('dragstart', (event) => {
      dispatch(setRiffen(event.target));
    });
    parent.appendChild(riffNote);
  }

  function showFretNotes(step) {
    clearFretboard();
    clearRiffs();
    const noteIds = step.dataset.noteids.split(',');
    const fretnums = step.dataset.fretnums.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          if (step.dataset.mode == 'riff') {
            addRiffFromStep(fretNotes[fn].parentNode, noteIds[n], fretnums[n]);
          } else {
            fretNotes[fn].style.display = 'block';
          }
        }
      }
    }
    resetFretNotes();
  }

  return (
    <div
      className="seq-step"
      tabIndex={idx}
      data-noteids={step.noteids}
      data-mode={step.mode}
      data-fretnums={step.fretnums}
      draggable="true"
      onClick={(e) => updateActiveStep(e)}
      onDragStart={(e) => dragStartHandler(e)}
      onDragOver={(e) => dragOverStepHandler(e)}
      onDrop={(e) => dropStepHandler(e)}
    >
      {idx == active ? stepName : step.title}
    </div>
  )
}

export default SeqStep;
