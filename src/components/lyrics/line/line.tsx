import * as React from 'react';
import './Line.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theScreen } from '../../../slices/view-slice';
import { activateLine, updateLine } from '../../../slices/lyrics-slice';

type LineProps<any> = {
  text: string;
  lineNumber: number;
}

export const Line: React.FC<LineProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const screen = useAppSelector(theScreen);
  const { text, lineNumber } = props;

  const changeName = (event) => { dispatch(updateLine(event.target.value)) }
  const setActive = (lineNum) => { dispatch(activateLine(lineNum)) }

  return (
    <input
      className={`lyric-line ${screen == 'print' ? 'lyric-line-print' : ''}`}
      onChange={(e) => changeName(e)}
      onClick={(e) => setActive(lineNumber)}
      value={text}
      placeholder={text}
    />
  )
}

export default Line;
