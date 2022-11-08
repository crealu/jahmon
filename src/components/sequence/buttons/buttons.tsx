import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, removeStep, clearSequence, toggleSave } from '../../../slices/sequence-slice';
import '../sequence.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deleteStep = () => { dispatch(removeStep()); }
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const saveToLibrary = () => { dispatch(toggleSave(true)) };

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

  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn add-step-btn"
        src="img/icons/add-btn-gray.png"
        onClick={() => addNewStep()}
      />
      <img
        className="sequence-btn delete-btn"
        src="img/icons/delete-btn-gray.png"
        onClick={() => deleteStep()}
      />
      <img
        className="sequence-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearSeq()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-lib-btn.png"
        onClick={() => saveToLibrary()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-btn-gray.png"
        onClick={() => saveSeq()}
      />
    </div>
  )
}

export default Buttons;
