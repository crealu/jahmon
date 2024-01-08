import * as React from 'react';
import './SaveSong.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theSteps } from '../../../slices/sequence-slice';
import { theSongTitle, newSong, setSongs } from '../../../slices/song-slice';
import { toggleSaveSequence } from '../../../slices/view-slice';
import { lyricLines } from '../../../slices/lyrics-slice';
import axios from 'axios';

export const SaveSong: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(theSongTitle);
  const steps = useAppSelector(theSteps);
  const lyrics = useAppSelector(lyricLines);
  const isNew = useAppSelector(newSong);
  const [saveResponse, setSaveResponse] = useState('');

  const saveSong = useCallback(() => {
    const data = { title: title, steps: steps, lyrics: lyrics }
    const url = isNew ? '/api-save-seq' : '/api-update-seq';
    axios.post(url, data)
      .then(res => { setSaveResponse(res.data) })
      .catch(err => { throw err });
  }, [title, steps, lyrics]);

  const processResponse = useCallback(() => {
    if (saveResponse == 'Save successful') {
      axios.get('/api-get-jahms')
        .then(res => {
          dispatch(setSongs(res.data));
          localStorage.setItem('songs', JSON.stringify(res.data));
        })
        .catch(err => { throw err });
    }
  }, [saveResponse]);

  const cancel = () => {
    setSaveResponse('');
    dispatch(toggleSaveSequence(false))
  };

  useEffect(() => { processResponse() }, [saveResponse]);

  return (
    <div className="seq-form-view form-view">
      <div className="save-confirmation">Save {title} ?</div>
      <div className="save-form-btns">
        <button
          className="save-btn save-form-btn"
          onClick={() => saveSong()}
        >
            Save
        </button>
        <button
          className="cancel-btn save-form-btn"
          onClick={() => cancel()}
        >
          Cancel
        </button>
      </div>
      <div className="save-response">{saveResponse}</div>
    </div>
  )
}

export default SaveSong;
