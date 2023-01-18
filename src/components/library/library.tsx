import * as React from 'react';
import './Library.css';
import Chords from './Chords/Chords';
import KeyList from './Keylist/Keylist';

export const Library: React.FC = () => {
  return (
    <div className="library">
      <KeyList />
      <Chords />
    </div>
  )
}

export default Library;
