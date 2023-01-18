import * as React from 'react';
import './Menu.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentMenu, theMenu } from '../../slices/view-slice';
import { animateChange } from '../../common/animate';

export const MenuSelect: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menu = useAppSelector(theMenu);

  const changeMenu = (event) => {
    if (menu != event.target.alt) {
      animateChange(event.target.alt, (title) => {
        dispatch(setCurrentMenu(title));
      });
    }
  }

  const options = useMemo(() => { return ['Songs', 'Library'] }, []);

  return (
    <div className="menu-select">
      {options.map(option => {
        return (
          <div className="menu-img-wrapper">
            <img
              className="menu-img"
              src={`img/icons/jambook/${option.toLowerCase()}.png`}
              alt={option}
              onClick={(e) => changeMenu(e)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MenuSelect;
