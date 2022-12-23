import * as React from 'react';
import './buttons.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, deleteStep, updateStep, clearSequence, theActiveStep, setActionText, theAction, toggleFretsnap, seqIsFretsnap } from '../../../slices/sequence-slice';
import { toggleSaveSequence, toggleSaveStep, toggleSettings, setCurrentScreen } from '../../../slices/view-slice';
import { theMode, theRiffen, theSnapshotName } from '../../../slices/fretboard-slice';
import { unstyleActive, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import { Step, Button } from '../../../common/classes';
import Eye from './eye';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);
  const active = useAppSelector(theActiveStep);
  const action = useAppSelector(theAction);
  const snapshotName = useAppSelector(theSnapshotName);
  const fretsnap = useAppSelector(seqIsFretsnap);

  const returnNewStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord' ?
      document.getElementsByClassName('snapshot')[0].textContent
      : 'Riff';
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
  const saveThisStep = () => { dispatch(toggleSaveStep(true)) };
  const saveSeq = () => { dispatch(toggleSaveSequence(true)) };
  const openSettings = () => { dispatch(toggleSettings(true)) };
  const changeStep = () => { dispatch(toggleFretsnap(!fretsnap)) };
  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('')) };
  const setOpacity = () => { return action == '' ? '0' : '1' };
  const openPrintView = () => { dispatch(setCurrentScreen('print')) };

  const buttons = useMemo(() => {
    const data = [
      ['add-step-btn', 'add', 'Add step', addThisStep],
      ['delete-btn', 'delete', 'Delete step', deleteThisStep],
      ['clear-btn', 'clear', 'Clear sequence', clearSeq],
      ['', 'update', 'Update step', updateThisStep],
      // ['', 'save-step', 'Save step', saveThisStep],
      ['', 'save-seq', 'Save sequence', saveSeq],
      ['', 'settings', 'Settings', openSettings],
      // ['', 'fretsnap', 'Toggle fretsnap', changeStep],
      ['print-btn', 'print', 'Print song', openPrintView]
    ];
    return data.map(btn => {
      return new Button(btn[0], btn[1], btn[2], btn[3])
    })
  }, [mode, fretsnap]);

  const dropHandler = (event) => {
    event.preventDefault();
    const movedPanelStep = document.getElementsByClassName('moved-panel-chord')[0];
    if (event.target.classList[0] == 'lyrics-trash-btn') {
      console.log(event.target.parentNode);
      event.target.parentNode.appendChild(movedPanelStep);
      event.target.parentNode.removeChild(movedPanelStep);
    } else {
      event.target.appendChild(movedPanelStep);
      event.target.removeChild(movedPanelStep);
    }
    dispatch(deletePanelStep(movedPanelStep.textContent));
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

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
        <div
          className="sequence-btn"
          onDrop={(e) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
        >
          <img
            className="lyrics-trash-btn"
            src="img/icons/seq-btn-gray/trash.png"
          />
        </div>
        <Eye />
      </div>
      <div className="action-text" style={{opacity: setOpacity()}}>{action}</div>
    </div>
  )
}

export default Buttons;
