import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { libraryChords } from '../../slices/library-slice';

export const Library: React.FC = (): React.ReactElement => {
  const chords = useAppSelector(libraryChords);
  // const [chords, setChords] = useState(theChords);

  return (
    <div className="library">
      <h3 className="section-title">Library</h3>
      <div className="lib-chord-wrapper">
        {chords.map(chord => {
          return (
            <div className="lib-chord">
              {chord.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Library;
