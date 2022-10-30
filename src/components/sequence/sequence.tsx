import * as React from 'react';
import './sequence.css';

const SequenceTitle = () => {
  return (
    <div
      className="section-title"
      data-isnew="new"
    >
      untitled
    </div>
  )
}

export const Sequence: React.FC = (): React.ReactElement => {
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
      <div className="steps-wrapper"></div>
    </div>
  )
}

export default Sequence;
