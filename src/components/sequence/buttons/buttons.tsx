import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
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

class Button {
  constructor(uniqueClass, src, action, click) {
    this.uniqueClass = uniqueClass;
    this.src = 'img/icons/seq-btn-gray/' + src + '.png';
    this.action = action;
    this.handleClick = click;
  }

  click() {
    this.handleClick()
  }
}

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
    return [
      new Button('add-step-btn', 'add', 'Add step', addThisStep),
      new Button('delete-btn', 'delete', 'Delete step', deleteThisStep),
      new Button('', 'update', 'Update step', updateThisStep),
      new Button('', 'save-step', 'Save step', saveThisStep),
      new Button('', 'save-seq', 'Save sequence', saveSeq),
      new Button('', 'settings', 'Settings', openSettings),
      new Button('clear-btn', 'clear', 'Clear sequence', clearSeq)
    ]
  }, [])

  return (
    <div className="sequence-btn-wrapper">
      {buttons.map(btn => {
        return (
          <img
            className={`sequence-btn ${btn.uniqueClass}`}
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
