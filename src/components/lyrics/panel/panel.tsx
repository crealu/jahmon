import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { addPanelStep, updatePanelStep } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/view-slice';
import './panel.css';

type PanelProps<any> = {
  width: number;
  steps: any[];
}

export const Panel: React.FC<PanelProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);
  const printing = useAppSelector(isPrinting);
  const { width, steps } = props;

  const dragStartHandler = (event, idx) => {
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('moved-panel-chord')
    const chord = {
      title: event.target.textContent,
      noteids: '',
      ofPanel: true,
      num: idx,
    }
    dispatch(setGrabbed(chord));
  }

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
    event.target.style.background = 'none';
    const offsetLeft = event.clientX - ((21 * window.innerWidth) / 100) + 'px';
    const panelChord = {
      chord: chord.title,
      offset: offsetLeft,
      num: chord.num,
    }
    if (chord.hasOwnProperty('ofPanel')) {
      dispatch(updatePanelStep(panelChord))
    } else {
      dispatch(addPanelStep(panelChord))
    }
  }

  return (
    <div
      className="lyric-panel"
      style={{width: width + 'px'}}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      {steps.map((step, idx) => {
        return (
          <div
            className={`panel-step ${printing ? 'panel-step-print' : ''}`}
            style={{left: step.offset}}
            draggable="true"
            onDragStart={(e) => dragStartHandler(e, idx)}
            onDragOver={() => {}}
          >
            {step.chord}
          </div>
        )
      })}
    </div>
  )
}

export default Panel;
