import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { theChords, setLibraryChords, setGrabbed, setChordIds } from '../../slices/library-slice';
import { theSnapshot } from '../../slices/fretboard-slice';
import { clearFretboard } from '../../common/handlers';
import axios from 'axios';

export const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chords = useAppSelector(theChords);

  const placeNotes = (event) => {
    clearFretboard();
    const noteIds = event.target.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          fretNotes[fn].style.display = 'block';
        }
      }
    }
    // setSnapshot with noteids
    // codify snapshot
  }

  const dragStartHandler = (event) => {
    const draggedNumber = event.target.cloneNode(true);
    event.dataTransfer.dropEffect = 'copy';
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

  const getChordsFromDB = async () => {
    await axios.get('/api-get-lib')
      .then(res => {
        dispatch(setLibraryChords(res.data));
        dispatch(setChordIds(convertChordIds(res.data)));
        localStorage.setItem('chords', JSON.stringify(res.data));
      })
      .catch(err => { throw err });
  }

  const getChordsFromStorage = () => {
    const storageChords = localStorage.getItem('chords').split(',');
    const storageIds = localStorage.getItem('chordIds');
    dispatch(setLibraryChords(storageChords));
    dispatch(setChordIds(storageIds));
  }

  const convertChordIds = (tchords) => {
    let chordIds = [];
    let arr = [], strArr = [];
    tchords.forEach(chord => {
      arr = [];
      chord.noteids.forEach(noteid => {
        arr.push(parseInt(noteid.replace('s', '').replace('f', '')))
      })
      strArr = arr.sort().map(id => { return id.toString() })
      chordIds.push(parseInt(strArr.join('')));
    })
    return chordIds.join(',');
  }

  useEffect(() => {
    getChordsFromDB();
    // dispatch(setLibraryChords(chords));
    // setChordIds();
    // getChordsFromStorage();
    // getChordsFromDB() ;
  }, [])

  return (
    <div className="library">
      <h3 className="section-title library-title">Library</h3>
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
