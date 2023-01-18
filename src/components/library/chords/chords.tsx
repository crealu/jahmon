import * as React from 'react';
import './Chords.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theChords, setLibraryChords, setChordIds } from '../../../slices/library-slice';
import { convertChordIds } from '../../../common/helpers';
import axios from 'axios';
import Chord from '../Chord/Chord';

export const Chords: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chords = useAppSelector(theChords);

  const updateAndCache = (data) => {
    localStorage.setItem('chords', JSON.stringify(data));
    localStorage.setItem('chordIds', JSON.stringify(convertChordIds(data)));
    dispatch(setLibraryChords(data));
    dispatch(setChordIds(convertChordIds(data)));
  }

  const getChordsFromDB = async () => {
    await axios.get('/api-get-lib')
      .then(res => { updateAndCache(res.data) })
      .catch(err => { throw err });
  }

  const getChordsFromStorage = () => {
    const storageChords = JSON.parse(localStorage.getItem('chords'));
    const storageIds = JSON.parse(localStorage.getItem('chordIds'));
    dispatch(setLibraryChords(storageChords));
    dispatch(setChordIds(storageIds));
  }

  useEffect(() => {
    const localChords = localStorage.getItem('chords');
    if (localChords == null) {
      getChordsFromDB();
    } else {
      getChordsFromStorage();
    }
  }, [])

  return (
    <div className="library-chords-wrapper">
      {chords.map(c => { return <Chord chord={c} /> })}
    </div>
  )
}

export default Chords;
