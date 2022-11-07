import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord } from '../../../slices/library-slice';
import '../lyrics.css';

type LineProps<any> = {
  width: number;
}

export const Line: React.FC<LineProps> = (props) => {
  const chord = useAppSelector(libChord);
  const { width } = props;

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'rgba(210, 100, 150, 0.4)';
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.target.style.background = 'none';
  }

  const dropHandler = (event) => {
    event.preventDefault();
    console.log(chord);
    const inlineStep = document.createElement('p');
    inlineStep.classList.add('line-step');
    inlineStep.textContent = chord.title;
    event.target.appendChild(inlineStep);
    event.target.style.background = 'none';
  }

  return (
    <div
      className="lyric-line"
      style={{width: width + 'px'}}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    ></div>
  )
}

export default Line;
