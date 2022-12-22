import * as React from 'react';
import './menu.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theMenu } from '../../slices/view-slice';
import Library from '../library/library';
import SequencesDB from '../seqdb/seqdb';
import MenuSelect from './menuselect';

export const Menu: React.FC = () => {
  const menu = useAppSelector(theMenu);

  const returnMenu = useCallback(() => {
    return menu == 'Library' ? <Library />
         : menu == 'Songs' ? <SequencesDB />
         : '';
  }, [menu]);

  return (
    <div className="menu">
      <div className="menu-top">
        <MenuSelect />
        <h3 className="menu-title">{menu}</h3>
      </div>
      <div className="menu-content">
        {returnMenu()}
      </div>
    </div>
  )
}

export default Menu;
