import * as React from 'react';
import './savestep.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theChordName, setChordName } from '../../../slices/library-slice';
import { toggleSaveStep } from '../../../slices/view-slice';
import { refresh } from '../../../common/helpers';
import axios from 'axios';

export const SaveStep: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chordName = useAppSelector(theChordName);

  const saveStep = () => {
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
  const hideForm = () => { dispatch(toggleSaveStep(false)) };

  return (
    <div className="step-form-view form-view">
      <div className="step-name-label">Chord name:</div>
      <input className="step-name-input" onChange={(e) => changeChordName(e)}/>
      <div className="save-form-btns">
        <button className="save-btn save-form-btn" onClick={() => saveStep()}>Save</button>
        <button className="cancel-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
    </div>
  )
}

export default SaveStep;
