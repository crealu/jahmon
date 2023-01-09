import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setIsNew, setSongTitle } from '../../slices/song-slice';
import { clearSequence } from '../../slices/sequence-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import { setCurrentMenu, theMenu } from '../../slices/view-slice';
import { animateChange } from '../../common/animate';
import axios from 'axios';
import './songs.css';

export const NewSongBtn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const newLyrics = useMemo(() => {
    return [{ text: '...lyrics...', panel: [{ chord: '', offset: '' }] }]
  }, []);


  const startNewSequence = (event) => {
    animateChange('Library', (title) => { dispatch(setCurrentMenu(title)) });
    dispatch(setSongTitle('untitled'));
    dispatch(clearSequence());
    dispatch(updateAllLines(newLyrics));
    dispatch(setIsNew(true));
  }

  return (
    <div
      className="db-sequence new-seq-btn"
      onClick={(e) => startNewSequence(e)}
    >
      <img
        className="new-seq-btn-img"
        src="img/icons/seq-btn-gray/add.png"
      />
      <p className="new-seq-btn-text">New</p>
    </div>
  )
}

export default NewSongBtn;
