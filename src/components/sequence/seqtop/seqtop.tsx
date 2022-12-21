import * as React from 'react';
import './seqtop.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { resetStepName, theStepName, currentTitle, setCurrentTitle } from '../../../slices/sequence-slice';
import { theMode, setMode, setRiffen, theSnapshot, theSnapshotName } from '../../../slices/fretboard-slice';
import FretSnap from '../../fretsnap/fretsnap';
import Steps from '../steps/steps';

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
        {console.log(snapshot)}
        {snapshot[0] != null &&
          <FretSnap step={{
            title: snapshotName,
            noteids: snapshot.join(','),
            mode: 'chord',
            fretnums: ''
          }} idx={0} />
        }
      </div>
    </div>
  )
}

export default SequenceTop;
