import * as React from 'react';
import './print.css';
import { useAppSelector } from '../../hooks';
import { theSteps, seqIsFretsnap } from '../../slices/sequence-slice';
import Diagram from '../../components/diagram/diagram';
import ChordFret from './chordfret';

export const StepData: React.FC = () => {
  const steps = useAppSelector(theSteps);
  const fretsnap = useAppSelector(seqIsFretsnap);

  return (
    <div className="print-steps">
      {steps.map((step, idx) => {
        return fretsnap
          ? <Diagram step={step} idx={idx} />
          : <ChordFret step={step} idx={idx} />;
      })}
    </div>
  )
}


export default StepData;
