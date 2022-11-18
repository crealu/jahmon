import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, toggleSave, toggleSettings, currentSeq, theActiveStep } from '../../../slices/sequence-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive } from '../../../common/handlers';
import './buttons.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const seq = useAppSelector(currentSeq);
  const active = useAppSelector(theActiveStep);
  const snapshotName = useAppSelector(theSnapshotName);
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const saveToLibrary = () => { dispatch(toggleSave(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };

  const collectRiffNotes = () => {
    let notes = document.getElementsByClassName('riff-note');
    let noteids = [];
    let fretnums = [];
    for (let n = 0; n < notes.length; n++) {
      noteids.push(notes[n].dataset.noteid);
      fretnums.push(notes[n].textContent);
    }
    return [noteids.join(','), fretnums.join(',')]
  }

  const collectChordNotes = () => {
    let notes = document.getElementsByClassName('fret-note');
    let noteids = [];
    for (let n = 0; n < notes.length; n++) {
      if (notes[n].style.display == 'block') {
        noteids.push(notes[n].dataset.noteid);
      }
    }
    return [noteids.join(','), '']
  }

  const addThisStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord'
      ? document.getElementsByClassName('snapshot')[0].textContent
      : 'R' + steps.length;
    const newStep = {
      title: stepTitle,
      noteids: noteData[0],
      mode: mode,
      fretnums: noteData[1]
    };
    dispatch(addStep(newStep));
  }

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  const updateThisStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    dispatch(updateStep(noteData[0]));
  }

  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn add-step-btn"
        src="img/icons/add-btn-gray.png"
        onClick={() => { active != null ? updateThisStep() : addThisStep()}}
      />
      <img
        className="sequence-btn delete-btn"
        src="img/icons/delete-btn-gray.png"
        onClick={() => deleteThisStep()}
      />
      <img
        className="sequence-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearSeq()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-lib-btn.png"
        onClick={() => saveToLibrary()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-btn-gray.png"
        onClick={() => saveSeq()}
      />
      <img
        className="sequence-btn"
        src="img/icons/settings-btn-gray.png"
        onClick={() => openSettings()}
      />
    </div>
  )
}

export default Buttons;
