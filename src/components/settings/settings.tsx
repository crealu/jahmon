import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { isSettings, toggleSettings } from '../../slices/view-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { currentTitle, setAllSequences } from '../../slices/sequence-slice';
import { refresh } from '../../common/helpers';
import axios from 'axios';
import './settings.css';

export const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useAppSelector(isSettings);
  const title = useAppSelector(currentTitle);
  const closeModal = () => { dispatch(toggleSettings(false)) };
  const [username, setUsername] = useState('');
  const [deleteResponse, setDeleteResponse] = useState('');

  const getUsername = () => {
    axios.get('/api-get-username')
      .then(res => { setUsername(res.data) })
      .catch(err => { throw err });
  }

  const deleteSeq = () => {
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
        dispatch(setAllSequences(res.data));
        localStorage.setItem('songs', JSON.stringify(res.data));
      })
      .catch(err => { throw err });
  }

  useEffect(() => { getUsername() }, []);

  return (
    <div className="settings modal" style={{display: settings ? 'block' : 'none'}}>
      <h3 className="username">{username}</h3>
      <a className="logout-btn" href="/logout">Logout</a>
      <p>Response: {deleteResponse}</p>
      <button className="delete-seq" onClick={() => deleteSeq()}>Delete Seq</button>
      <button className="close-settings-btn modal-btn" onClick={() => closeModal()}>Close</button>
  </div>
  )
}

export default Settings;
