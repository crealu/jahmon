import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, setCurrentTitle } from '../../slices/sequence-slice';
import Frets from './frets/frets';
import Riff from './riff/riff';
import './fretboard.css';

export const Fretboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);

  const updateTitle = (event) => {
    dispatch(setCurrentTitle(event.target.value))
  }

  return (
    <div className="fretboard">
      <div className="fretboard-top">
        <input
          className="sequence-title"
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="untitled"
        />
        <Riff />
      </div>
      <Frets />
    </div>
  )
}

export default Fretboard;
