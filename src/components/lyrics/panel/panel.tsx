import * as React from 'react';
import './panel.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { addPanelStep, updatePanelStep } from '../../../slices/lyrics-slice';
import { libChord } from '../../../slices/library-slice';
import { isPrinting } from '../../../slices/view-slice';
import PanelStep from './panelstep';

type PanelProps<any> = {
  steps: any[];
  lineNumber: number;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);
  const { steps, lineNumber } = props;

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
    const panelStep = {
      number: lineNumber,
      step: {
        chord: chord.title,
        num: chord.num,
        offset: offsetLeft
      }
    };
    if (chord.hasOwnProperty('ofPanel')) {
      dispatch(updatePanelStep(panelStep))
    } else {
      dispatch(addPanelStep(panelStep))
    }
  }

  return (
    <div
      className="lyric-panel"
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      {steps.map((step, idx) => {
        return <PanelStep step={step} index={idx} lineNumber={lineNumber} />
      })}
    </div>
  )
}

export default Panel;
