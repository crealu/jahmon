import * as React from 'react';
import './menu.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentMenu } from '../../slices/view-slice';

export const MenuSelect: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const changeMenu = (event) => {
    dispatch(setCurrentMenu(event.target.alt));
  }

  const options = useMemo(() => {
    return ['Songs', 'Library']
  }, []);

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
