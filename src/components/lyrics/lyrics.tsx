import * as React from 'react';
import './lyrics.css';
import { useAppSelector } from '../../hooks';
import { lyricLines } from '../../slices/lyrics-slice';
import Wrapper from './wrapper/wrapper';
import AddButton from './buttons/add/addbtn';

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
