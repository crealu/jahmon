import * as React from 'react';
import './buttons.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, toggleSave, toggleSettings, currentSeq, theActiveStep, setActionText } from '../../../slices/sequence-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import { Step, Button } from '../../../common/classes';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const seq = useAppSelector(currentSeq);
  const active = useAppSelector(theActiveStep);

  const returnStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord'
      ? document.getElementsByClassName('snapshot')[0].textContent
      : 'Riff';

    return new Step(stepTitle, mode, noteData[0], noteData[1]);
  }

  const addThisStep = () => {
    const step = returnStep();
    dispatch(addStep(step));
  }

  const updateThisStep = () => {
    const step = returnStep();
    dispatch(updateStep({noteids: step.noteData, fretnums: step.fretnums}));
  }

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  const saveThisStep = () => { dispatch(toggleSave(true)) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };
  const clearSeq = () => { dispatch(clearSequence()) };
  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('')) };

  const buttons = useMemo(() => {
    const data = [
      ['add-step-btn', 'add', 'Add step', addThisStep],
      ['delete-btn', 'delete', 'Delete step', deleteThisStep],
      ['', 'update', 'Update step', updateThisStep],
      ['', 'save-step', 'Save step', saveThisStep],
      ['', 'save-seq', 'Save sequence', saveSeq],
      ['', 'settings', 'Settings', openSettings],
      ['clear-btn', 'clear', 'Clear sequence', clearSeq]
    ];
    return data.map(btn => {
      return new Button(btn[0], btn[1], btn[2], btn[3])
    })
  }, [])

  return (
    <div className="sequence-btn-wrapper">
      {buttons.map(btn => {
        return (
          <img
            className={btn.classes}
            src={btn.src}
            alt={btn.action}
            onClick={() => btn.click()}
            onMouseEnter={(e) => handleEnter(e)}
            onMouseLeave={() => handleLeave()}
          />
        )
      })}
    </div>
  )
}

export default Buttons;
