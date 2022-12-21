import * as React from 'react';
import './jambook.css';
import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theBook } from '../../slices/view-slice';
import Menu from './menu/menu';
import Songs from './songs/songs';

export const Jambook: React.FC = () => {
  const book = useAppSelector(theBook);

  const renderContent = useCallback(() => {
    return book == 'Songs' ? <Songs />
         : book == 'Sets' ? 'Sets'
         : book == 'Sequences' ? 'Sequences'
         : book == 'Tabs' ? 'Tabs'
         : book == 'Library' ? 'Library'
         : book == 'Settings' ? 'Settings'
         : ''
  }, [book])

  return (
    <div className="jambook">
      <div className="jambook-ui jambook-left">
        <h2 className="current-book-title">{book}</h2>
        <div className="book-wrapper">
          {renderContent()}
        </div>
      </div>
      <div className="jambook-ui jambook-right">
        <Menu />
      </div>
    </div>
  )
}

export default Jambook;
