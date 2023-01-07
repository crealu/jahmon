import * as React from 'react';
import './songs.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentScreen } from '../../slices/view-slice';
import { setSongs, theSongs } from '../../slices/song-slice';
import NewSongBtn from './newsongbtn';
import Song from './song';
import axios from 'axios';

export const Songs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songs = useAppSelector(theSongs);

  const getSongsFromDB = () => {
    axios.get('/api-get-jahms')
      .then(res => {
        dispatch(setSongs(res.data));
        localStorage.setItem('songs', JSON.stringify(res.data));
      })
      .catch(err => { throw err });
  }

  const getSongsFromStorage = () => {
    const localSongs = JSON.parse(localStorage.getItem('songs'));
    dispatch(setSongs(localSongs));
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

// const changeScreen = (screen) => { dispatch(setCurrentScreen(screen)) }
// <button onClick={() => changeScreen('gig')}>GIG</button>
// <button onClick={() => changeScreen('jambook')}>JAMBOOK</button>

export default Songs;
