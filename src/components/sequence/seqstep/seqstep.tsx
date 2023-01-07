import * as React from 'react';
import './seqstep.css';
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

    const step = event.target;

    if (step.tabIndex == active) {
      unstyleActive();
      dispatch(setActiveStep(null));
      dispatch(setStepName(''));
      dispatch(setSnapshotName(''));
      clearFretboard();
      return;
    }

    restyleSteps(step);
    dispatch(clearSnapshot());
    dispatch(setMode(step.dataset.mode));
    dispatch(setStepName(step.textContent));
    dispatch(setActiveStep(parseInt(step.tabIndex)));
    dispatch(addToSnapshot(step.dataset.noteids));
    dispatch(setSnapshotName(step.textContent));
    console.log(step.textContent);
    showFretNotes(step);
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

  const showFretNotes = useCallback((step) => {
    clearFretboard();
    clearRiffs();
    const noteIds = step.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          if (step.dataset.mode == 'riff') {
            const fretnums = step.dataset.fretnums.split(',');
            addRiffFromStep(fretNotes[fn].parentNode, noteIds[n], fretnums[n]);
          } else {
            fretNotes[fn].style.display = 'block';
          }
        }
      }
    }
  }, [step])

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
      {idx == active ? stepName : step.title}
    </div>
  )
}

export default SeqStep;
