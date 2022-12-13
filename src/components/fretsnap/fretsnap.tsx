import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import './fretsnap.css';

type FretSnapProps = {
  step: object;
  idx: number;
}

export const FretSnap: React.FC<FretSnapProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const strings = useMemo(() => { return new Array(6).fill(0) }, []);
  const frets = useMemo(() => { return new Array(5).fill(0) }, []);
  const { step, idx } = props;

  const notes = useMemo((noteid) => {
    let ids = step.noteids.replaceAll('s', '').replaceAll('f', '').split(',').reverse();
    let theNotes = new Array(6).fill('x');

    for (let i = 0; i < ids.length; i++) {
      let index = parseInt(ids[i][0]) - 1;
      theNotes[index] = ids[i].replace(ids[i][0], '');
    }

    return theNotes;
  }, [step]);

  console.log(notes[0]);
  let filtered = [];
  for (let j = 0; j < notes.length; j++) {
    if (notes[j] !== 'x') {
      if (notes[j] !== '0') {
        filtered.push(parseInt(notes[j]));
      }
    }
  }

  const fretStart = Math.min(...filtered);

  useEffect(() => {
    console.log(filtered);
    console.log(fretStart);
  }, [])

  return (
    <div className="fret-snap">
      <div className="fs-chord-name">{step.title}</div>
      <div className="fs-muted"></div>
      <div className="fs-start">{fretStart.toString()}</div>
      <div className="fs-shape">
        {strings.map((string, sn) => {
          return (
            <div className="fs-string">
              <div className="fs-top">
                {notes[sn] === 'x' ? <div className="fs-muted">x</div> : ''}
                {notes[sn] == '0' ? <div className="fs-open">o</div> : ''}
              </div>
              {frets.map((fret, fn) => {
                return (
                  <div className="fs-fret">
                    {notes[sn] - fretStart == fn
                      ? <div className="fs-note"></div>
                      : ''
                    }
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// style={{left: `${2 * (sn - 6)}px`}}
export default FretSnap;
