import * as React from 'react';
import './save.css';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import {
  isSavingSeq,
  toggleSaveSequence,
  isSavingStep,
  toggleSaveStep
} from '../../slices/view-slice';
import SaveSeq from './saveseq/saveseq';
import SaveStep from './savestep/savestep';

export const Save: React.FC = () => {
  const savingSeq = useAppSelector(isSavingSeq);
  const savingStep = useAppSelector(isSavingStep);

  const getStyle = () => {
    return savingSeq || savingStep ? 'block' : 'none';
  }

  return (
    <div className="save-form modal" style={{display: getStyle()}}>
      {savingSeq ? <SaveSeq /> : <SaveStep />}
    </div>
  )
}

export default Save;
