import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { libraryChords } from '../../slices/library-slice';
import { clearFretboard } from '../../common/handlers';

export const Library: React.FC = (): React.ReactElement => {
  const chords = useAppSelector(libraryChords);
  // const [chords, setChords] = useState(theChords);

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

  return (
    <div className="library">
      <h3 className="section-title">Library</h3>
      <div className="lib-chord-wrapper">
        {chords.map(chord => {
          return (
            <div
              className="lib-chord"
              data-noteids={chord.noteids.join(',')}
              onClick={(e) => placeNotes(e)}
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
