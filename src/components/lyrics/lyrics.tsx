import * as React from 'react';
import './Lyrics.css';
import { useAppSelector } from '../../hooks';
import { lyricLines } from '../../slices/lyrics-slice';
import Wrapper from './Wrapper/Wrapper';
import AddButton from './Buttons/Add/AddBtn';

export const Lyrics: React.FC = () => {
  const lines = useAppSelector(lyricLines);

  return (
    <div className="lyrics">
      <Wrapper lines={lines}/>
      <AddButton />
    </div>
  )
}

export default Lyrics;
