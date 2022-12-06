import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { isSettings, toggleSettings } from '../../slices/view-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { refresh } from '../../common/helpers';
import axios from 'axios';
import './settings.css';

export const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useAppSelector(isSettings);
  const closeModal = () => { dispatch(toggleSettings(false)) };
  const [username, setUsername] = useState('');

  const getUsername = () => {
    axios.get('/api-get-username')
      .then(res => { setUsername(res.data) })
      .catch(err => { throw err });
  }

  useEffect(() => { getUsername() }, []);

  return (
    <div className="settings modal" style={{display: settings ? 'block' : 'none'}}>
      <h3 className="username">{username}</h3>
      <a className="logout-btn" href="/logout">Logout</a>
      <button className="close-settings-btn modal-btn" onClick={() => closeModal()}>Close</button>
    </div>
  )
}

export default Settings;
