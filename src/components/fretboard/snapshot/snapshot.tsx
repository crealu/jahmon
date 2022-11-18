import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, theSnapshot } from '../../../slices/fretboard-slice';
import { libraryChords, theChordIds } from '../../../slices/library-slice';
import './snapshot.css';

export const Snapshot: React.FC = () => {
  const snapshot = useAppSelector(theSnapshot);
  const chords = useAppSelector(libraryChords);
  const mode = useAppSelector(theMode);
  const chordIds = useAppSelector(theChordIds);

  const codifySnapshot = () => {
    let arr = [], strArr = [];
    snapshot.forEach(id => {
      arr.push(parseInt(id.replace('s', '').replace('f', '')));
    });
    strArr = arr.sort().map(id => { return id.toString() });
    return parseInt(strArr.join(''))
  }

  const trueSnapshot = codifySnapshot();

  const matchSnapshot = () => {
    let chordName;
    chordIds.forEach((id, i) => {
      if (id == trueSnapshot) {
        chordName = chords[i].name;
      }
    })
    return chordName;
  }

  return (
    <div
      className="snapshot"
      style={{display: `${mode == 'chord' ? 'block' : 'none'}`}}
    >
      {matchSnapshot()}
    </div>
  )
}

export default Snapshot
