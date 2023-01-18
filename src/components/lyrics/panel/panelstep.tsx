import * as React from 'react';
import './Panel.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { deletePanelStep } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/view-slice';

type PanelStepProps<any> = {
  step: object;
  index: number;
  lineNumber: number;
}

export const PanelStep: React.FC<PanelStepProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const chord = useAppSelector(libChord);
  const printing = useAppSelector(isPrinting);
  const { step, index, lineNumber } = props;

  const dragStartHandler = (event) => {
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('moved-panel-chord')
    const chord = {
      title: event.target.textContent,
      num: index,
      ofPanel: true,
      noteids: ''
    }
    dispatch(setGrabbed(chord));
  }

  const deleteStep = () => {
    const panelStep = { lineNumber: lineNumber, chordNumber: index }
    dispatch(deletePanelStep(panelStep));
  }

  return (
    <div
      className={`panel-step ${printing ? 'panel-step-print' : ''}`}
      style={{left: step.offset}}
      draggable="true"
      onDragStart={(e) => dragStartHandler(e)}
      onDragOver={() => {}}
      tabIndex={index}
    >
      {step.chord}
      <span className="delete-panel-btn" onClick={() => deleteStep()}>x</span>
    </div>
  )
}

export default PanelStep;
