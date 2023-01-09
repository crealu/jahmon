import * as React from 'react';
import './print.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theSongTitle  } from '../../slices/song-slice';
import { theSteps } from '../../slices/sequence-slice';
import { lyricLines } from '../../slices/lyrics-slice';
import { setCurrentScreen } from '../../slices/view-slice';
import Wrapper from '../../components/lyrics/wrapper/wrapper';
import StepData from './stepdata';

export const Print: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useAppSelector(theSongTitle);
  const lines = useAppSelector(lyricLines);

  const hideForm = () => { dispatch(setCurrentScreen('base')) };

  const printSong = (event) => {
    event.target.style.display = 'none';
    event.target.nextSibling.style.display = 'none';
    window.print();
    event.target.style.display = 'block';
    event.target.nextSibling.style.display = 'block';
  }

  return (
    <div className="print-form">
      <div className="print-form-inner">
        <div className="print-title">{title}</div>
        <StepData />
        <Wrapper lines={lines}/>
      </div>
      <div className="print-form-btns-wrapper">
        <button className="save-btn save-form-btn" onClick={(e) => printSong(e)}>Print</button>
        <button className="cancel-btn save-form-btn" onClick={() => hideForm()}>Cancel</button>
      </div>
    </div>
  )
}

export default Print;
