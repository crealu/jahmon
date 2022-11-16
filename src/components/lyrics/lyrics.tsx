import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { lyricLines, theActiveLine, updateAllLines, addLine, deleteLine } from '../../slices/lyrics-slice';
import axios from 'axios';
import './lyrics.css';
import Line from './line/line';
import Panel from './panel/panel';

export const Lyrics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lines = useAppSelector(lyricLines);
  const active = useAppSelector(theActiveLine);
  const [lineWidth, setLineWidth] = useState(100);

  const addNewLine = () => {
    const newLine = {
      text: '',
      panel: [{
        chord: '',
        offset: ''
      }]
    };
    dispatch(addLine(newLine))
  }

  const deleteThisLine = (event) => {
    console.log(event.target.previousSibling.value)
    dispatch(deleteLine(event.target.previousSibling.value));
  }

  return (
    <div className="lyrics">
      <div className="all-lyrics">
        <img
          className="add-lyric-btn"
          src="img/icons/add-btn-gray.png"
          onClick={() => addNewLine()}
        />
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
              <img
                className={`delete-lyric-btn ${active == i ? 'active-delete-lyric-btn': ''}`}
                src="img/icons/delete-btn-gray.png"
                onClick={(e) => deleteThisLine(e)}
              />
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Lyrics;
