import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import {
  lyricLines,
  theActiveLine,
  updateAllLines,
  addLine,
  deleteLine,
  deletePanelStep,
} from '../../slices/lyrics-slice';
import { theRiffen } from '../../slices/fretboard-slice';
import axios from 'axios';
import './lyrics.css';
import Line from './line/line';
import Panel from './panel/panel';

export const Lyrics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lines = useAppSelector(lyricLines);
  const active = useAppSelector(theActiveLine);
  const riffen = useAppSelector(theRiffen);
  const [lineWidth, setLineWidth] = useState(100);

  const addNewLine = () => {
    const newLine = {
      text: '...',
      panel: [{ chord: '', offset: ''}]
    };
    dispatch(addLine(newLine))
  }

  const deleteThisLine = (event) => {
    console.log(event.target.previousSibling.value)
    dispatch(deleteLine(event.target.previousSibling.value));
  }

  const dropHandler = (event) => {
    event.preventDefault();
    const movedPanelStep = document.getElementsByClassName('moved-panel-chord')[0];
    if (event.target.classList[0] == 'lyrics-trash-btn') {
      console.log(event.target.parentNode);
      event.target.parentNode.appendChild(movedPanelStep);
      while (event.target.parentNode.children[1]) {
        event.target.parentNode.removeChild(event.target.parentNode.children[1]);
      }
    } else {
      event.target.appendChild(movedPanelStep);
      while (event.target.children[1]) {
        event.target.removeChild(event.target.children[1]);
      }
    }
    // dispatch(deletePanelStep(movedPanelStep.textContent));
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className="lyrics">
      <div className="lyrics-btns-wrapper">
        <img
          className="add-lyric-btn lyrics-btn"
          src="img/icons/add-btn-gray.png"
          onClick={() => addNewLine()}
        />
        <div
          className="trash-wrapper lyrics-btn"
          onDrop={(e) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
        >
          <img
            className="lyrics-trash-btn"
            src="img/icons/trash-bin-gray.png"
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          />
        </div>
      </div>
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
              className={`delete-lyric-btn lyrics-btn ${active == i ? 'active-delete-lyric-btn': ''}`}
              src="img/icons/delete-btn-gray.png"
              onClick={(e) => deleteThisLine(e)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Lyrics;
