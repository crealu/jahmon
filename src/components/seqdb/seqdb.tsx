import * as React from 'react';
import './seqdb.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence, setIsNew, setActiveStep } from '../../slices/sequence-slice';
import { setSnapshotName } from '../../slices/fretboard-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import { setCurrentScreen } from '../../slices/view-slice';
import { clearFretboard, unstyleActive } from '../../common/helpers';
import NewSeqBtn from './newseq';
import axios from 'axios';

export const SequencesDB: React.FC = () => {
  const [sequences, setSequences] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const changeSequence = (event, steps, lyrics) => {
    const title = event.target.textContent;
    dispatch(setActiveSequence({ title: title, steps: steps}));
    dispatch(updateAllLines(lyrics));
    dispatch(setIsNew(false));
    unstyleActive();
    dispatch(setActiveStep(null));
    dispatch(setSnapshotName(''));
    clearFretboard();
  }

  const changeScreen = () => {
    dispatch(setCurrentScreen('gig'));
  }

  const getHandler = () => {
    axios.get('/api-get-jahms')
      .then(res => { setSequences(res.data) })
      .catch(err => { throw err });
  }

  useEffect(() => { getHandler() }, [])

  return (
    <div className="sequences">
      <h3 className="section-title seqdb-title">Sequences</h3>
      <div className="db-sequences">
        {sequences.map(sequence => {
          return (
            <div
              onClick={(e) => { changeSequence(e, sequence.steps, sequence.lyrics)}}
              className="db-sequence"
            >
              {sequence.title}
            </div>
          )
        })}
        <NewSeqBtn />
        <button onClick={() => changeScreen()}>GIG</button>
      </div>
    </div>
  )
}

export default SequencesDB;
