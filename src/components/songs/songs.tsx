import * as React from 'react';
import './songs.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentScreen } from '../../slices/view-slice';
import { setAllSequences, allSequences } from '../../slices/sequence-slice';
import NewSongBtn from './newsongbtn';
import Song from './song';
import axios from 'axios';

export const Songs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songs = useAppSelector(allSequences);

  const changeScreen = (screen) => { dispatch(setCurrentScreen(screen)) }

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
    <div className="songs">
      <div className="db-songs">
        {songs.map(song => { return <Song song={song} /> })}
        <NewSongBtn />
      </div>
    </div>
  )
}

// <button onClick={() => changeScreen('gig')}>GIG</button>
// <button onClick={() => changeScreen('jambook')}>JAMBOOK</button>

export default Songs;
