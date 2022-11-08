import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { inputTest, changeSequenceName } from '../../slices/sequence-slice';
import { lyricLines, updateAllLines } from '../../slices/lyrics-slice';
import axios from 'axios';
import './lyrics.css';
import Line from './line/line';
import Panel from './panel/panel';

export const Lyrics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const name = useAppSelector(inputTest);
  const lines = useAppSelector(lyricLines);
  const [lineWidth, setLineWidth] = useState(100);

  return (
    <div className="lyrics">
      <h3 className="section-title">Lyrics</h3>
      <div className="all-lyrics">
        {lines.map((s, i) => {
          return (
            <div className="lyric-wrapper">
              <Panel
                width={lineWidth}
                steps={s.panel}
               />
              <Line
                width={lineWidth}
                setWidth={setLineWidth}
                lineNum={i}
                text={s.text}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Lyrics;
