import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence } from '../../slices/sequence-slice';
import axios from 'axios';
import './seqdb.css';

export const SequencesDB: React.FC = (): React.ReactElement => {
  const [sequences, setSequences] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const changeSequence = (e, steps) => {
    const title = e.target.textContent;
    dispatch(setActiveSequence(
      { title: title, steps: steps }
    ))
  }

  const getHandler = () => {
    axios.get('/api-save-g-jahms')
      .then(res => { setSequences(res.data) })
      .catch(err => { throw err });
  }

  useEffect((sequences) => {
    getHandler();
  }, [sequences])

  return (
    <div className="db-sequences">
      <h3 className="section-title" onClick={() => {console.log(sequences)}}>Sequences</h3>
      <div class="saved-sequences">
        {sequences.map(sequence => {
          return (
            <div
              onClick={(e) => { changeSequence(e, sequence.steps)}}
              className="db-sequence"
            >
              {sequence.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// <div>{sequence.name}</div>


export default SequencesDB;
