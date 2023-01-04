import * as React from 'react';
import './seqtop.css';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { resetStepName, theStepName, currentTitle, setCurrentTitle } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen, theSnapshot, theSnapshotName } from '../../../slices/fretboard-slice';
import FretSnap from '../../fretsnap/fretsnap';
import Steps from '../steps/steps';
import { Button } from '../../../common/classes';

export const SequenceTop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stepName = useAppSelector(theStepName);
  const title = useAppSelector(currentTitle);
  const snapshot = useAppSelector(theSnapshot);
  const snapshotName = useAppSelector(theSnapshotName);

  const updateStepName = (event) => {
    dispatch(resetStepName(event.target.value));
  }

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

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

  const addButton = useMemo(() => {
    return new Button('add-step-btn', 'add', 'Add step', addThisStep);
  }, []);

  const stepData = useMemo(() => {
    return {
      title: snapshot[0] != null ? snapshotName : '...',
      noteids: snapshot[0] != null ? snapshot.join(',') : 's1f0,s2f2,s4f0,s5f2',
      mode: 'chord',
      fretnums: ''
    }
  }, [snapshot]);

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
        <FretSnap step={stepData} idx={0} />
        <img
          className={addButton.classes}
          src={addButton.src}
          alt={addButton.action}
          onClick={() => addButton.click()}
          onMouseEnter={(e) => handleEnter(e)}
          onMouseLeave={() => handleLeave()}
        />
      </div>
    </div>
  )
}

export default SequenceTop;
