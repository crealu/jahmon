import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, toggleSave, toggleSettings, currentSeq, theActiveStep, setActionText } from '../../../slices/sequence-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import './buttons.css';

class Step {
  constructor(title, mode, noteids, fretnums) {
    this.title = title;
    this.mode = mode;
    this.noteids = noteids;
    this.fretnums = fretnums;
  }
}

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const seq = useAppSelector(currentSeq);
  const active = useAppSelector(theActiveStep);
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const saveToLibrary = () => { dispatch(toggleSave(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };

  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('')) };

  const returnStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord'
      ? document.getElementsByClassName('snapshot')[0].textContent
      : 'Riff';

    return new Step(stepTitle, mode, noteData[0], noteData[1]);
  }

  const addThisStep = () => {
    const step = returnStep();
    dispatch(addStep(step))
  }

  const updateThisStep = () => {
    const step = returnStep();
    dispatch(updateStep({noteids: step.noteData, fretnums: step.fretnums}))
  }

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn add-step-btn"
        src="img/icons/add-btn-gray.png"
        onClick={() => addThisStep()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Add step"
      />
      <img
        className="sequence-btn delete-btn"
        src="img/icons/delete-btn-gray.png"
        onClick={() => deleteThisStep()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Delete step"
      />
      <img
        className="sequence-btn"
        src="img/icons/update-btn-gray.png"
        onClick={() => updateThisStep()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Update step"
      />
      <img
        className="sequence-btn"
        src="img/icons/save-lib-btn.png"
        onClick={() => saveToLibrary()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Save step to library"
      />
      <img
        className="sequence-btn"
        src="img/icons/save-btn-gray.png"
        onClick={() => saveSeq()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Save sequence"
      />
      <img
        className="sequence-btn"
        src="img/icons/settings-btn-gray.png"
        onClick={() => openSettings()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Settings"
      />
      <img
        className="sequence-btn clear-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearSeq()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Clear sequence"
      />
    </div>
  )
}

export default Buttons;
