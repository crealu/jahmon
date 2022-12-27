import * as React from 'react';
import './wrapper.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { lyricLines, theActiveLine, deleteLine } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/view-slice';
import Line from '../line/line';
import Panel from '../panel/panel';

type WrapperProps = {
  lines: object[];
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  // const lines = useAppSelector(lyricLines);
  const active = useAppSelector(theActiveLine);
  const printing = useAppSelector(isPrinting);
  const [lineWidth, setLineWidth] = useState(100);

  const { lines } = props;

  const deleteThisLine = (event) => {
    console.log(event.target.previousSibling.value)
    dispatch(deleteLine(event.target.previousSibling.value));
  }

  return (
    <div className="lyrics-wrapper">
      {lines.map((line, idx) => {
        return (
          <div className="line-group">
            <Panel width={lineWidth} steps={line.panel} lineNum={idx}/>
            <Line width={lineWidth} setWidth={setLineWidth} lineNum={idx} text={line.text} />
            {printing ? ''
              : <img
                  className={`delete-lyric-btn lyrics-btn ${active == idx ? 'active-delete-lyric-btn': ''}`}
                  src="img/icons/delete-btn-gray.png"
                  onClick={(e) => deleteThisLine(e)}
                />
            }
          </div>
        )
      })}
    </div>
  )
}

export default Wrapper;
