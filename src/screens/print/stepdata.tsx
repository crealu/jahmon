import * as React from 'react';
import './print.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { theSteps, seqIsFretsnap } from '../../slices/sequence-slice';
import Diagram from '../../components/diagram/diagram';
import BasicSnap from './basicsnap';

export const StepData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const steps = useAppSelector(theSteps);
  const fretsnap = useAppSelector(seqIsFretsnap);

  return (
    <div className="print-steps">
      {steps.map((step, idx) => {
        return fretsnap
          ? <FretSnap step={step} idx={idx} />
          : <BasicSnap step={step} idx={idx} />;
      })}
    </div>
  )
}


export default StepData;
