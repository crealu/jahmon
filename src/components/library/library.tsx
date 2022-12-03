import * as React from 'react';
import './library.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theChords, setLibraryChords, setGrabbed, setChordIds } from '../../slices/library-slice';
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
      <LibNav />
      <LibChords />
    </div>
  )
}

export default Library;
