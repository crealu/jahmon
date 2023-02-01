import * as React from 'react';
import './Fin.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, theRiffen, setRiffen, finIsVisible, setFinCoords, theFinCoords } from '../../../slices/fretboard-slice';
import { theChords } from '../../../slices/library-slice';
import { checkNoteID } from '../../../common/helpers';
import { useKeyPress } from '../../../hooks';

export const Fin :React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const finVisible = useAppSelector(finIsVisible);
  const finCoords = useAppSelector(theFinCoords);

  useKeyPress('ArrowRight', () => {
    let newCoords;
    if (finCoords[1] != 21) {
      newCoords = [finCoords[0], finCoords[1] + 1]
    } else {
      newCoords = finCoords;
    }
    dispatch(setFinCoords(newCoords));
    console.log('right pressed');
  });

  useKeyPress('ArrowLeft', () => {
    let newCoords;
    if (finCoords[1] != 0) {
      newCoords = [finCoords[0], finCoords[1] - 1]
    } else {
      newCoords = finCoords;
    }
    dispatch(setFinCoords(newCoords));
    console.log('left pressed');
  });

  useKeyPress('ArrowUp', () => {
    let newCoords;
    if (finCoords[0] != 0) {
      newCoords = [finCoords[0] - 1, finCoords[1]]
    } else {
      newCoords = finCoords;
    }
    dispatch(setFinCoords(newCoords));
    console.log('right pressed');
  });

  useKeyPress('ArrowDown', () => {
    let newCoords;
    if (finCoords[0] != 5) {
      newCoords = [finCoords[0] + 1, finCoords[1]]
    } else {
      newCoords = finCoords;
    }
    dispatch(setFinCoords(newCoords));
    console.log('right pressed');
  });

  const finStyle = useMemo(() => {
    return { display: `${finVisible ? 'block' : 'none'}` }
  }, [finVisible]);

  return (
    <div className="fin"
      style={finStyle}
    >
    </div>
  )
}

export default Fin;
