import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { clearFretboard, clearRiffs } from '../../../common/handlers';
import { theMode, theRiffen, setRiffen } from '../../../slices/fretboard-slice';
import './buttons.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const riffen = useAppSelector(theRiffen);

  const dropHandler = (event) => {
    event.preventDefault();
    event.target.appendChild(riffen);
    while (event.target.firstChild) {
      event.target.removeChild(event.target.firstChild);
    }
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className="fretboard-btn-wrapper">
      <img
        className="fretboard-trash-btn fretboard-btn"
        src="img/icons/trash-bin-gray.png"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        style={{opacity: mode == 'riff' ? '1' : '0'}}
      />
      <img
        className="fretboard-clear-btn fretboard-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => { mode == 'chord' ? clearFretboard() : clearRiffs()}}
      />
    </div>
  )
}

export default Buttons;
