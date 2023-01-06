import * as React from 'react';
import './library.css';
import Chords from './chords/chords';
import KeyList from './keylist/keylist';

export const Library: React.FC = () => {
  return (
    <div className="library">
      <KeyList />
      <Chords />
    </div>
  )
}

export default Library;
