import * as React from 'react';
import './print.css';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, isPrinting, seqIsNew, togglePrint } from '../../slices/sequence-slice';
import { theChordName, setChordName } from '../../slices/library-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { refresh } from '../../common/helpers';
import axios from 'axios';
import Wrapper from '../lyrics/wrapper/wrapper';

export const Print: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);
  const steps = useAppSelector(currentSeq);
  const lyrics = useAppSelector(lyricLines);
  const printing = useAppSelector(isPrinting);
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
  const hideForm = () => { dispatch(togglePrint(false)) };

  return (
    <div className="print-form" style={{display: printing ? 'block' : 'none'}}>
      <div className="seq-form-view form-view">
        <div className="form-data form-label">Sequence:</div>
        <div className="form-data">{title}</div>
        <div className="form-data form-label">Steps:</div>
        <div className=" form-data step-data">
          {steps.map(step => { return <div>{step.title}, </div> })}
        </div>

        <Wrapper />
      </div>
      <div className="save-form-btns-wrapper">
        <button className="save-btn save-form-btn" onClick={() => printSeq()}>Print</button>
        <button className="save-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
    </div>
  )
}

// <div className="form-data form-label">Lyrics:</div>
// <div className="form-data">
//   {lyrics.map(lyric => { return <div>{lyric.text}</div> })}
// </div>

export default Print;
