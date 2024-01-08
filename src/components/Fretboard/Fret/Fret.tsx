import * as React from 'react';
import './Fret.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, theRiffen, setRiffen} from '../../../slices/fretboard-slice';
import { theChords } from '../../../slices/library-slice';
import { checkNoteID } from '../../../common/helpers';
import { Fin } from '../Fin/Fin';

type FretProps = {
  noteid: string;
  placeNote: () => {};
  getsFin: boolean;
}

const Fret: React.FC<FretProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);
  const { noteid, placeNote, getsFin } = props;

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'lightgreen';
      event.target.style.borderRadius = '50%';
      event.target.parentElement.children[0].style.background = 'lightgreen';
    }
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'fret') {
      event.target.style.background = 'none';
      event.target.style.borderRadius = '0%';
      event.target.parentElement.children[0].style.background = 'var(--skel_text_color)';
    }
  }

  const resetFretNotes = () => {
    const riffFretNotes = document.getElementsByClassName('riff-note');
    for (let n = 0; n < riffFretNotes.length; n++) {
      riffFretNotes[n].addEventListener('dragstart', (event) => {
        dispatch(setRiffen(event.target));
      });
    }
  }

  const fretIsAvailable = (target) => {
    return target.classList[0] != 'riff-note' ?
           target.children[1] == undefined ?
           true : false : false;
  }

  const dropHandler = (event) => {
    event.preventDefault();
    if (fretIsAvailable(event.target)) {
      event.target.appendChild(riffen);
      riffen.classList.add('riff-note');
      riffen.classList.remove('riff-number');
      riffen.setAttribute('data-noteid', event.target.children[0].dataset.noteid);
      resetFretNotes();
      dispatch(setRiffen(''))
      event.target.style.background = 'none';
      event.target.style.borderRadius = '0%';
      event.target.parentElement.children[0].style.background = 'var(--skel_text_color)';
    }
  }

  const addFretDetails = (noteID) => {
    if (checkNoteID(noteID)) {
      return noteID == 's3f12'
        ? <div>
            <div className={`fret-circle-12_1 fret-circle`}></div>
            <div className={`fret-circle-12_2 fret-circle`}></div>
          </div>
        : <div className="fret-circle"></div>
    }
  }

  return (
    <div
      className={`fret fret-${mode}`}
      onClick={(e) => placeNote(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e)}
    >
      <div className="fret-note" data-noteid={noteid}></div>
      {mode == 'chord' ? addFretDetails(noteid) : ''}
      {getsFin && <Fin />}
    </div>
  )
}

export default Fret;
