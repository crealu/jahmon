import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { addPanelStep, updatePanelStep, deletePanelStep } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/view-slice';
import './panel.css';
import PanelStep from './panelstep';

type PanelProps<any> = {
  width: number;
  steps: any[];
  lineNum: number;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);
  const printing = useAppSelector(isPrinting);
  const { width, steps, lineNum } = props;

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
    const offsetLeft = event.clientX - 75 + 'px';
    console.log(event.target.tabIndex);
    const lineNumber = event.target.tabIndex;
    const panelChord = {
      chord: chord.title,
      offset: offsetLeft,
      num: chord.num,
    }
    const payload = { number: lineNumber, step: panelChord };
    if (chord.hasOwnProperty('ofPanel')) {
      dispatch(updatePanelStep(payload))
    } else {
      dispatch(addPanelStep(payload))
    }
  }

  return (
    <div
      className="lyric-panel"
      style={{width: width + 'px'}}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      tabIndex={lineNum}
    >
      {steps.map((step, idx) => {
        return <PanelStep step={step} index={idx} lineNumber={lineNum} />
      })}
    </div>
  )
}

export default Panel;
