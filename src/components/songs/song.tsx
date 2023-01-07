import * as React from 'react';
import './songs.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setSteps } from '../../slices/sequence-slice';
import { setSongTitle, setIsNew } from '../../slices/song-slice';
import { setSnapshotName } from '../../slices/fretboard-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import { clearFretboard, unstyleActive } from '../../common/helpers';
import NewSongBtn from './newsongbtn';
import axios from 'axios';

type SongProps = {
  song: object;
}

export const Song: React.FC<SongProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { song } = props;

  const changeSong = () => {
    dispatch(setIsNew(false));
    dispatch(setSongTitle(song.title));
    dispatch(setSteps(song.steps));

    // dispatch(setActiveSequence({ title: song.title, steps: song.steps }));
    dispatch(updateAllLines(song.lyrics));
    dispatch(setIsNew(false));
    // dispatch(setActiveStep(null));
    dispatch(setSnapshotName(''));
    unstyleActive();
    clearFretboard();
  }

  return (
    <div className="db-song" onClick={() => { changeSong() }}>
      {song.title}
    </div>
  )
}

export default Song;
