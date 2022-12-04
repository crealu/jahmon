import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { setRiffen, theMode, theRiffNums } from '../../../slices/fretboard-slice';
import './riffnums.css';

export const Riff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const numbers = useAppSelector(theRiffNums);
  const mode = useAppSelector(theMode);

  const dragStartHandler = (event) => {
    if (event.target.dataset.static) {
      dispatch(setRiffen(event.target.cloneNode(true)));
    } else {
      dispatch(setRiffen(event.target));
    }
    console.log(event.target);
  }

  return (
    <div className="riff-numbers-wrapper"
      style={{opacity: mode == 'chord' ? '0' : '1'}}>
      {numbers.map(number => {
        return (
          <div
            className={`riff-number ${number == 0 ? 'riff-number-0' : ''}`}
            draggable="true"
            data-static="true"
            onDragStart={(e) => dragStartHandler(e)}
          >
            {number}
          </div>
        )
      })}
    </div>
  )
}

export default Riff;
