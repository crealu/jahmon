import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { clearFretboard } from '../../../common/handlers';
import { theMode } from '../../../slices/fretboard-slice';
import './buttons.css';
import axios from 'axios';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const clearFrets = () => { clearFretboard() };
  const dropHandler = (event) => { console.log(event) }

  return (
    <div className="fretboard-btn-wrapper">
      <img
        className="fretboard-trash-btn fretboard-btn"
        src="img/icons/trash-bin-gray.png"
        onDrop={(e) => dropHandler(e)}
        style={{opacity: mode == 'riff' ? '1' : '0'}}
      />
      <img
        className="fretboard-clear-btn fretboard-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearFrets()}
      />
    </div>
  )
}

export default Buttons;
