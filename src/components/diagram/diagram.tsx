import * as React from 'react';
import './Diagram.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';

type DiagramProps = {
  step: object;
  idx: number;
}

export const Diagram: React.FC<DiagramProps> = (props) => {
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

  const filtered = useMemo(() => {
    let theFiltered = [];
    for (let j = 0; j < notes.length; j++) {
      if (notes[j] !== 'x' && notes[j] !== '0') {
        theFiltered.push(parseInt(notes[j]));
      }
    }
    return theFiltered;
  }, [step]);

  const fretStart = useMemo(() => {
    return filtered != '' ? Math.min(...filtered) : null;
  }, [filtered])

  const getClass = useCallback((stringNumber) => {
    return `diagram-fret ${stringNumber == 5 && 'diagram-last-fret'}`;
  }, [])

  return (
    <div className="diagram">
      <div className="diagram-chord-name">{step.title ? step.title : step.name}</div>
      <div className="diagram-muted"></div>
      <div className="diagram-start">{fretStart == null ? '2' : fretStart}</div>
      <div className="diagram-shape">
        {strings.map((string, sn) => {
          return (
            <div className="diagram-string" key={sn}>
              <div className="diagram-top">
                {notes[sn] === 'x' ? <div className="diagram-muted">x</div> : ''}
                {notes[sn] == '0' ? <div className="diagram-open">o</div> : ''}
              </div>
              {frets.map((fret, fn) => {
                return (
                  <div className={getClass(sn)} key={fn}>
                    {notes[sn] - fretStart == fn
                      ? <div className="diagram-note"></div>
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

export default Diagram;
