import * as React from 'react';
import './songs.css';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { allSequences } from '../../../slices/sequence-slice';
import { lyricLines } from '../../../slices/lyrics-slice';
import { setCurrentBook } from '../../../slices/view-slice';
import Diagram from '../../../components/diagram/diagram';
import BasicSnap from '../../print/basicsnap';
import Wrapper from '../../../components/lyrics/wrapper/wrapper';

export const Songs: React.FC = () => {
  const sequences = useAppSelector(allSequences);
  // const dispatch = useDispatch<AppDispatch>();
  const expandSong = (event) => {
    if (event.target.nextSibling.style.display == 'block') {
      event.target.nextSibling.style.display = 'none'
      event.target.nextSibling.nextSibling.style.display = 'none';
    } else {
      event.target.nextSibling.style.display = 'block'
      event.target.nextSibling.nextSibling.style.display = 'block';
    }
  }

  return (
    <div className="jambook-songs">
      {sequences.map(sequence => {
        return (
          <div className="song">
            <h3 className="song-title" onClick={(e) => expandSong(e)}>{sequence.title}</h3>
            <div className="song-steps-wrapper">
              Steps:
              <div className="song-steps">
                {sequence.steps.map((step, idx) => {
                  return (<div>{step.title}</div>)
                })}
              </div>
            </div>
            <div className="song-lyrics-wrapper">
              <div className="song-lyrics">
                {sequence.lyrics.map((lyric) => {
                  return <Wrapper lines={new Array(lyric)} />
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Songs;
