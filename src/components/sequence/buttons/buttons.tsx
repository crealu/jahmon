import * as React from 'react';
import './buttons.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, toggleSave, toggleSettings, theActiveStep, setActionText, theAction } from '../../../slices/sequence-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import { Step, Button } from '../../../common/classes';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);
  const active = useAppSelector(theActiveStep);
  const action = useAppSelector(theAction);
  const snapshotName = useAppSelector(theSnapshotName);

  const returnNewStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord' ? snapshotName : 'Riff';
    return {
      title: stepTitle,
      mode: mode,
      noteids: noteData[0],
      fretnums: noteData[1]
    }
  }

  const addThisStep = () => { dispatch(addStep(returnNewStep())) };
  const updateThisStep = () => { dispatch(updateStep(returnNewStep())) };

  const deleteThisStep = () => {
    dispatch(deleteStep());
    unstyleActive();
  }

  const clearSeq = () => { dispatch(clearSequence()) };
  const saveThisStep = () => { dispatch(toggleSave(true)) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };
  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('')) };
  const setOpacity = () => { return action == '' ? '0' : '1' }

  const buttons = useMemo(() => {
    const data = [
      ['add-step-btn', 'add', 'Add step', addThisStep],
      ['delete-btn', 'delete', 'Delete step', deleteThisStep],
      ['clear-btn', 'clear', 'Clear sequence', clearSeq],
      ['', 'update', 'Update step', updateThisStep],
      ['', 'save-step', 'Save step', saveThisStep],
      ['', 'save-seq', 'Save sequence', saveSeq],
      ['', 'settings', 'Settings', openSettings]
    ];
    return data.map(btn => {
      return new Button(btn[0], btn[1], btn[2], btn[3])
    })
  }, [mode]);

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
      </div>
      <div className="action-text" style={{opacity: setOpacity()}}>{action}</div>
    </div>
  )
}

export default Buttons;
