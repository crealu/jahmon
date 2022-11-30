import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { theMode } from '../../../slices/fretboard-slice';
import { clearFretboard, clearRiffs } from '../../../common/helpers';
import './buttons.css';

export const Mode: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);

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
      <div
        className="fretboard-btn clear-frets-btn"
        onClick={() => { mode == 'chord' ? clearFretboard() : clearRiffs()}}
      >
        Clear
      </div>
      <img
        className="fretboard-trash-btn fretboard-btn"
        src="img/icons/trash-bin-gray.png"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        style={{opacity: mode == 'riff' ? '1' : '0'}}
      />
    </div>
  )
}

export default Mode;
