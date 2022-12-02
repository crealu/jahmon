import * as React from 'react';
import './print.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { currentSeq } from '../../slices/sequence-slice';

export const StepData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const steps = useAppSelector(currentSeq);

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
    <div className="print-steps">
      {steps.map(step => {
        return (
          <div className="print-steps-row">
            <div className="print-steps-left">{step.title}</div>
            <div className="print-steps-right">{filterNoteIds(step.noteids)}</div>
          </div>
        )
      })}
    </div>
  )
}


export default StepData;
