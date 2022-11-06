import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep } from '../../../slices/sequence-slice';
import { libChord } from '../../../slices/library-slice';
import { clearFretboard } from '../../../common/handlers';
import '../fretboard.css';

import axios from 'axios';


export const Buttons: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);

  const addNewStep = () => {
    let fretNotes = document.getElementsByClassName('fret-note');
    let noteids = [];
    for (let n = 0; n < fretNotes.length; n++) {
      if (fretNotes[n].style.display == 'block') {
        noteids.push(fretNotes[n].dataset.noteid);
      }
    }
    const newStep = {
      title: 'N1',
      noteids: noteids,
      mode: 'chord',
      fretnums: ''
    };
    dispatch(addStep(newStep));
  }

  const clearFrets = () => { clearFretboard() };

  const saveToLibrary = () => {
    const data = {
      name: libChord.name,
      noteids: libChord.noteids,
    };
    axios.post('/save-lib', data)
      .then(res => { console.log(res)})
      .catch(err => { throw err });
  }

  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn add-step-btn"
        src="img/icons/add-btn-gray.png"
        onClick={() => addNewStep()}
      />
      <img
        className="sequence-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearFrets()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-btn-gray.png"
        onClick={() => saveToLibrary()}
      />
    </div>
  )
}

export default Buttons;
