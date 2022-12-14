import * as React from 'react';
import './print.css';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, seqIsNew } from '../../slices/sequence-slice';
import { isPrinting, togglePrint, setCurrentScreen } from '../../slices/view-slice';
import { theChordName, setChordName } from '../../slices/library-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { refresh } from '../../common/helpers';
import Wrapper from '../../components/lyrics/wrapper/wrapper';
import StepData from './stepdata';

export const Print: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(currentTitle);
  const printing = useAppSelector(isPrinting);

  const hideForm = () => { dispatch(setCurrentScreen('base')) };

  const printSeq = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'none';
    window.print();
    e.target.style.display = 'block';
    e.target.nextSibling.style.display = 'block';
  }

  return (
    <div className="print-form">
      <div className="print-form-inner">
        <div className="print-title">{title}</div>
        <StepData />
        <Wrapper />
      </div>
      <div className="print-form-btns-wrapper">
        <button className="save-btn save-form-btn" onClick={(e) => printSeq(e)}>Print</button>
        <button className="cancel-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
    </div>
  )
}

export default Print;
