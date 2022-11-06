import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { setRiffen, theMode } from '../../../slices/fretboard-slice';
import './riff.css';

export const Riff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const numbers = new Array(17).fill(0).map((n, i) => { return i });
  const mode = useAppSelector(theMode);

  const dragStartHandler = (event) => {
    const draggedNumber = event.target.cloneNode(true);
    event.dataTransfer.dropEffect = 'copy';
    dispatch(setRiffen(event.target.textContent));
  }

  const dragHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className="riff-numbers-wrapper"
      style={{opacity: mode == 'chord' ? '0' : '1'}}>
      {numbers.map(number => {
        return (
          <div
            className="riff-number"
            draggable="true"
            onDragStart={(e) => dragStartHandler(e)}
            onDrag={(e) => dragHandler(e)}
          >
            {number}
          </div>
        )
      })}
    </div>
  )
}

export default Riff;
