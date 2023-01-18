import * as React from 'react';
import './Strings.css';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theMode, addToSnapshot, removeFromSnapshot } from '../../../slices/fretboard-slice';
import { targetIsDetail } from '../../../common/helpers.ts';
import Fret from '../Fret/Fret';

export const Strings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector(theMode);
  const strings = useMemo(() => { return new Array(6).fill(0) }, []);
  const frets = useMemo(() => { return new Array(22).fill(0) }, []);

  const toggleNote = (element) => {
    if (element.style.display == 'block') {
      element.style.display = 'none';
      dispatch(removeFromSnapshot(element.dataset.noteid));
    } else {
      element.style.display = 'block';
      dispatch(addToSnapshot(element.dataset.noteid));
    }
  }

  const placeNote = (event) => {
    if (mode == 'chord') {
      if (event.target.children[0]) {
        toggleNote(event.target.children[0]);
      } else if (targetIsDetail(event.target)) {
        toggleNote(event.target.parentNode.previousSibling);
      } else {
        toggleNote(event.target);
      }
    }
  };

  const getStringClass = useCallback((sn) => {
    const name = mode == 'chord' ? 'string' : 'riff';
    return `string-row ${sn == 0 ? 'small-e-' : sn == 5 ? 'big-e-' : ''}-e-${name}`;
  }, []);

  return (
    <div className="strings">
      {strings.map((string, sn) => {
        return (
          <div className={getStringClass(sn)}>
            <div className="string-div"></div>
            <div
              className={`fret fret-open-${mode}`}
              onClick={(e) => placeNote(e)}
            >
              <div className="fret-note" data-noteid={`s${6-sn}f0`}></div>
            </div>
            {frets.map((fret, fn) => {
              return (
                <Fret
                  noteid={`s${6-sn}f${fn + 1}`}
                  placeNote={(e) => placeNote(e)}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Strings;
