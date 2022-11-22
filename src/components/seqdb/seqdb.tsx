import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence, setIsNew } from '../../slices/sequence-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import NewSeqBtn from './newseq';
import axios from 'axios';
import './seqdb.css';

export const SequencesDB: React.FC = () => {
  const [sequences, setSequences] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const changeSequence = (event, steps, lyrics) => {
    const title = event.target.textContent;
    dispatch(setActiveSequence({ title: title, steps: steps}));
    dispatch(updateAllLines(lyrics));
    dispatch(setIsNew(false));
  }

  const getHandler = () => {
    axios.get('/api-get-jahms')
      .then(res => { setSequences(res.data) })
      .catch(err => { throw err });
  }

  useEffect(() => { getHandler() }, [])

  return (
    <div className="db-sequences">
      <h3 className="section-title seqdb-title">Sequences</h3>
      <div className="saved-sequences">
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
      </div>
    </div>
  )
}

export default SequencesDB;
