import * as React from 'react';
import './gig.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { allSequences } from '../../slices/sequence-slice.ts';
import { lyricLines } from '../../slices/lyrics-slice.ts';
import FretSnap from '../../components/fretsnap/fretsnap';
import BasicSnap from '../print/basicsnap';
import Wrapper from '../../components/lyrics/wrapper/wrapper';

export const Gig: React.FC = () => {
  const sequences = useAppSelector(allSequences);
  // const lines = useAppSelector(lyricLines);
  console.log(sequences);

  return (
    <div className="gig">
      {sequences.map(sequence => {
        return (
          <div className="gig-sequence">
            <h3 className="gig-sequence-title">{sequence.title}</h3>
            <div className="gig-seq-steps-wrapper">
              <div className="gig-sequence-steps">
                {sequence.steps.map((step, idx) => {
                  return <BasicSnap step={step} idx={idx} />
                })}
              </div>
            </div>
            <div className="gig-seq-lyrics-wrapper">
              <div className="gig-sequence-lyrics">
                {sequence.lyrics.map((lyric) => {
                  return <Wrapper lines={new Array(lyric)} />
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// {sequence.lyrics.map((lines, idx) => {
//   return <Wrapper lines={lines} />
// })}

export default Gig;
