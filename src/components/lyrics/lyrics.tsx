import * as React from 'react';
import './lyrics.css';
import Wrapper from './wrapper/wrapper';
import Buttons from './buttons/buttons';

export const Lyrics: React.FC = () => {
  return (
    <div className="lyrics">
      <Buttons />
      <Wrapper />
    </div>
  )
}

export default Lyrics;
