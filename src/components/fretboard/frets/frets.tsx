import * as React from 'react';
import { useState, useCallback } from 'react';
import { useAppSelector } from '../../../hooks';
import { theRiffen, theMode } from '../../../slices/fretboard-slice';
import './frets.css';

export const Frets = () => {
  const strings = new Array(6).fill(0);
  const frets = new Array(22).fill(0);
  const riffen = useAppSelector(theRiffen);
  const mode = useAppSelector(theMode);

  const returnStringClass = (sn) => {
    return mode == 'chord'
      ? `string-row ${sn == 0 ? ' small-e-string' : sn == 5 ? ' big-e-string' : ''}`
      : `string-row ${sn == 0 ? ' small-e-riff' : sn == 5 ? ' big-e-riff' : ''}`
  };

  const toggleNote = (element) => {
    element.style.display = element.style.display == 'block' ? 'none' : 'block';
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

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'red';
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'none';
    event.target.children[0].classList.remove('riff-note');
    event.target.children[0].textContent = '';
  }

  const dragStartHandlerFret = (event) => {
    // event.target.textContent = '';
    event.dataTransfer.dropEffect = 'move';
    event.target.background = 'red';
    console.log(event.target);
  }

  const updateFretNote = (fretNote) => {
    fretNote.textContent = riffen;
    fretNote.classList.add('riff-note');
    fretNote.draggable = 'true';
    fretNote.addEventListener('dragstart', (event) => {
      dragStartHandlerFret(event);
    });
  }

  const dropHandler = (event) => {
    event.preventDefault();
    updateFretNote(event.target.children[0]);
    event.target.style.background = 'none';
    console.dir(event.target.children[0]);
    console.log('dropped');
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
        for (let f = 1; f < 3; f++) {
          return (
            <div>
              <div className={`fret-circle-12_1 fret-circle`}></div>
              <div className={`fret-circle-12_2 fret-circle`}></div>
            </div>
          )
        }
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
            <div className="fret fret-open" onClick={(e) => placeNote(e)}>
              <div className="fret-note" data-noteid={`s${6-sn}f0`}></div>
            </div>
            {frets.map((fret, fn) => {
              return (
                <div
                  className={`fret fret-${mode}`}
                  onClick={mode == 'chord' ? (e) => placeNote(e) : null}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  <div className="fret-note" data-noteid={`s${6-sn}f${fn + 1}`}></div>
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
