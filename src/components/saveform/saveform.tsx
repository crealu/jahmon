import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, isSaving, seqIsNew, toggleSave } from '../../slices/sequence-slice';
import { refresh } from '../../common/handlers';
import axios from 'axios';
import './saveform.css';

export const SaveForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const saving = useAppSelector(isSaving);
  const title = useAppSelector(currentTitle);
  const steps = useAppSelector(currentSeq);
  const isNew = useAppSelector(seqIsNew);
  const [chordName, setChordName] = useState('');

  const saveData = () => { steps.length > 0 ? saveSequence() : saveChord() }

  const saveSequence = () => {
    const data = { title: title, steps: steps }
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
  }

  const changeChordName = (event) => { setChordName(event.target.value); }
  const hideForm = () => { dispatch(toggleSave(false)) };

  return (
    <div className="save-form" style={{display: saving ? 'block' : 'none'}}>
      <div>{title}</div>
      {steps.map(step => {
        return <div>{step.title}</div>
      })}
      <button onClick={() => saveData()}>Save</button>
      <div onClick={() => hideForm()} >X</div>
      <input onInput={(e) => changeChordName(e)}/>
      <div>{chordName}</div>
    </div>
  )
}

export default SaveForm;
