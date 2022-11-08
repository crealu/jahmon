import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence } from '../../slices/sequence-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import axios from 'axios';
import './seqdb.css';

export const SequencesDB: React.FC = () => {
  const [sequences, setSequences] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const changeSequence = (event, steps, lyrics) => {
    const title = event.target.textContent;
    dispatch(setActiveSequence(
      { title: title, steps: steps }
    ));
    console.log(lyrics);
    dispatch(updateAllLines(lyrics));
  }

  const getHandler = () => {
    axios.get('/api-save-g-jahms')
      .then(res => {
        setSequences(res.data);
        console.log(res.data);
      })
      .catch(err => { throw err });
  }

  useEffect(() => {
    getHandler();
  }, [])

  return (
    <div className="db-sequences">
      <h3 className="section-title" onClick={() => {console.log(sequences)}}>Sequences</h3>
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
      </div>
    </div>
  )
}

// <div>{sequence.name}</div>


export default SequencesDB;
