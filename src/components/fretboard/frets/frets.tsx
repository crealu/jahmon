import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { moved } from '../../../slices/fretboard-slice';
import '../fretboard.css';

export const Frets = () => {
  const strings = new Array(6).fill(0);
  const frets = new Array(22).fill(0);
  const theMoved = useAppSelector(moved);

  const returnStringClass = (sn) => {
    return `string-row ${ sn == 0 ? ' small-e-string' : sn == 5 ? ' big-e-string' : ''}`;
  }
  
  const toggleNote = (el) => {
    el.style.display = el.style.display == 'block' ? 'none' : 'block';
  }

  const placeNote = (e) => {
    e.target.children[0] ? toggleNote(e.target.children[0]) : toggleNote(e.target);
  }

  // const dragHandler = (e) => {
  //   movedNoteBubble = event.target;
  //   console.dir(event.target.parentElement);
  //   console.dir(movedNoteBubble.parentElement);
  //   event.dataTransfer.dropEffect = 'move';
  //   console.log('drag start');
  // }

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'red';
    }
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'none';
    }
  }

  const dragStartHandlerFret = (event) => {
    event.dataTransfer.dropEffect = 'move';
  }

  const dropHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      // movedNoteBubble.style.background = 'white';
      // movedNoteBubble.style.color = 'var(--skel_text_color)';
      // movedNoteBubble.classList.add('note-bubble-fret');
      // movedNoteBubble.setAttribute('contenteditable', 'false');
      // const newEl = document.createElement('div');
      // newEl.classList.add('note-bubble-fret');
      // event.target.appendChild(newEl);
      event.target.children[0].textContent = theMoved;
      event.target.children[0].style.display = 'block';
      event.target.children[0].style.padding = '4px';
      event.target.children[0].style.background = 'var(--dark-bg)';
      event.target.children[0].draggable = 'true';
      event.target.children[0].addEventListener('dragstart', dragStartHandlerFret)
      event.target.style.background = 'none';
      console.log(event.target);
    }

    // resetFretBubbles();
    console.log('dropped');
  }

  return (
    <div className="the-fretboard">
      {strings.map((string, sn) => {
        return (
          <div className={returnStringClass(sn)} onDrop={(e) => dropHandler(e)}>
            <div className="string-div"></div>
            <div className="fret-open" data-noteid={`s${sn + 1}f0`}>{theMoved}</div>
            {frets.map((fret, fn) => {
              return (
                <div
                  className="fret"
                  onClick={(e) => placeNote(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  <div className="fret-note" data-noteid={`s${sn}f${fn}`}></div>
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
