import * as React from 'react';
import './seqtop.css';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { resetStepName, theStepName, currentTitle, setCurrentTitle, setActionText, addStep } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen, theSnapshot, theSnapshotName } from '../../../slices/fretboard-slice';
import { theDiagramNotes, theDiagramName, theDiagramMode } from '../../../slices/library-slice';
import FretSnap from '../../fretsnap/fretsnap';
import Steps from '../steps/steps';
import { Button } from '../../../common/classes';

export const SequenceTop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const title = useAppSelector(currentTitle);
  const snapshot = useAppSelector(theSnapshot);
  const snapshotName = useAppSelector(theSnapshotName);
  const diagramNotes = useAppSelector(theDiagramNotes);
  const diagramName = useAppSelector(theDiagramName);
  const diagramMode = useAppSelector(theDiagramMode);

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

  const returnNewStep = () => {
    // const noteData = diagramMode == 'chord' ? collectChordNotes() : collectRiffNotes();
    // const stepTitle = diagramMode == 'chord' ?
    //   document.getElementsByClassName('snapshot')[0].textContent
    //   : 'Riff';
    return {
      title: diagramName,
      mode: diagramMode,
      noteids: diagramNotes,
      fretnums: ''
    }
  }

  const addThisStep = () => { dispatch(addStep(returnNewStep())) };

  const addButton = useMemo(() => {
    return new Button('add-step-btn', 'add', 'Add chord', addThisStep);
  }, []);

  const diagramData = useMemo(() => {
    return {
      title: diagramNotes[0] != undefined ? diagramName : '...',
      noteids: diagramNotes[0] != undefined ? diagramNotes.join(',') : 's1f0',
      mode: 'chord',
      fretnums: ''
    }
  }, [diagramNotes]);

  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('...')) };

  return (
    <div className="sequence-top">
      <div className="sequence-top-left">
        <input
          className="sequence-title"
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="untitled"
        />
        <Steps />
      </div>
      <div className="chord-view">
        <FretSnap step={diagramData} idx={0} />
        <img
          className={addButton.classes}
          src={addButton.src}
          alt={addButton.action}
          onClick={() => addThisStep()}
          onMouseEnter={(e) => handleEnter(e)}
          onMouseLeave={() => handleLeave()}
        />
      </div>
    </div>
  )
}



export default SequenceTop;
