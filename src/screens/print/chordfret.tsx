import * as React from 'react';
import './print.css';
import { useCallback } from 'react';

type ChordFret = {
  step: object;
  idx: number;
}

export const ChordFret: React.FC<ChordFret> = (props) => {
  const { step, idx } = props;

  console.log(step);

  const filterNoteIds = (noteid) => {
    let ids = noteid != null
      ? noteid.replaceAll('s', '').replaceAll('f', '').split(',').reverse()
      : '';
    let notes = new Array(6).fill('x');

    for (let i = 0; i < ids.length; i++) {
      let index = parseInt(ids[i][0]) - 1;
      notes[index] = ids[i].replace(ids[i][0], '');
    }

    return notes.join(' ');
  };

  return (
    <div className="basic-snap">
      <div className="basic-snap-title">{step.title}</div>
      <div className="basic-snap-notes">{filterNoteIds(step.noteids)}</div>
    </div>
  )
}

export default ChordFret;
