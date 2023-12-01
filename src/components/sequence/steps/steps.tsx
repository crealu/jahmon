import * as React from 'react';
import './Steps.css';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theSteps, addStep } from '../../../slices/sequence-slice';
import { libChord, setGrabbed } from '../../../slices/library-slice';
import { scrollSteps } from '../../../common/helpers';
import SeqStep from '../Seqstep/Seqstep';
import Diagram from '../../Diagram/Diagram';

export const Steps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const steps = useAppSelector(theSteps);
  const libraryChord = useAppSelector(libChord);

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'steps-wrapper') {
      event.target.style.background = 'rgba(210, 100, 150, 0.4)';
    } else {
      event.target.style.borderLeft = '1px solid var(--skel_text_color)';
    }
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList[0] == 'steps-wrapper') {
      event.target.style.background = 'none';
    } else {
      event.target.style.borderLeft = '1px solid var(--skel_text_color)';
    }
  }

  const dropHandler = (event) => {
    event.preventDefault();
    if (libraryChord.hasOwnProperty('name')) {
      const newStep = {
        title: libraryChord.name,
        noteids: libraryChord.noteids,
        mode: 'chord',
        fretnums: ''
      }
      dispatch(addStep(newStep));
    }
    event.target.style.background = 'none';
  }

  const returnSteps = useCallback(() => {
    return steps.map((step, i) => { return <SeqStep step={step} idx={i} key={i} /> })
  }, [steps]);

  const wrapperWidth = useMemo(() => {
    return `${steps.length > 8 ? steps.length * 100 + 'px' : '100%'}`
  }, [steps]);

  return (
    <div 
      className="steps" 
      onWheel={(e) => scrollSteps(e)}
      style={{ width: `${steps.length > 8 ? '100%' : '100%'}`}}
    >
      <div
        className="steps-wrapper"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        style={{ width: wrapperWidth }}
      >
        {returnSteps()}
      </div>
    </div>
  )
}

export default Steps;
