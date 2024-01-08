import * as React from 'react';
import './Menu.css';
import { useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { theMenu } from '../../slices/view-slice';
import Library from '../Library/Library';
import Songs from '../Songs/Songs';
import MenuSelect from './MenuSelect';

export const Menu: React.FC = () => {
  const menu = useAppSelector(theMenu);

  const returnMenu = useCallback(() => {
    return menu == 'Library' ? <Library />
         : menu == 'Songs'   ? <Songs />
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
