import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord } from '../../../slices/library-slice';
import { lyricLines, theActiveLine, activateLine, updateLine } from '../../../slices/lyrics-slice';
import '../lyrics.css';

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
  const { width, setWidth, text, lineNum } = props;
  const lines = useAppSelector(lyricLines);
  const active = useAppSelector(theActiveLine);

  const changeName = (e) => {
    const textWidth = context.measureText(e.target.value).width;
    const offset = textWidth / 1.5;
    e.target.style.width = textWidth + offset + 'px';
    setWidth(textWidth + offset);
    dispatch(updateLine(e.target.value));
  }

  const setActive = (num) => { dispatch(activateLine(num)) }

  return (
    <input
      className="lyric-line"
      onChange={(e) => { changeName(e) }}
      onClick={(e) => { setActive(lineNum) }}
      placeholder={text}
    />
  )
}

export default Line;
