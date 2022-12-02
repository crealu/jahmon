import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { lyricLines, theActiveLine, deleteLine } from '../../../slices/lyrics-slice';
import './wrapper.css';
import Line from '../line/line';
import Panel from '../panel/panel';

const Wrapper: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lines = useAppSelector(lyricLines);
  const active = useAppSelector(theActiveLine);
  const [lineWidth, setLineWidth] = useState(100);

  const deleteThisLine = (event) => {
    console.log(event.target.previousSibling.value)
    dispatch(deleteLine(event.target.previousSibling.value));
  }

  return (
    <div className="lyrics-wrapper">
      {lines.map((line, idx) => {
        return (
          <div className="line-group">
            <Panel width={lineWidth} steps={line.panel} />
            <Line width={lineWidth} setWidth={setLineWidth} lineNum={idx} text={line.text} />
            <img
              className={`delete-lyric-btn lyrics-btn ${active == idx ? 'active-delete-lyric-btn': ''}`}
              src="img/icons/delete-btn-gray.png"
              onClick={(e) => deleteThisLine(e)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Wrapper;
