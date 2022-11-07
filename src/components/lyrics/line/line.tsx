import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord } from '../../../slices/library-slice';
import '../lyrics.css';

type LineProps<any> = {
  width: number;
  setWidth: any;
  text: string;
}

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

export const Line: React.FC<LineProps> = (props) => {
  const [currentBar, setCurrentBar] = useState(0);
  const { width, setWidth, text } = props;

  const changeName = (e) => {
    const textWidth = context.measureText(e.target.value).width;
    const factor = textWidth / 1.5;
    e.target.style.width = textWidth + factor + 'px';
    console.log(textWidth);
    setWidth(textWidth + factor);
    console.log(theSaved);
  }

  const changeBar = (idx) => { setCurrentBar(idx) };

  return (
    <input
      className="lyric-line"
      onChange={(e) => { changeName(e) }}
      onClick={(e) => { changeBar(i) }}
      placeholder={text}
    />
  )
}

export default Line;
