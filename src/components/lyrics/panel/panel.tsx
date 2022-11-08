import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { addStepToPanel, updatePanelStep } from '../../../slices/lyrics-slice';
import '../lyrics.css';

type PanelProps<any> = {
  width: number;
  steps: any[];
}

export const Panel: React.FC<PanelProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);
  // const lines = useAppSelector(lyricLines);
  const { width, steps } = props;

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
    // add chord to panel in state
    const panelChord = {
      chord: chord.title,
      offset: event.clientX - 30 + 'px',
      num: chord.num,
    }
    console.log(chord);
    if (chord.hasOwnProperty('ofPanel')) {
      dispatch(updatePanelStep(panelChord))
    } else {
      dispatch(addStepToPanel(panelChord))
    }
  }

  const dragStartHandler = (event, idx) => {
    event.dataTransfer.dropEffect = 'move';
    const chord = {
      title: event.target.textContent,
      noteids: '',
      ofPanel: true,
      num: idx,
    }
    dispatch(setGrabbed(chord));
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
            className="panel-step"
            style={{left: step.offset}}
            draggable="true"
            onDragStart={(e) => dragStartHandler(e, idx)}
          >
            {step.chord}
          </div>
        )
      })}
    </div>
  )
}

export default Panel;
