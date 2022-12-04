import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import {
  theMode,
  theStrings,
  theFrets,
  theSnapshot,
  addToSnapshot,
  removeFromSnapshot,
  setSnapshotName,
} from '../../../slices/fretboard-slice';
import { theChords, theChordIds } from '../../../slices/library-slice';
import { codifySnapshot } from '../../../common/helpers';
import './strings.css';
import Fret from '../fret/fret';

export const Strings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const frets = useAppSelector(theFrets);
  const strings = useAppSelector(theStrings);
  const mode = useAppSelector(theMode);
  const chords = useAppSelector(theChords);
  const chordIds = useAppSelector(theChordIds);
  const snapshot = useAppSelector(theSnapshot);
  const trueSnapshot = codifySnapshot(snapshot);

  const returnStringClass = (sn) => {
    return mode == 'chord'
      ? `string-row ${sn == 0 ? ' small-e-string' : sn == 5 ? ' big-e-string' : ''}`
      : `string-row ${sn == 0 ? ' small-e-riff' : sn == 5 ? ' big-e-riff' : ''}`
  };

  const toggleNote = (element) => {
    element.style.display = element.style.display == 'block' ? 'none' : 'block';
    snap(element);
  }

  const placeNote = (e) => {
    if (mode == 'chord') {
      if (e.target.children[0]) {
        toggleNote(e.target.children[0]);
      } else if (e.target.classList[0] == 'fret-circle') {
        toggleNote(e.target.previousSibling);
      } else {
        toggleNote(e.target);
      }
    }
  };

  const snap = (element) => {
    if (element.style.display == 'block') {
      dispatch(addToSnapshot(element.dataset.noteid));
    } else {
      dispatch(removeFromSnapshot(element.dataset.noteid));
    }
  }

  return (
    <div className="strings">
      {strings.map((string, sn) => {
        return (
          <div className={returnStringClass(sn)}>
            <div className="string-div"></div>
            <div className={`fret fret-open-${mode}`} onClick={(e) => placeNote(e)}>
              <div className="fret-note" data-noteid={`s${6-sn}f0`}></div>
            </div>
            {frets.map((fret, fn) => {
              return <Fret noteid={`s${6-sn}f${fn + 1}`} placeNote={(e) => placeNote(e)}/>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Strings;
