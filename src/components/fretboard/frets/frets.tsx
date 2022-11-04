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
    return `string-row ${ sn == 0 ? ' small-e-string' : sn == 5 ? ' big-e-string' : ''}`;
  };

  const toggleNote = (el) => {
    el.style.display = el.style.display == 'block' ? 'none' : 'block';
  };

  const placeNote = (e) => {
    e.target.children[0] ? toggleNote(e.target.children[0]) : toggleNote(e.target);
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

  return (
    <div className="the-fretboard">
      {strings.map((string, sn) => {
        return (
          <div className={returnStringClass(sn)}>
            <div className="string-div"></div>
            <div className="fret-open" data-noteid={`s${6-sn}f0`}></div>
            {frets.map((fret, fn) => {
              return (
                <div
                  className={`fret fret-${mode}`}
                  onClick={(e) => placeNote(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  <div className="fret-note" data-noteid={`s${6-sn}f${fn + 1}`}></div>
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
