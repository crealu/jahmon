import * as React from 'react';
import './SeqStep.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theActiveStep, setActiveStep, setStepName, theStepName } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen, setSnapshotName, addToSnapshot, clearSnapshot } from '../../../slices/fretboard-slice';
import { setGrabbed } from '../../../slices/library-slice';
import { clearFretboard, clearRiffs, restyleSteps, unstyleActive } from '../../../common/helpers';

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
    event.preventDefault();
    event.stopPropagation();

    const stepTarget = event.target;

    if (stepTarget.tabIndex == active) {
      unstyleActive();
      dispatch(setActiveStep(null));
      dispatch(setStepName(''));
      dispatch(setSnapshotName(''));
      clearFretboard();
      return;
    }

    console.log(stepTarget.textContent);

    restyleSteps(stepTarget);
    dispatch(clearSnapshot());
    dispatch(setMode(stepTarget.dataset.mode));
    dispatch(setStepName(stepTarget.textContent));
    dispatch(setActiveStep(parseInt(stepTarget.tabIndex)));
    dispatch(addToSnapshot(stepTarget.dataset.noteids));
    dispatch(setSnapshotName(stepTarget.textContent));
    showFretNotes(stepTarget);
  }

  const dragStartHandler = (event) => {
    let draggedStep = event.target.cloneNode(true);
    draggedStep.style.backgroundColor = 'green';
    event.dataTransfer.dropEffect = 'copy';
    const chord = {
      title: event.target.textContent,
      noteids: event.target.dataset.noteids
    }
    dispatch(setGrabbed(chord));
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

  const showFretNotes = (stepTarget) => {
    clearFretboard();
    clearRiffs();
    // console.log(step.fretnums, stepTarget.dataset.fretnums);
    const noteIds = stepTarget.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          if (stepTarget.dataset.mode == 'riff') {
            // console.log(stepTarget);
            const fretnums = step.fretnums.split(',');
            addRiffFromStep(fretNotes[fn].parentNode, noteIds[n], fretnums[n]);
          } else {
            fretNotes[fn].style.display = 'block';
          }
        }
      }
    }
  }

  return (
    <div
      className="seq-step"
      draggable="true"
      tabIndex={idx}
      data-noteids={step.noteids}
      data-mode={step.mode}
      data-fretnums={step.fretnums}
      onClick={(e) => updateActiveStep(e)}
      onDragStart={(e) => dragStartHandler(e)}
    >
      {step.title}
    </div>
  )
}

export default SeqStep;
