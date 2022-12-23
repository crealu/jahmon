import * as React from 'react';
import './menu.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentMenu, theMenu } from '../../slices/view-slice';

export const MenuSelect: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menu = useAppSelector(theMenu);

  const animateChange = (event) => {
    const title = document.getElementsByClassName('menu-title')[0];
    const content = document.getElementsByClassName('menu-content')[0];
    let i = 0;
    let id = setInterval(frame, 10);
    function frame() {
      i++;
      if (i == 25) {
        title.style.opacity = '0';
        content.style.opacity = '0'
      } else if (i == 75) {
        dispatch(setCurrentMenu(event.target.alt));
        title.style.opacity = '1';
        content.style.opacity = '1';
        clearInterval(id);
      }
    }
  }

  const changeMenu = (event) => {
    if (menu != event.target.alt) {
      animateChange(event);
    }
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
