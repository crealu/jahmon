import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, toggleSave, toggleSettings, currentSeq, theActiveStep, setButtonText } from '../../../slices/sequence-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import './buttons.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const seq = useAppSelector(currentSeq);
  const active = useAppSelector(theActiveStep);
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const saveToLibrary = () => { dispatch(toggleSave(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };

  const handleEnter = (event) => {
    console.log(event.target.alt);
    dispatch(setButtonText(event.target.alt));
  };

  const handleLeave = () => { dispatch(setButtonText('')) };

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  const changeThisStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord'
      ? document.getElementsByClassName('snapshot')[0].textContent
      : 'Riff';
    const step = {
      title: stepTitle,
      mode: mode,
      noteids: noteData[0],
      fretnums: noteData[1]
    };
    if (active == null) {
      dispatch(addStep(step))
    } else {
      dispatch(updateStep({noteids: noteData[0], fretnums: noteData[1]}))
    }
  }


  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn add-step-btn"
        src="img/icons/add-btn-gray.png"
        onClick={() => changeThisStep()}
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
        alt="Remove step"
      />
      <img
        className="sequence-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearSeq()}
        onMouseEnter={(e) => handleEnter(e)}
        onMouseLeave={() => handleLeave()}
        alt="Clear sequence"
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
    </div>
  )
}

export default Buttons;
