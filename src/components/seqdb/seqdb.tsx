import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setCurrentSequence } from '../../slices/sequence-slice';
import axios from 'axios';

import './seqdb.css';

export const SequencesDB: React.FC = (): React.ReactElement => {
  const [sequences, setSequences] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const changeSequence = (e) => {
    const currentSequence = e.target.textContent;
    console.log(currentSequence);
    dispatch(setCurrentSequence(currentSequence))
  }

  useEffect(() => {
    axios.get('/save-get-type')
      .then(res => { setSequences(res.data) })
      .catch(err => { throw err });
  }, [])

  return (
    <div className="db-sequences">
      <h3 className="section-title" onClick={() => {console.log(sequences)}}>Sequences</h3>
      <div class="saved-sequences">
        {sequences.map(sequence => {
          return (
            <div onClick={(e) => { changeSequence(e)}} className="db-sequence">
              {sequence.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SequencesDB;
