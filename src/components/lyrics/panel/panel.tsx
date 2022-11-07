import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord } from '../../../slices/library-slice';
import '../lyrics.css';

type PanelProps<any> = {
  width: number;
}

export const Panel: React.FC<PanelProps> = (props) => {
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
    console.log(event.clientX);
    const inlineStep = document.createElement('p');
    inlineStep.classList.add('panel-step');
    inlineStep.textContent = chord.title;
    inlineStep.style.left = event.clientX - 30 + 'px';
    event.target.appendChild(inlineStep);
    event.target.style.background = 'none';
  }

  return (
    <div
      className="lyric-panel"
      style={{width: width + 'px'}}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    ></div>
  )
}

export default Panel;
