import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addStep, removeStep, clearSequence, toggleSave, currentSeq } from '../../../slices/sequence-slice';
import { theMode } from '../../../slices/fretboard-slice';
import '../sequence.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const seq = useAppSelector(currentSeq);
  const deleteStep = () => { dispatch(removeStep()); }
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };
  const saveToLibrary = () => { dispatch(toggleSave(true)) };

  const collectRiffNotes = () => {
    let notes = document.getElementsByClassName('riff-note');
    let noteids = [];
    let fretnums = [];
    for (let n = 0; n < notes.length; n++) {
      noteids.push(notes[n].dataset.noteid);
      fretnums.push(notes[n].textContent);
    }
    return [noteids.join(','), fretnums.join(',')]
  }

  const collectChordNotes = () => {
    let notes = document.getElementsByClassName('fret-note');
    let noteids = [];
    for (let n = 0; n < notes.length; n++) {
      if (notes[n].style.display == 'block') {
        noteids.push(notes[n].dataset.noteid);
      }
    }
    return [noteids.join(','), '']
  }

  const addNewStep = () => {
    const noteData = mode == 'chord' ? collectChordNotes() : collectRiffNotes();
    const stepTitle = mode == 'chord' ? 'C' : 'R';
    const newStep = {
      title: stepTitle + seq.length,
      noteids: noteData[0],
      mode: mode,
      fretnums: noteData[1]
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
