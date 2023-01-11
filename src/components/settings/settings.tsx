import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { isSettings, toggleSettings } from '../../slices/view-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { setSteps } from '../../slices/sequence-slice';
import { theSongTitle, setSongs } from '../../slices/song-slice';
// import { refresh } from '../../common/helpers';
import axios from 'axios';
import './settings.css';

export const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useAppSelector(isSettings);
  const title = useAppSelector(theSongTitle);
  const [username, setUsername] = useState('');
  const [deleteResponse, setDeleteResponse] = useState('');

  const closeModal = () => { dispatch(toggleSettings(false)) };

  const getUsername = () => {
    axios.get('/api-get-username')
      .then(res => { setUsername(res.data) })
      .catch(err => { throw err });
  }

  const deleteSong = () => {
    axios.post('/api-delete-seq', { title: title })
      .then(res => {
        setDeleteResponse(res.data)
        if (res.data.includes('Deleted')) {
          getSongsFromDB();
        }
      })
      .catch(err => { throw err })
  }

  const getSongsFromDB = () => {
    axios.get('/api-get-jahms')
      .then(res => {
        dispatch(setSongs(res.data));
        localStorage.setItem('songs', JSON.stringify(res.data));
      })
      .catch(err => { throw err });
  }

  const deleteSection = useMemo(() => {
    return (
      <div className="delete-wrapper">
        <button
          className="delete-song-btn settings-btn modal-btn"
          onClick={() => deleteSong()}
        >
          Delete
        </button>
        <p className="song-name">{title}</p>
      </div>
    )
  }, [title]);

  useEffect(() => { getUsername() }, []);

  return (
    <div className="settings modal" style={{display: settings ? 'block' : 'none'}}>
      <div className="settings-top">
        <h2 className="modal-title">Settings</h2>
        <button
          className="close-settings-btn"
          onClick={() => closeModal()}
        >
          x
        </button>
      </div>
      <h3 className="username">{username}</h3>
      { title != '' && deleteSection }
      { username != '' &&
        <a className="logout-btn" href="/logout">Logout</a>
      }
      { deleteResponse != '' &&
        <p className="delete-response">Response: {deleteResponse}</p>
      }
  </div>
  )
}

export default Settings;
