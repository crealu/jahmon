import * as React from 'react';
import './Snapshot.css';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector, useKeyPress } from '../../../hooks';
import { theMode, theSnapshot, setSnapshotName } from '../../../slices/fretboard-slice';
import { resetStepName } from '../../../slices/sequence-slice';
import { theChords, theTrueIds } from '../../../slices/library-slice';
import { codifySnapshot } from '../../../common/helpers';

export const Snapshot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const snapshot = useAppSelector(theSnapshot);
  const chords = useAppSelector(theChords);
  const trueIds = useAppSelector(theTrueIds);
  const trueSnapshot = codifySnapshot(snapshot);
  const [snapInput, setSnapInput] = useState('');

  const changeSnapshot = (event) => {
    dispatch(resetStepName(event.target.value));
    dispatch(setSnapshotName(event.target.value))
  }

  const aName = useMemo(() => {
    let name = '';
    trueIds.forEach((id, i) => {
      if (id == trueSnapshot) {
        name = chords[i].name;
        dispatch(setSnapshotName(name));
      }
    });
    return name;
  }, [snapshot])

  return (
    <div
      className="snapshot"
      style={{display: `${mode == 'chord' ? 'block' : 'none'}`}}
    >
      {aName}
    </div>
  )
}
// <input
//   className="snapshot"
//   style={{display: `${mode == 'chord' ? 'block' : 'none'}`}}
//   value={snapshotName != '' ? snapshotName : snapInput}
//   onChange={(e) => changeSnapshot(e)}
// />
// {snapshotName != '' ? '...' : snapshotName}


export default Snapshot
