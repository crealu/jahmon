import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theChords, setLibraryChords, setGrabbed, setChordIds } from '../../slices/library-slice';
import { convertChordIds } from '../../common/helpers';
import axios from 'axios';
import LibChords from './libchords/libchords';
import LibNav from './libnav/libnav';

export const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chords = useAppSelector(theChords);

  const getChordsFromDB = async () => {
    await axios.get('/api-get-lib')
      .then(res => {
        dispatch(setLibraryChords(res.data));
        dispatch(setChordIds(convertChordIds(res.data)));
        localStorage.setItem('chords', JSON.stringify(res.data));
        localStorage.setItem('chordIds', JSON.stringify(convertChordIds(res.data)));
      })
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
    <div className="library">
      <LibNav />
      <LibChords />
    </div>
  )
}

export default Library;
