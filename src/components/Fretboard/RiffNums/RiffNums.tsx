import * as React from 'react';
import './RiffNums.css';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { setRiffen, theMode } from '../../../slices/fretboard-slice';

export const Riff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  
  const numbers = useMemo(() => {
    return new Array(21).fill(0).map((n, i) => { return i })
  }, []);

  const dragStartHandler = (event) => {
    if (event.target.dataset.static) {
      dispatch(setRiffen(event.target.cloneNode(true)));
    } else {
      dispatch(setRiffen(event.target));
    }
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
