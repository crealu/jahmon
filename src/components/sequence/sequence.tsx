import * as React from 'react';
import './sequence.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq } from '../../slices/sequence-slice';

const SequenceTitle = () => {
  const title = useAppSelector(currentTitle);

  return (
    <div
      className="section-title"
      data-isnew="new"
    >
      {title == '' ? 'untitled' : title}
    </div>
  )
}

export const Sequence: React.FC = (): React.ReactElement => {
  const seq = useAppSelector(currentSeq);
  const [steps, setSteps] = useState(seq);

  const printSteps = () => {
    console.log(seq);
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <SequenceTitle />
        <div className="sequence-btn-wrapper">
          <img className="sequence-btn delete-btn" src="img/icons/delete-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
        </div>
      </div>
      <div className="steps-wrapper">
      {seq.map(step => {
        return (
            <div
              className="seq-step"
              dataset-noteids={step.noteids}
              dataset-modes={step.modes}
              dataset-fretnums={step.fretnums}
            >
              {step.title}
            </div>
          )
      })}
      </div>
    </div>
  )
}

export default Sequence;
