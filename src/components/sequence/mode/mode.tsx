import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setMode, theMode } from '../../../slices/fretboard-slice';
import { clearFretboard, toggleRiffs } from '../../../common/handlers';
import './mode.css';

export const Mode = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);

  const setFretboardMode = (event) => {
    const newMode = event.target.textContent.toLowerCase();
    dispatch(setMode(newMode));
    if (newMode == 'riff') {
      clearFretboard();
      toggleRiffs('block');
    } else {
      toggleRiffs('none');
    }
  }

  const checkMode = (activeMode) => { return activeMode == mode ? 'active-mode' : ''; }

  return (
    <div className="mode-wrapper">
      <p className="mode-title mode-toggle">Mode</p>
      <img className="mode-trail mode-toggle" src={`img/icons/mode-trail-${mode}.png`}/>
      <div className="mode-btns mode-toggle">
        <div
          className={`mode-btn ${checkMode('chord')}`}
          onClick={(e) => setFretboardMode(e)}
        >
          Chord
        </div>
        <div
          className={`mode-btn ${checkMode('riff')}`}
          onClick={(e) => setFretboardMode(e)}
        >
          Riff
        </div>
      </div>
    </div>
  )
}

export default Mode;
