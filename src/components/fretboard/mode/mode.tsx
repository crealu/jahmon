import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { theRiffen, setMode, theMode } from '../../../slices/fretboard-slice';
import './mode.css';

export const Mode = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeMode = useAppSelector(theMode);

  const setFretboardMode = (event) => {
    const mode = event.target.textContent.toLowerCase();
    dispatch(setMode(mode));
  }

  const checkMode = (mode) => { return activeMode == mode ? 'active-mode' : ''; }

  return (
    <div className="mode-wrapper">
      <p className="mode-title mode-toggle">Mode</p>
      <img className="mode-trail mode-toggle" src={`img/icons/mode-trail-${activeMode}.png`}/>
      <div className="mode-btns mode-toggle">
        <div
          className={`mode-btn chord-btn ${checkMode('chord')}`}
          onClick={(e) => setFretboardMode(e)}
        >
          Chord
        </div>
        <div
          className={`mode-btn chord-btn ${checkMode('riff')}`}
          onClick={(e) => setFretboardMode(e)}
        >
          Riff
        </div>
      </div>
    </div>
  )
}

export default Mode;
