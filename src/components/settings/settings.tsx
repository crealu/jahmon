import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { isSettings, toggleSettings } from '../../slices/sequence-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { refresh } from '../../common/handlers';
import axios from 'axios';
import './settings.css';

export const Settings: React.FC = () => {
  const settings = useAppSelector(isSettings);
  return (
    <div className="settings modal" style={{display: settings ? 'block' : 'none'}}>
      
    </div>
  )
}

export default Settings;
