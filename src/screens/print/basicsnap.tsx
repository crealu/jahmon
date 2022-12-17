import * as React from 'react';
import './print.css';
import { useCallback } from 'react';

type BasicSnapProps = {
  step: object;
  idx: number;
}

export const BasicSnap: React.FC<BasicSnapProps> = (props) => {
  const { step, idx } = props;

  const filterNoteIds = useCallback((noteid) => {
    let ids = noteid.replaceAll('s', '').replaceAll('f', '').split(',').reverse();
    let notes = new Array(6).fill('x');

    for (let i = 0; i < ids.length; i++) {
      let index = parseInt(ids[i][0]) - 1;
      notes[index] = ids[i].replace(ids[i][0], '');
    }

    return notes.join(' ');
  }, [steps]);

  return (
    <div className="basic-snap">
      <div className="basic-snap-title">{step.title}</div>
      <div className="basic-snap-notes">{filterNoteIds(step.noteids)}</div>
    </div>
  )
}


export default BasicSnap;
