import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { libraryChords } from '../../slices/library-slice';

export const Library: React.FC = (): React.ReactElement => {
  const theChords = useAppSelector(libraryChords);
  const [chords, setChords] = useState(theChords);

  return (
    <div className="library">
      <h3 className="section-title">Library</h3>
      {chords.map(chord => {
        return <div>{chord.name}</div>
      })}
    </div>
  )
}

export default Library;
