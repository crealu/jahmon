import * as React from 'react';
import './libchords.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theChords, setLibraryChords, setGrabbed, setChordIds } from '../../../slices/library-slice';
import { theSnapshot, addToSnapshot, clearSnapshot, setSnapshotName, setMode } from '../../../slices/fretboard-slice';
import { setActiveStep } from '../../../slices/sequence-slice';
import { clearFretboard, clearRiffs, codifySnapshot, unstyleActive } from '../../../common/helpers';

export const LibChords: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chords = useAppSelector(theChords);

  const placeNotes = (event) => {
    clearRiffs();
    clearFretboard();
    dispatch(setActiveStep(null));
    unstyleActive();
    dispatch(clearSnapshot());
    dispatch(setSnapshotName(event.target.textContent));
    dispatch(setMode('chord'));

    const noteIds = event.target.dataset.noteids.split(',');
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          fretNotes[fn].style.display = 'block';
          dispatch(addToSnapshot(noteIds[n]));
        }
      }
    }
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

  const dragHandler = (event) => { event.preventDefault() }

  return (
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
  )
}

export default LibChords;
