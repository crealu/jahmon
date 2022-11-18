import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import {
  setRiffen,
  theRiffen,
  theMode,
  theStrings,
  theFrets,
  theSnapshot,
  addToSnapshot,
  removeFromSnapshot,
} from '../../../slices/fretboard-slice';
import { theChords } from '../../../slices/library-slice';
import './frets.css';

export const Frets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const frets = useAppSelector(theFrets);
  const strings = useAppSelector(theStrings);
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);
  const chords = useAppSelector(theChords);
  const snapshot = useAppSelector(theSnapshot);

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
    if (e.target.children[0]) {
      toggleNote(e.target.children[0]);
    } else if (e.target.classList[0] == 'fret-circle') {
      toggleNote(e.target.previousSibling);
    } else {
      toggleNote(e.target);
    }
  };

  const snap = (element) => {
    if (element.style.display == 'block') {
      dispatch(addToSnapshot(element.dataset.noteid));
    } else {
      dispatch(removeFromSnapshot(element.dataset.noteid));
    }
  }

  const placeRiffNote = (e) => { };

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'lightgreen';
      event.target.style.borderRadius = '50%';
      event.target.parentElement.children[0].style.background = 'lightgreen';
    }
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'none';
      event.target.style.borderRadius = '0%';
      event.target.parentElement.children[0].style.background = 'var(--skel_text_color)';
    }
  }

  const resetFretNotes = () => {
    const riffFretNotes = document.getElementsByClassName('riff-note');
    for (let n = 0; n < riffFretNotes.length; n++) {
      riffFretNotes[n].addEventListener('dragstart', (event) => {
        dispatch(setRiffen(event.target));
      });
    }
  }

  const dropHandler = (event) => {
    event.preventDefault();
    event.target.appendChild(riffen);
    riffen.classList.add('riff-note');
    riffen.classList.remove('riff-number');
    riffen.setAttribute('data-noteid', event.target.children[0].dataset.noteid);
    resetFretNotes();
    dispatch(setRiffen(''))
    event.target.style.background = 'none';
    event.target.style.borderRadius = '0%';
    event.target.parentElement.children[0].style.background = 'var(--skel_text_color)';
  }

  const checkNoteID = (noteID) => {
    const markedFrets = ['3', '5', '7', '9', '12', '15', '17'];
    return markedFrets.some(num => {
      return noteID.includes('s3f' + num) ? true : false;
    });
  }

  const addFretDetails = (noteID) => {
    if (checkNoteID(noteID)) {
      if (noteID == 's3f12') {
        return (
          <div>
            <div className={`fret-circle-12_1 fret-circle`}></div>
            <div className={`fret-circle-12_2 fret-circle`}></div>
          </div>
        )
      } else {
        return <div className="fret-circle"></div>
      }
    }
  }

  return (
    <div className="the-fretboard">
      {strings.map((string, sn) => {
        return (
          <div className={returnStringClass(sn)}>
            <div className="string-div"></div>
            <div className={`fret fret-open-${mode}`} onClick={(e) => placeNote(e)}>
              <div className="fret-note" data-noteid={`s${6-sn}f0`}></div>
            </div>
            {frets.map((fret, fn) => {
              return (
                <div
                  className={`fret fret-${mode}`}
                  onClick={(e) => { mode == 'chord' ? placeNote(e) : placeRiffNote(e)}}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  <div
                    className="fret-note"
                    data-noteid={`s${6-sn}f${fn + 1}`}
                  >
                  </div>
                  {mode == 'chord' ? addFretDetails(`s${6-sn}f${fn + 1}`) : ''}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Frets;
