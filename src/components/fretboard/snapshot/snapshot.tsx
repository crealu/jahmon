import * as React from 'react';
import './Snapshot.css';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector, useKeyPress } from '../../../hooks';
import { theMode, theSnapshot, setSnapshotName } from '../../../slices/fretboard-slice';
import { resetStepName } from '../../../slices/sequence-slice';
import { theChords, theTrueIds } from '../../../slices/library-slice';
import { codifySnapshot, collectChordNotes, collectRiffNotes } from '../../../common/helpers';
import { addStep } from '../../../slices/sequence-slice';

export const Snapshot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const snapshot = useAppSelector(theSnapshot);
  const chords = useAppSelector(theChords);
  const trueIds = useAppSelector(theTrueIds);
  const trueSnapshot = codifySnapshot(snapshot);
  const [snapInput, setSnapInput] = useState('');

  const newStep = () => {
    let noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    return {
      title: snapInput,
      noteids: noteData[0],
      mode: mode,
      fretnums: noteData[1]
    }
  };

  const addThisStep = () => {
    let theNewStep = newStep();
    dispatch(addStep(theNewStep))
  };

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
    <div className="snapshot-wrapper">
      <div className="fb-add-btn-wrapper">
        <img
          className="fb-add-btn"
          src="img/icons/seq-btn-gray/add.png"
          onClick={() => addThisStep()}
        />
      </div>
      <input
        className="snapshot"
        value={aName == '' ? snapInput : aName}
        onChange={(e) => setSnapInput(e.target.value)}
      />
    </div>
  )
}

// // {snapshotName != '' ? '...' : snapshotName}
// <div
//   className="snapshot"
//   style={{display: `${mode == 'chord' ? 'block' : 'none'}`}}
//   onChange={(e) => changeSnapshot(e)}
// >
//   {aName}
//   <img class="fb-add-btn" src="img/icons/seq-btn-gray/add.png" />
// </div>

export default Snapshot
