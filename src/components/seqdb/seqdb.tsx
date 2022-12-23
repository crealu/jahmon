import * as React from 'react';
import './seqdb.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence, setIsNew, setActiveStep, setAllSequences, allSequences } from '../../slices/sequence-slice';
import { setSnapshotName } from '../../slices/fretboard-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import { setCurrentScreen } from '../../slices/view-slice';
import { clearFretboard, unstyleActive } from '../../common/helpers';
import NewSeqBtn from './newseq';
import axios from 'axios';

export const SequencesDB: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sequences = useAppSelector(allSequences);

  const changeSequence = (event, steps, lyrics) => {
    const title = event.target.textContent;
    dispatch(setActiveSequence({ title: title, steps: steps}));
    dispatch(updateAllLines(lyrics));
    dispatch(setIsNew(false));
    unstyleActive();
    dispatch(setActiveStep(null));
    dispatch(setSnapshotName(''));
    clearFretboard();
  }

  const changeScreen = (screen) => {
    dispatch(setCurrentScreen(screen));
  }

  const getSongsFromDB = () => {
    axios.get('/api-get-jahms')
      .then(res => {
        dispatch(setAllSequences(res.data));
        localStorage.setItem('songs', JSON.stringify(res.data));
      })
      .catch(err => { throw err });
  }

  const getSongsFromStorage = () => {
    const songs = JSON.parse(localStorage.getItem('songs'));
    dispatch(setAllSequences(songs));
    console.log('got songs from storage');
  }

  useEffect(() => {
    const localSongs = localStorage.getItem('songs');
    if (localSongs == undefined) {
      getSongsFromDB();
    } else {
      getSongsFromStorage();
    }
  }, []);

  return (
    <div className="sequences">
      <div className="db-sequences">
        {sequences.map(sequence => {
          return (
            <div
              onClick={(e) => { changeSequence(e, sequence.steps, sequence.lyrics)}}
              className="db-sequence"
            >
              {sequence.title}
            </div>
          )
        })}
        <NewSeqBtn />
        <button onClick={() => changeScreen('gig')}>GIG</button>
        <button onClick={() => changeScreen('jambook')}>JAMBOOK</button>
      </div>
    </div>
  )
}

export default SequencesDB;
