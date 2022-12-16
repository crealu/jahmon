import * as React from 'react';
import './gig.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { allSequences } from '../../slices/sequence-slice.ts'

export const Gig: React.FC = () => {
  const sequences = useAppSelector(allSequences);
  console.log(sequences);

  return (
    <div className="gig">
      {sequences.map(sequence => {
        return (
          <div>
            <h3 className="gig-sequence-title">{sequence.title}</h3>
          </div>
        )
      })}
      Gig screen
    </div>
  )
}

export default Gig;
