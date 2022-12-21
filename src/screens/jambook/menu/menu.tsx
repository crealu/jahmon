import * as React from 'react';
import './menu.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { allSequences } from '../../../slices/sequence-slice';
import { lyricLines } from '../../../slices/lyrics-slice';
// import { setCurrentBook } from '../../../slices/view-slice';

export const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const changeBook = (event) => {
    // dispatch(setCurrentBook(event.target.alt));
  }

  const buttons = useMemo(() => {
    return ['Songs', 'Sets', 'Sequences', 'Tabs', 'Library', 'Settings']
  }, []);

  return (
    <div className="jambook-menu">
      <h2 className="jambook-menu-title">Jambook</h2>
      {buttons.map(button => {
        return (
          <div className="jambook-btn">
            <img
              className="jambook-img"
              src={`img/icons/jambook/${button}.png`}
              alt={button}
              onClick={(e) => changeBook(e)}
            />
            <label className="jambook-label">{button}</label>
          </div>
        )
      })}
    </div>
  )
}

export default Menu;
