import * as React from 'react';
import './saveseq.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theSteps } from '../../../slices/sequence-slice';
import { theSongTitle, newSong, setSongs } from '../../../slices/song-slice';
import { toggleSaveSequence } from '../../../slices/view-slice';
import { lyricLines } from '../../../slices/lyrics-slice';
import { refresh } from '../../../common/helpers';
import axios from 'axios';

export const SaveSeq: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(theSongTitle);
  const steps = useAppSelector(theSteps);
  const lyrics = useAppSelector(lyricLines);
  const isNew = useAppSelector(newSong);
  const [saveRes, setSaveRes] = useState('');

  const saveSeq = () => {
    const data = { title: title, steps: steps, lyrics: lyrics }
    const url = isNew ? '/api-save-seq' : '/api-update-seq';
    axios.post(url, data)
      .then(res => { setSaveRes(res.data) })
      .catch(err => { throw err });
  }

  const processResponse = useCallback(() => {
    if (saveRes == 'Save successful') {
      axios.get('/api-get-jahms')
        .then(res => {
          dispatch(setSongs(res.data));
          localStorage.setItem('songs', JSON.stringify(res.data));
        })
        .catch(err => { throw err });
    }
  }, [saveRes]);

  const hideForm = () => {
    setSaveRes('');
    dispatch(toggleSaveSequence(false))
  };

  useEffect(() => { processResponse() }, [saveRes]);

  return (
    <div className="seq-form-view form-view">
      <div className="seq-form-data form-label">Sequence:</div>
      <div className="seq-form-data">{title}</div>
      <div className="seq-form-data form-label">Steps:</div>
      <div className="seq-form-data step-data">
        {steps.map(step => { return <div>{step.title}, </div> })}
      </div>
      <div className="seq-form-data form-label">Lyrics:</div>
      <div className="seq-form-data">
        {lyrics.map(lyric => { return <div>{lyric.text}</div> })}
      </div>
      <div className="save-form-btns-wrapper">
        <button className="save-btn save-form-btn" onClick={() => saveSeq()}>Save</button>
        <button className="cancel-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
      <div className="save-form-response">
        {saveRes}
      </div>
    </div>
  )
}

export default SaveSeq;
