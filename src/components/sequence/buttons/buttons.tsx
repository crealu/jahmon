import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { removeStep, clearSequence, toggleSave } from '../../../slices/sequence-slice';
import '../sequence.css';

export const Buttons: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const deleteStep = () => { dispatch(removeStep()); }
  const clearSeq = () => { dispatch(clearSequence()) };
  const saveSeq = () => { dispatch(toggleSave(true)) };

  return (
    <div className="sequence-btn-wrapper">
      <img
        className="sequence-btn delete-btn"
        src="img/icons/delete-btn-gray.png"
        onClick={() => deleteStep()}
      />
      <img
        className="sequence-btn"
        src="img/icons/clear-btn-gray.png"
        onClick={() => clearSeq()}
      />
      <img
        className="sequence-btn"
        src="img/icons/save-btn-gray.png"
        onClick={() => saveSeq()}
      />
    </div>
  )
}

export default Buttons;
