import * as React from 'react';
import './line.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord } from '../../../slices/library-slice';
import { theActiveLine, activateLine, updateLine } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/sequence-slice';

type LineProps<any> = {
  width: number;
  setWidth: any;
  text: string;
  lineNum: number;
}

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

export const Line: React.FC<LineProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useAppSelector(theActiveLine);
  const printing = useAppSelector(isPrinting);
  const { width, setWidth, text, lineNum } = props;

  const changeName = (event) => {
    const textWidth = context.measureText(event.target.value).width;
    const offset = textWidth / 1.5;
    event.target.style.width = textWidth + offset + 'px';
    setWidth(textWidth + offset);
    dispatch(updateLine(event.target.value));
  }

  const setActive = (num) => { dispatch(activateLine(num)) }

  return (
    <input
      className={`lyric-line ${printing ? 'lyric-line-print' : ''}`}
      onChange={(e) => changeName(e)}
      onClick={(e) => setActive(lineNum)}
      value={text}
      placeholder={text}
    />
  )
}

export default Line;
