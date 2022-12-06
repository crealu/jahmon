import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, seqIsNew } from '../../slices/sequence-slice';
import { isSavingSeq, toggleSaveSequence, isSavingStep, toggleSaveStep } from '../../slices/view-slice';
import { theChordName, setChordName } from '../../slices/library-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { refresh } from '../../common/helpers';
import axios from 'axios';
import './saveform.css';

export const SaveForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);
  const steps = useAppSelector(currentSeq);
  const lyrics = useAppSelector(lyricLines);
  const savingSeq = useAppSelector(isSavingSeq);
  const savingStep = useAppSelector(isSavingStep);
  const isNew = useAppSelector(seqIsNew);
  const chordName = useAppSelector(theChordName);

  const saveData = () => {
    steps.length > 0 ? saveSequence() : saveChord()
  }

  const saveSequence = () => {
    const data = { title: title, steps: steps, lyrics: lyrics }
    const url = isNew ? '/api-save-seq' : '/api-update-seq';
    axios.post(url, data).then(res => { console.log(res)}).catch(err => { throw err });
  }

  const saveChord = () => {
    let fretNotes = document.getElementsByClassName('fret-note');
    let noteids = [];
    for (let n = 0; n < fretNotes.length; n++) {
      if (fretNotes[n].style.display == 'block') {
        noteids.push(fretNotes[n].dataset.noteid);
      }
    }
    const data = {
      name: chordName,
      noteids: noteids
    };
    axios.post('/api-save-chord', data)
      .then(res => { console.log(res)})
      .catch(err => { throw err });
  };

  const changeChordName = (event) => { dispatch(setChordName(event.target.value)) }
  const hideForm = () => { dispatch(toggleSaveSequence(false)) };

  return (
    <div className="save-form modal" style={{display: savingSeq ? 'block' : 'none'}}>
      {steps.length > 0
        ? <div className="seq-form-view form-view">
            <div className="form-data form-label">Sequence:</div>
            <div className="form-data">{title}</div>
            <div className="form-data form-label">Steps:</div>
            <div className=" form-data step-data">
              {steps.map(step => { return <div>{step.title}, </div> })}
            </div>
            <div className="form-data form-label">Lyrics:</div>
            <div className="form-data">
              {lyrics.map(lyric => { return <div>{lyric.text}</div> })}
            </div>
          </div>
       :  <div className="chord-form-view form-view">
            <div className="chord-name-label">Chord name:</div>
            <input className="chord-name-input" onChange={(e) => changeChordName(e)}/>
          </div>
      }
      <div className="save-form-btns-wrapper">
        <button className="save-btn save-form-btn" onClick={() => saveData()}>Save</button>
        <button className="cancel-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
    </div>
  )
}

export default SaveForm;
