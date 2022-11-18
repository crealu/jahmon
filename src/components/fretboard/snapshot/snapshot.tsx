import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, theSnapshot } from '../../../slices/fretboard-slice';
import { theChords, theChordIds } from '../../../slices/library-slice';
import './snapshot.css';

export const Snapshot: React.FC = () => {
  const snapshot = useAppSelector(theSnapshot);
  const mode = useAppSelector(theMode);
  const chords = useAppSelector(theChords);
  const chordIds = useAppSelector(theChordIds);
  console.dir(chordIds.toString().split(','));

  const codifySnapshot = () => {
    let arr = [], strArr = [];
    snapshot.forEach(id => {
      arr.push(parseInt(id.replace('s', '').replace('f', '')));
    });
    strArr = arr.sort().map(id => { return id.toString() });
    return parseInt(strArr.join(''))
  }

  const trueSnapshot = codifySnapshot();
  const trueIds = chordIds.toString().split(',').map(id => { return parseInt(id) });

  const matchSnapshot = () => {
    let chordName;
    trueIds.forEach((id, i) => {
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
