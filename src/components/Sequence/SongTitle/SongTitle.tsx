import * as React from 'react';
import './SongTitle.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theSongTitle, setSongTitle } from '../../../slices/song-slice';

export const SongTitle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songTitle = useAppSelector(theSongTitle);
  const updateTitle = (event) => { dispatch(setSongTitle(event.target.value)) }

  return (
    <div className="title-wrapper">
      <input
        className="song-title"
        onChange={(e) => updateTitle(e)}
        value={songTitle}
        placeholder="untitled"
      />
    </div>
  )
}

export default SongTitle;
