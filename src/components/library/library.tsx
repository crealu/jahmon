import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { libraryChords, setLibraryChords, setGrabbed } from '../../slices/library-slice';
import { clearFretboard } from '../../common/handlers';
import axios from 'axios';

export const Library: React.FC = (): React.ReactElement => {
  const chords = useAppSelector(libraryChords);
  const dispatch = useDispatch<AppDispatch>();

  const placeNotes = (event) => {
    clearFretboard();
    const noteIds = event.target.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          fretNotes[fn].style.display = 'block';
          // if (mode == 'riff') {
          //   const fretnums = step.dataset.fretnums.split(',');
          //   const trueFretnums = fretnums.filter((fretnum) => fretnum != '');
          // }
        }
      }
    }
  }

  const dragStartHandler = (event) => {
    const draggedNumber = event.target.cloneNode(true);
    event.dataTransfer.dropEffect = 'copy';
    // console.log(event.target.data.name);
    console.log(event.target.dataset.name);
    const chord = {
      name: event.target.dataset.name,
      noteids: event.target.dataset.noteids
    }
    dispatch(setGrabbed(chord));
  }

  const dragHandler = (event) => {
    event.preventDefault();
  }

  const getChords = () => {
    axios.get('/save-get-lib')
      .then(res => { dispatch(setLibraryChords(res.data)) })
      .catch(err => { throw err });
  }

  return (
    <div className="library" onClick={() => getChords()}>
      <h3 className="section-title">Library</h3>
      <div className="lib-chord-wrapper">
        {chords.map(chord => {
          return (
            <div
              className="lib-chord"
              draggable="true"
              data-name={chord.name}
              data-noteids={chord.noteids.join(',')}
              onClick={(e) => placeNotes(e)}
              onDragStart={(e) => dragStartHandler(e)}
              onDrag={(e) => dragHandler(e)}
            >
              {chord.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Library;
