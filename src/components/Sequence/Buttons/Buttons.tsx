import * as React from 'react';
import './Buttons.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, theActiveStep, setActionText, theAction, toggleStepStyle, stepIsDiagram } from '../../../slices/sequence-slice';
import { toggleSaveSequence, toggleSaveStep, toggleSettings, setCurrentScreen } from '../../../slices/view-slice';
import { theMode, theRiffen, theSnapshot, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import { Step, Button } from '../../../common/classes';
import Eye from './Eye';
import Trash from './Trash';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  // const riffen = useAppSelector(theRiffen);
  const active = useAppSelector(theActiveStep);
  const action = useAppSelector(theAction);
  const isDiagram = useAppSelector(stepIsDiagram);
  const snapshotName = useAppSelector(theSnapshotName);
  const snapshot = useAppSelector(theSnapshot);

  const newStep = useMemo(() => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord' ? snapshotName : 'Riff';
    return {
      title: stepTitle,
      mode: mode,
      noteids: noteData[0],
      fretnums: noteData[1]
    }
  }, [snapshot, snapshotName]);

  // const addThisStep = () => { dispatch(addStep(newStep)) };
  const updateThisStep = () => {
    if (active == null) {
      dispatch(setActionText('Please add a step'));
      return;
    }
    console.log(newStep);
    dispatch(updateStep(newStep));
  };

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  const clearSeq = () => { dispatch(clearSequence()) };
  const saveThisStep = () => { dispatch(toggleSaveStep(true)) };
  const saveSeq = () => { dispatch(toggleSaveSequence(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };
  const changeStep = () => { dispatch(toggleFretsnap(!isDiagram)) };
  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('...')) };
  const setOpacity = () => { return action == '...' ? '0' : '1' };
  const openPrintView = () => { dispatch(setCurrentScreen('print')) };

  const buttons = useMemo(() => {
    const data = [
      // ['add-step-btn', 'add', 'Add step', addThisStep],
      ['delete-btn', 'delete', 'Delete step', deleteThisStep],
      ['clear-btn', 'clear', 'Clear sequence', clearSeq],
      ['', 'update', 'Update step', updateThisStep],
      // ['', 'save-step', 'Save step', saveThisStep],
      ['', 'save-seq', 'Save sequence', saveSeq],
      ['', 'settings', 'Settings', openSettings],
      // ['', 'fretsnap', 'Toggle Diagram', changeStep],
      ['print-btn', 'print', 'Print song', openPrintView]
    ];
    return data.map(btn => {
      return new Button(btn[0], btn[1], btn[2], btn[3])
    })
  }, [mode, snapshot, snapshotName]);

  return (
    <div className="sequence-btn-wrapper">
      <div className="sequence-btns-inner">
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
        <Eye />
      </div>
      <div className="action-text" style={{opacity: setOpacity()}}>{action}</div>
    </div>
  )
}

export default Buttons;
