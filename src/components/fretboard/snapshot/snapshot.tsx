import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, theSnapshot, setSnapshotName, theSnapshotName } from '../../../slices/fretboard-slice';
import { theChords, theChordIds } from '../../../slices/library-slice';
import { codifySnapshot } from '../../../common/helpers';
import './snapshot.css';

export const Snapshot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snapshot = useAppSelector(theSnapshot);
  const mode = useAppSelector(theMode);
  const chords = useAppSelector(theChords);
  const chordIds = useAppSelector(theChordIds);
  const trueSnapshot = codifySnapshot(snapshot);
  const snapshotName = useAppSelector(theSnapshotName);

  const trueIds = chordIds.toString().split(',').map(id => { return parseInt(id) })

  const matchedSnapshot = useMemo(() => {
    let chordName = '';
    trueIds.forEach((id, i) => {
      if (id == trueSnapshot) {
        chordName = chords[i].name;
      }
    });
    dispatch(setSnapshotName(chordName));
  }, [snapshot]);

  return (
    <div
      className="snapshot"
      style={{display: `${mode == 'chord' ? 'block' : 'none'}`}}
    >
      {snapshotName}
    </div>
  )
}

export default Snapshot
